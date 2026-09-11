import type { RegistryMeta, RegistryProp } from "@/registry";

export type PropValue = string | boolean | number;

export type TokenKind =
  // Shell, for the install command.
  | "command"
  | "argument"
  | "flag"
  // JSX, for the usage snippet.
  | "keyword"
  | "punctuation"
  | "tag"
  | "attribute"
  | "operator"
  | "string"
  | "brace"
  | "value"
  | "text";

export interface Token {
  kind: TokenKind;
  text: string;
  /** Tokens are positional, so identity is position. */
  id: string;
  /**
   * Name of the collapsible region this token belongs to, if any. Consecutive
   * tokens sharing a name fold together, the way an editor's gutter arrow
   * collapses a block.
   */
  fold?: string;
}

type Draft = Omit<Token, "id">;

/**
 * Eclipsa, as Shiki resolves it for these exact constructs.
 *
 * Shiki runs on the server during page generation, and both of these are built
 * in a client component from a registry id & a schema, so there is no source
 * string for it to highlight. Running Shiki in the browser would mean shipping
 * the core plus two grammars to colour a dozen tokens. These values were read
 * out of `codeToTokens` for a real shell line and a real JSX element instead,
 * so a hand-built block is coloured exactly like every authored fence.
 */
export const TOKEN_COLORS: Record<TokenKind, string> = {
  command: "#F5FAFF",
  argument: "#BEC6F2",
  flag: "#DDA2F6",
  keyword: "#9595E3",
  punctuation: "#B9BED5",
  tag: "#85B1E0",
  attribute: "#DDA2F6",
  operator: "#93DDFB",
  string: "#BEC6F2",
  brace: "#9595E3",
  value: "#DDA2F6",
  text: "#B9BED5",
};

function identify(tokens: Draft[]): Token[] {
  return tokens.map((token, index) => ({
    ...token,
    id: `${index}-${token.kind}-${token.text}`,
  }));
}

/** `alert-dialog` -> `AlertDialog`, the name you would import it under. */
export function componentName(id: string): string {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

// The install command used to be built here, per preview. It is an authored
// `<CodeGroup>` in a page's own `## Installation` section now, so it lands in
// the table of contents and can be linked to - and pnpm/npm tabbing is the
// same implementation as every other install block on the site rather than a
// second one. Nothing generates install tokens any more.

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * A JavaScript object literal, not JSON: unquoted keys where they are valid
 * identifiers, because the snippet is meant to be pasted into a `.tsx` file.
 */
/**
 * The icon a `{ "$icon": "Star" }` marker carries, or null.
 *
 * An optional `size` rides along, because a glyph's size belongs to the slot it
 * sits in rather than to the mechanism: a tour's step badge wants 24px & a
 * command palette's list row wants 16px, and neither is a default the other
 * could live with.
 */
export function iconMarker(
  value: unknown,
): { name: string; size?: string } | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }
  const keys = Object.keys(value);
  if (!keys.includes("$icon")) return null;
  if (keys.some((key) => key !== "$icon" && key !== "size")) return null;
  const { $icon: name, size } = value as { $icon: unknown; size?: unknown };
  if (typeof name !== "string") return null;
  return { name, size: typeof size === "string" ? size : undefined };
}

/** Every icon name marked anywhere inside an example value. */
function markedIcons(value: unknown): string[] {
  const marker = iconMarker(value);
  if (marker) return [marker.name];
  if (Array.isArray(value)) return value.flatMap(markedIcons);
  if (typeof value === "object" && value !== null) {
    return Object.values(value).flatMap(markedIcons);
  }
  return [];
}

function literal(value: unknown, indent: string): Draft[] {
  if (typeof value === "string") {
    return [{ kind: "string", text: JSON.stringify(value) }];
  }
  if (value === null || typeof value !== "object") {
    return [{ kind: "value", text: String(value) }];
  }

  // `{ "$icon": "Star" }` nested anywhere in an example stands for a glyph the
  // schema cannot spell in JSON. It prints as the JSX it means.
  const marker = iconMarker(value);
  if (marker) {
    const tokens: Draft[] = [
      { kind: "punctuation", text: "<" },
      { kind: "tag", text: marker.name },
    ];
    if (marker.size) {
      tokens.push(
        { kind: "text", text: " " },
        { kind: "attribute", text: "className" },
        { kind: "operator", text: "=" },
        { kind: "string", text: JSON.stringify(marker.size) },
      );
    }
    tokens.push({ kind: "punctuation", text: " />" });
    return tokens;
  }

  const inner = `${indent}  `;

  if (Array.isArray(value)) {
    const tokens: Draft[] = [{ kind: "punctuation", text: "[" }];
    for (const item of value) {
      tokens.push({ kind: "text", text: `\n${inner}` });
      tokens.push(...literal(item, inner));
      tokens.push({ kind: "punctuation", text: "," });
    }
    tokens.push({ kind: "text", text: `\n${indent}` });
    tokens.push({ kind: "punctuation", text: "]" });
    return tokens;
  }

  const tokens: Draft[] = [{ kind: "punctuation", text: "{" }];
  for (const [key, item] of Object.entries(value)) {
    tokens.push({ kind: "text", text: `\n${inner}` });
    tokens.push({
      kind: "tag",
      text: IDENTIFIER.test(key) ? key : JSON.stringify(key),
    });
    tokens.push({ kind: "punctuation", text: ": " });
    tokens.push(...literal(item, inner));
    tokens.push({ kind: "punctuation", text: "," });
  }
  tokens.push({ kind: "text", text: `\n${indent}` });
  tokens.push({ kind: "punctuation", text: "}" });
  return tokens;
}

