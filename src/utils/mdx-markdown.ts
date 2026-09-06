import type { RegistryMeta } from "@/registry";
import { baselineFor } from "@/utils/baseline";
import { COLOR_FAMILIES, SHADE_LABELS } from "@/utils/colors";
import { fillNormalizeFences } from "@/utils/normalize-rules.mjs";
import { type Category, categoryGetters } from "@/utils/yummacss";

/**
 * Turns the MDX source of a doc into plain markdown for the `.md` routes.
 *
 * MDX components have no markdown equivalent, so they are unwrapped: the tags
 * are dropped & the children are kept, de-indented back to the surrounding
 * level. That last part matters because children of a paired component are
 * indented in the source, and a markdown reader would otherwise treat the real
 * content as an indented code block.
 *
 * A handful of components carry meaning that survives the unwrap - a `Step`
 * title, a `Hint` callout, a `Reference` table, a link card - and are rendered
 * as the closest markdown construct. Everything else is transparent, and
 * self-closing components with nothing to unwrap are dropped.
 */

// A fence opener or closer at any indentation. MDX components nest fences, so
// the marker is captured to pair a closer with its own opener.
const FENCE = /^\s*(`{3,}|~{3,})/;

// Tags occupy a whole line in the docs content, except for the occasional
// single-line Hint or `div` holding one string.
const SELF_CLOSING = /^\s*<([A-Za-z][A-Za-z0-9]*)((?:\s[^>]*?)?)\s*\/>\s*$/;
const OPENING = /^\s*<([A-Za-z][A-Za-z0-9]*)((?:\s[^>]*?)?)>\s*$/;
const CLOSING = /^\s*<\/([A-Za-z][A-Za-z0-9]*)>\s*$/;
const INLINE = /^\s*<([A-Za-z][A-Za-z0-9]*)((?:\s[^>]*?)?)>(.*)<\/\1>\s*$/;

const ATTRIBUTE = /([A-Za-z][A-Za-z0-9_-]*)="([^"]*)"/g;
const MDX_IMPORT = /^import\s.*\sfrom\s/;
const LIST_ITEM = /^\s*[-*+] /;

// The raw HTML that exists purely to lay a docs page out, which markdown can
// say more simply. Any other raw HTML is left exactly as it was written.
const HTML_WRAPPERS = new Set(["a", "div"]);

/** Components are unwrapped by name; raw HTML only where markdown can say it. */
function unwrappable(name: string): boolean {
  return /^[A-Z]/.test(name) || HTML_WRAPPERS.has(name);
}

type Node =
  | { kind: "lines"; lines: string[] }
  | { kind: "component"; name: string; attrs: string; children: Node[] };

/**
 * Looks up the source behind a `registryId`, returning null when there is none.
 *
 * Injected rather than read here on purpose. The registry lives on disk, and a
 * `node:fs` import in this module would make it unsafe to reach from a
 * component: that exact leak took the playground down & failed the first
 * attempt at the docs OOM fix. Keeping the read in the route handler means this
 * file stays client-safe by construction rather than by luck.
 */
export type RegistryResolver = (registryId: string) => string | null;

/**
 * Looks up the prop schema behind a `registryId`. Same injection rule as
 * `RegistryResolver`, and same reason.
 */
export type MetaResolver = (registryId: string) => RegistryMeta | null;

interface RenderOptions {
  resolveRegistry?: RegistryResolver;
  resolveMeta?: MetaResolver;
  /**
   * The page's own registry id, for `<ComponentPlayground />`, which carries no
   * id of its own - the route decides which component a page shows, so that the
   * stage and the rail cannot end up on two different ones.
   */
  registryId?: string;
}

/** Components whose registry id is the page's own, not written on the tag. */
const PLAYGROUND = new Set(["ComponentPlayground"]);

function parseAttrs(attrs: string): Record<string, string> {
  const parsed: Record<string, string> = {};
  for (const [, key, value] of attrs.matchAll(ATTRIBUTE)) {
    parsed[key] = value;
  }
  return parsed;
}

/**
 * Removes the smallest indentation shared by every non-blank line, which is how
 * a component's children get pulled back to the level of the surrounding prose.
 */
function dedent(lines: string[]): string[] {
  let common = Number.POSITIVE_INFINITY;

  for (const line of lines) {
    if (!line.trim()) continue;
    common = Math.min(common, line.length - line.trimStart().length);
  }

  if (!Number.isFinite(common) || common === 0) return lines;

  return lines.map((line) => (line.trim() ? line.slice(common) : line));
}

/**
 * Marks the lines that sit inside a fenced code block. Component tags & blank
 * lines are content there, not markup, so every pass has to skip them.
 */
function markFenced(lines: string[]): boolean[] {
  const fenced: boolean[] = [];
  let marker: string | null = null;

  for (const line of lines) {
    const fence = line.match(FENCE);

    if (marker === null) {
      fenced.push(fence !== null);
      if (fence) marker = fence[1];
      continue;
    }

    // Inside a fence: only a marker of the same character & at least the same
    // length closes it.
    fenced.push(true);
    if (
      fence &&
      fence[1][0] === marker[0] &&
      fence[1].length >= marker.length
    ) {
      marker = null;
    }
  }

  return fenced;
}

/**
 * Finds the line closing the component opened at `open`, skipping fences &
 * nested blocks of the same component. Returns -1 when nothing closes it.
 */
function findClosing(
  lines: string[],
  fenced: boolean[],
  open: number,
  name: string,
): number {
  let depth = 1;

  for (let i = open + 1; i < lines.length; i++) {
    if (fenced[i]) continue;

    const closing = lines[i].match(CLOSING);
    if (closing?.[1] === name) {
      depth--;
      if (depth === 0) return i;
      continue;
    }

    const opening = lines[i].match(OPENING);
    if (opening?.[1] === name && !SELF_CLOSING.test(lines[i])) depth++;
  }

  return -1;
}

function parse(lines: string[]): Node[] {
  const fenced = markFenced(lines);
  const nodes: Node[] = [];
  let text: string[] = [];

  const flush = () => {
    if (text.length) nodes.push({ kind: "lines", lines: text });
    text = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (fenced[i]) {
      text.push(line);
      continue;
    }

    // MDX machinery, not content. Only outside a fence - `import` inside one is
    // the code being documented, on nine pages.
    if (MDX_IMPORT.test(line)) continue;

    const selfClosing = line.match(SELF_CLOSING);
    if (selfClosing && unwrappable(selfClosing[1])) {
      flush();
      nodes.push({
        kind: "component",
        name: selfClosing[1],
        attrs: selfClosing[2] ?? "",
        children: [],
      });
      continue;
    }

    const inline = line.match(INLINE);
    if (inline && unwrappable(inline[1])) {
      flush();
      nodes.push({
        kind: "component",
        name: inline[1],
        attrs: inline[2] ?? "",
        children: [{ kind: "lines", lines: [inline[3].trim()] }],
      });
      continue;
    }

    const opening = line.match(OPENING);
    if (opening && unwrappable(opening[1])) {
      const close = findClosing(lines, fenced, i, opening[1]);
      // An unclosed tag runs to the end of the document rather than leaking.
      const end = close === -1 ? lines.length : close;

      flush();
      nodes.push({
        kind: "component",
        name: opening[1],
        attrs: opening[2] ?? "",
        children: parse(dedent(lines.slice(i + 1, end))),
      });

      i = end;
      continue;
    }

    // A closing tag with no opener: drop it, so no tag reaches the output.
    const closing = line.match(CLOSING);
    if (closing && unwrappable(closing[1])) continue;

    text.push(line);
  }

  flush();

  return nodes;
}

/** The same schema the controls & the props table use, as markdown. */
function buildPropsTable(meta: RegistryMeta): string[] {
  if (!meta.props?.length) return [];

  const rows = meta.props.map((prop) => {
    // `typeName` carries the real TypeScript type for anything the schema has
    // no control for, where `type` would only say `none`.
    const type = prop.typeName
      ? `\`${prop.typeName}\``
      : prop.type === "enum" && prop.values
        ? prop.values.map((value) => `\`"${value}"\``).join(" \\| ")
        : `\`${prop.type}\``;
    const fallback =
      prop.default === undefined ? "-" : `\`${JSON.stringify(prop.default)}\``;
    // A pipe inside a cell would end the column early.
    const description = (prop.description ?? "").replaceAll("|", "\\|");
    return `| \`${prop.name}\` | ${type} | ${fallback} | ${description} |`;
  });

  return [
    ...(meta.summary ? [meta.summary, ""] : []),
    "| Prop | Type | Default | Description |",
    "|------|------|---------|-------------|",
    ...rows,
  ];
}