function attribute(prop: RegistryProp, value: unknown): Draft[] {
  const name: Draft = { kind: "attribute", text: prop.name };

  // An icon prop is spelled inline as the JSX it actually is. It has to come
  // before the object branch below, because a React element *is* an object &
  // would otherwise print as `icon={icon}` referencing nothing.
  if (prop.exampleIcon) {
    return [
      name,
      { kind: "operator", text: "=" },
      { kind: "brace", text: "{" },
      { kind: "punctuation", text: "<" },
      { kind: "tag", text: prop.exampleIcon },
      { kind: "punctuation", text: " />" },
      { kind: "brace", text: "}" },
    ];
  }

  // An array or an object is declared above the element & referenced by name.
  // Spelling it inline would be unreadable; leaving it as `items={items}` with
  // nothing declared would be a snippet the reader's editor rejects.
  if (typeof value === "object" && value !== null) {
    return [
      name,
      { kind: "operator", text: "=" },
      { kind: "brace", text: "{" },
      { kind: "value", text: prop.name },
      { kind: "brace", text: "}" },
    ];
  }

  // A bare attribute is `true`; JSX has no shorthand for the other one.
  if (typeof value === "boolean") {
    return value
      ? [name]
      : [
          name,
          { kind: "operator", text: "=" },
          { kind: "brace", text: "{" },
          { kind: "value", text: "false" },
          { kind: "brace", text: "}" },
        ];
  }

  if (typeof value === "number") {
    return [
      name,
      { kind: "operator", text: "=" },
      { kind: "brace", text: "{" },
      { kind: "value", text: String(value) },
      { kind: "brace", text: "}" },
    ];
  }

  return [
    name,
    { kind: "operator", text: "=" },
    { kind: "string", text: `"${value}"` },
  ];
}

/**
 * How you use the component, not how it is built.
 *
 * The base entry of a migrated component *is* the implementation - it is the
 * file `yummaui add button` copies - so showing its source under `### Base`
 * answers a question nobody asked there. `<Button>Label</Button>` is the answer.
 * The implementation is still one click away in the registry JSON and the `.md`
 * route.
 *
 * Only props that differ from their default are written out, which is what
 * keeps the snippet copy-pasteable rather than a dump of every option.
 */