function buildReferenceTable(category: Category, name: string): string[] {
  try {
    const getter = categoryGetters[category];
    if (!getter) return [];

    const utils = getter();
    const util = utils[name];
    if (!util) return [];

    const rows = Object.entries(util.values as Record<string, string>).map(
      ([suffix, value]) => {
        const cls = suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
        const props = (util.properties as string[]).join(", ");
        return `| \`${cls}\` | ${props} | \`${value}\` |`;
      },
    );

    return [
      "| Class | Properties | Value |",
      "|-------|------------|-------|",
      ...rows,
    ];
  } catch {
    return [];
  }
}

function buildBaseline(path: string): string[] {
  const baseline = baselineFor(path);
  if (!baseline) return [];

  const support = baseline.browsers
    .map((b) =>
      b.supported
        ? `${b.name} ${b.version}${b.desktopOnly ? " (desktop only)" : ""}`
        : `${b.name} unsupported`,
    )
    .join(" · ");

  return [`**${baseline.label}.** ${baseline.description}`, "", support];
}

// Only the base hex per family: the 13 shades are generated from it by the rule
// the prose states, and every shade is already listed on each colour utility's
// own page.
function buildPalette(): string[] {
  return [
    "| Family | Base |",
    "|--------|------|",
    ...COLOR_FAMILIES.map((f) => `| ${f.name} | \`${f.color}\` |`),
  ];
}

function renderComponent(
  node: Extract<Node, { kind: "component" }>,
  options: RenderOptions,
  stepNumber?: number,
): string[] {
  const attrs = parseAttrs(node.attrs);

  if (node.name === "Baseline") {
    return attrs.path ? buildBaseline(attrs.path) : [];
  }

  if (node.name === "Palette") {
    return buildPalette();
  }

  if (node.name === "Reference") {
    const { category, name } = attrs;
    if (!category || !name) return [];
    return buildReferenceTable(category as Category, name);
  }

  // A component node has no children, so without a case here it falls through
  // to "nothing to unwrap" & vanishes, leaving the UI pages as prose with no
  // component on them - /ui/components/button.md was 65 bytes, a title and a
  // sentence. The registry file IS the content of these pages, and the schema
  // is the only statement of the API, so a reader of the `.md` needs both.
  //
  // `<ComponentPlayground />` takes no id: the route decides the component, so
  // the id arrives as an option instead. `registryId` on the node is still read
  // first, so a page that names one keeps working.
  const registryId =
    attrs.registryId ??
    (PLAYGROUND.has(node.name) ? options.registryId : undefined);

  if (registryId) {
    const lines: string[] = [];
    const source = options.resolveRegistry?.(registryId);
    if (source) lines.push(...fencedBlock(source, "tsx"));
    const meta = options.resolveMeta?.(registryId);
    if (meta) {
      if (lines.length > 0) lines.push("");
      lines.push(...buildPropsTable(meta));
    }
    return lines;
  }

  const children = render(node.children, options, node.name === "Stepper");

  // A step title names the step, so it survives even an empty step.
  if (node.name === "Step" && attrs.title) {
    const label = stepNumber ? `${stepNumber}. ${attrs.title}` : attrs.title;
    return children.length
      ? [`**${label}**`, "", ...children]
      : [`**${label}**`];
  }

  // Nothing to unwrap: a component that only renders interactive UI.
  if (!children.length) return [];

  // A Hint is a callout, which markdown spells as a blockquote.
  if (node.name === "Hint") {
    return children.map((line) => (line.trim() ? `> ${line}` : ">"));
  }

  // A link wrapping a block of text is a card on the page. As markdown it is a
  // list item: the first line names the link, the rest describe it.
  if (node.name === "a" && attrs.href) {
    const [label, ...rest] = children
      .filter((line) => line.trim())
      .map((line) => line.trim());
    if (!label) return [];

    const detail = rest.join(" - ");
    return [`- [${label}](${attrs.href})${detail ? ` - ${detail}` : ""}`];
  }

  return children;
}

/**
 * Wraps source in a fence long enough to contain it. A registry file could
 * itself hold a fenced example, and a plain ``` would end the block early.
 */
function fencedBlock(source: string, lang: string): string[] {
  const body = source.replace(/\r\n/g, "\n").replace(/\s+$/, "");
  const longest = Math.max(
    0,
    ...[...body.matchAll(/^\s*(`{3,})/gm)].map((m) => m[1].length),
  );
  const fence = "`".repeat(Math.max(3, longest + 1));

  return [`${fence}${lang}`, ...body.split("\n"), fence];
}

function render(
  nodes: Node[],
  options: RenderOptions,
  numberSteps = false,
): string[] {
  const out: string[] = [];
  let step = 0;

  for (const node of nodes) {
    if (node.kind === "lines") {
      out.push(...node.lines);
      continue;
    }

    if (numberSteps && node.name === "Step") step++;

    const block = renderComponent(
      node,
      options,
      numberSteps ? step : undefined,
    );
    if (!block.length) continue;

    // Unwrapping can butt a block up against its neighbour, so keep the blank
    // line that markdown needs between them. Consecutive list items are the
    // exception: a blank line there would loosen the list for no reason.
    const previous = out[out.length - 1];
    const isListItem = LIST_ITEM.test(block[0]);
    const afterListItem = previous !== undefined && LIST_ITEM.test(previous);

    if (previous?.trim() && !(isListItem && afterListItem)) out.push("");
    out.push(...block);
    if (!isListItem) out.push("");
  }

  return out;
}

/** Collapses runs of blank lines, leaving fenced code blocks untouched. */
function collapseBlankLines(lines: string[]): string[] {
  const fenced = markFenced(lines);
  const out: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (!fenced[i] && !lines[i].trim()) {
      const previous = out[out.length - 1];
      if (previous === undefined || !previous.trim()) continue;
    }
    out.push(lines[i]);
  }

  return out;
}

export function mdxToMarkdown(
  content: string,
  options: RenderOptions = {},
): string {
  // Some content files are authored with CRLF. Normalizing first keeps the
  // served markdown from mixing them with the lines rendered here.
  // `normalize=` fences are filled by a rehype plugin this pipeline never runs.
  const source = fillNormalizeFences(content.replace(/\r\n/g, "\n")).split(
    "\n",
  );
  const lines = collapseBlankLines(render(parse(source), options));

  return lines
    .join("\n")
    .replace(/\{COLOR_FAMILIES\.length\}/g, String(COLOR_FAMILIES.length))
    .replace(/\{SHADE_LABELS\.length\}/g, String(SHADE_LABELS.length))
    .trim();
}