export function buildUsage(
  id: string,
  meta: RegistryMeta,
  values: Record<string, unknown>,
): Token[] {
  const name = componentName(id);

  // The import, because a snippet you can copy but not run is not a snippet.
  // `components/ui` and the `@/` alias are what `yummaui init` defaults to, so
  // this is the path the file lands at unless you told it otherwise.
  const tokens: Draft[] = [
    { kind: "keyword", text: "import" },
    { kind: "text", text: " " },
    { kind: "tag", text: name },
    { kind: "text", text: " " },
    { kind: "keyword", text: "from" },
    { kind: "text", text: " " },
    { kind: "string", text: `"@/components/ui/${id}"` },
    { kind: "punctuation", text: ";" },
    { kind: "text", text: "\n" },
  ];

  const props = meta.props.filter((prop) => {
    const value = values[prop.name];
    if (value === undefined || value === "") return false;
    return value !== prop.default;
  });

  // Icons the snippet is about to spell inline need importing too, or the
  // thing you copied does not compile.
  const icons = [
    ...new Set(
      props.flatMap((prop) => [
        ...(prop.exampleIcon ? [prop.exampleIcon] : []),
        ...markedIcons(values[prop.name]),
      ]),
    ),
  ].sort();

  if (icons.length) {
    tokens.push(
      { kind: "keyword", text: "import" },
      { kind: "text", text: " " },
      { kind: "brace", text: "{" },
      { kind: "text", text: " " },
      { kind: "tag", text: icons.join(", ") },
      { kind: "text", text: " " },
      { kind: "brace", text: "}" },
      { kind: "text", text: " " },
      { kind: "keyword", text: "from" },
      { kind: "text", text: " " },
      { kind: "string", text: '"iconoir-react"' },
      { kind: "punctuation", text: ";" },
      { kind: "text", text: "\n" },
    );
  }

  // Same rule for the children the snippet is about to spell.
  for (const child of [
    ...new Set(
      (meta.childrenExample ?? [])
        .map((entry) => entry.component)
        .filter((entry): entry is string => Boolean(entry)),
    ),
  ].sort()) {
    tokens.push(
      { kind: "keyword", text: "import" },
      { kind: "text", text: " " },
      { kind: "tag", text: child },
      { kind: "text", text: " " },
      { kind: "keyword", text: "from" },
      { kind: "text", text: " " },
      {
        kind: "string",
        text: `"@/components/ui/${child
          .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
          .toLowerCase()}"`,
      },
      { kind: "punctuation", text: ";" },
      { kind: "text", text: "\n" },
    );
  }

  tokens.push({ kind: "text", text: "\n" });

  tokens.push({ kind: "punctuation", text: "<" }, { kind: "tag", text: name });

  // Attributes stay on the element's own line. A prop per line turned three
  // changed values into a seven-line block, and the snippet is a thing you
  // copy rather than a thing you read down.
  for (const prop of props) {
    tokens.push({ kind: "text", text: " " });
    tokens.push(...attribute(prop, values[prop.name]));
  }

  // A component whose schema declares no children slot is written self-closing,
  // so the snippet matches how it is actually used.
  if (meta.childrenExample) {
    // Printed from the same declaration the stage renders, so the snippet is
    // what the preview is showing rather than a second description of it.
    tokens.push({ kind: "punctuation", text: ">" });
    for (const child of meta.childrenExample) {
      tokens.push({ kind: "text", text: "\n  " });
      if (child.text !== undefined || !child.component) {
        tokens.push({ kind: "punctuation", text: "<" });
        tokens.push({ kind: "tag", text: "span" });
        tokens.push({ kind: "punctuation", text: ">" });
        tokens.push({ kind: "text", text: child.text ?? "" });
        tokens.push({ kind: "punctuation", text: "</" });
        tokens.push({ kind: "tag", text: "span" });
        tokens.push({ kind: "punctuation", text: ">" });
        continue;
      }
      tokens.push({ kind: "punctuation", text: "<" });
      tokens.push({ kind: "tag", text: child.component });
      for (const [key, value] of Object.entries(child.props ?? {})) {
        tokens.push({ kind: "text", text: " " });
        tokens.push({ kind: "attribute", text: key });
        tokens.push({ kind: "punctuation", text: "=" });
        tokens.push({ kind: "string", text: JSON.stringify(String(value)) });
      }
      if (child.children === undefined) {
        tokens.push({ kind: "punctuation", text: " />" });
      } else {
        tokens.push({ kind: "punctuation", text: ">" });
        tokens.push({ kind: "text", text: child.children });
        tokens.push({ kind: "punctuation", text: "</" });
        tokens.push({ kind: "tag", text: child.component });
        tokens.push({ kind: "punctuation", text: ">" });
      }
    }
    tokens.push({ kind: "text", text: "\n" });
    tokens.push({ kind: "punctuation", text: "</" });
    tokens.push({ kind: "tag", text: name });
    tokens.push({ kind: "punctuation", text: ">" });
  } else if (meta.children === undefined) {
    tokens.push({ kind: "punctuation", text: " />" });
  } else {
    tokens.push({ kind: "punctuation", text: ">" });
    tokens.push({ kind: "text", text: meta.children });
    tokens.push({ kind: "punctuation", text: "</" });
    tokens.push({ kind: "tag", text: name });
    tokens.push({ kind: "punctuation", text: ">" });
  }

  return identify([...tokens, ...declarations(props, values)]);
}

/**
 * Fixture data, below the element rather than above it.
 *
 * The component is what you came to read; the data is what it happens to be fed.
 * Every registry file already puts its own fixtures last for the same reason,
 * and it stays valid because the array is only evaluated when the component
 * renders, not when the module loads.
 *
 * The body is marked foldable so the default view is one line, `const items =
 * [ ... ];`. Folding hides nothing: the tokens are all still there & the copy
 * button takes the whole snippet either way.
 */
function declarations(
  props: RegistryProp[],
  values: Record<string, unknown>,
): Draft[] {
  const tokens: Draft[] = [];

  for (const prop of props) {
    const value = values[prop.name];
    if (typeof value !== "object" || value === null) continue;
    // An icon was already spelled inline as JSX. It is a React element, so it
    // is an object, but declaring `const icon = {...}` for it would dump the
    // element's internals into the snippet & contradict the attribute above it.
    if (prop.exampleIcon) continue;

    const body = literal(value, "");
    // Everything between the opening and closing bracket, which is what an
    // editor's gutter arrow would collapse.
    for (const token of body.slice(1, -1)) token.fold = prop.name;

    tokens.push(
      { kind: "text", text: "\n\n" },
      { kind: "keyword", text: "const" },
      { kind: "text", text: " " },
      { kind: "tag", text: prop.name },
      { kind: "text", text: " " },
      { kind: "operator", text: "=" },
      { kind: "text", text: " " },
      ...body,
      { kind: "punctuation", text: ";" },
    );
  }

  return tokens;
}

export function tokensToText(tokens: Token[]): string {
  return tokens.map((token) => token.text).join("");
}
