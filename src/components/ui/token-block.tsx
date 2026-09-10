"use client";

import { Button } from "@base-ui/react";
import { allUis } from "content-collections";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { BaseUI } from "@/components/icons/icons";
import { CopyButton, TitleBar } from "@/components/ui/code";
import { getRegistryTarget } from "@/registry";
import { TOKEN_COLORS, type Token, tokensToText } from "@/utils/snippet";

/** Hand-highlighted usage snippet; shared by static preview and playground. */
export default function TokenBlock({
  tokens,
  className = "bc-border btw-1",
  expanded = false,
  title,
  installId,
  height,
}: {
  tokens: Token[];
  /** Caller supplies frame classes (e.g. no top border under tabs). */
  className?: string;
  expanded?: boolean;
  /** File label in the title bar, like `Code`. */
  title?: string;
  /** When set, title bar offers Install + optional Base UI link instead of Copy. */
  installId?: string;
  /**
   * Pins the code area to this many pixels and scrolls inside it. Without it an
   * expanded fold grows the block, which scrolls the page instead.
   */
  height?: number;
}) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tokensToText(tokens));
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const slug = (pathname || "")
    .replace(/^\/ui\/components\//, "")
    .replace(/^\/ui\//, "")
    .replace(/\/$/, "");
  const page = allUis.find((ui) => ui._meta.path === slug);
  const primitive = page?.primitive;
  const primitiveSlug =
    typeof primitive === "string"
      ? primitive
      : primitive
        ? getRegistryTarget(installId ?? slug).component
        : null;

  const action: ReactNode = installId ? (
    <div className="d-f ai-c g-1">
      {primitiveSlug && (
        <Link
          href={`https://base-ui.com/react/components/${primitiveSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Base UI primitive"
          className="d-f ai-c jc-c p-1 c-accent td-none h:c-accent-4 fv:oc-accent fv:ow-2"
        >
          <BaseUI className="w-4 h-4" />
        </Link>
      )}
    </div>
  ) : (
    <CopyButton copied={copied} onCopy={copy} />
  );

  return (
    <div className={`bg-surface ${className}`}>
      <TitleBar title={title} action={action} />
      <pre
        className={`ox-auto px-4 py-3 ff-m lh-5 ws-pw ${height ? "oy-auto" : ""}`}
        style={height ? { height } : undefined}
      >
        <code>
          <Folded tokens={tokens} expanded={expanded} />
        </code>
      </pre>
    </div>
  );
}

/** Collapsible token regions; copy still takes the full snippet. */
function Folded({
  tokens,
  expanded = false,
}: {
  tokens: Token[];
  expanded?: boolean;
}) {
  const [open, setOpen] = useState<string[]>(() =>
    expanded
      ? [
          ...new Set(
            tokens.flatMap((token) => (token.fold ? [token.fold] : [])),
          ),
        ]
      : [],
  );
  const output: React.ReactNode[] = [];

  const toggle = (region: string) =>
    setOpen((current) =>
      current.includes(region)
        ? current.filter((name) => name !== region)
        : [...current, region],
    );

  const write = (token: Token) => (
    <span key={token.id} style={{ color: TOKEN_COLORS[token.kind] }}>
      {token.text}
    </span>
  );

  for (let i = 0; i < tokens.length; i++) {
    const region = tokens[i].fold;

    if (!region) {
      output.push(write(tokens[i]));
      continue;
    }

    const body: Token[] = [];
    while (i < tokens.length && tokens[i].fold === region)
      body.push(tokens[i++]);
    i--;

    const isOpen = open.includes(region);

    output.push(
      <Button
        key={`${region}-fold`}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Collapse" : "Expand"} ${region}`}
        onClick={() => toggle(region)}
        style={{ font: "inherit" }}
        className={`d-if p-0 bg-transparent bw-0 va-b c-p a-none fv:oo-2 fv:oc-accent ${
          isOpen ? "c-white/25 h:c-white/60" : "c-white/40 h:c-white"
        }`}
      >
        ...
      </Button>,
    );

    if (isOpen) for (const token of body) output.push(write(token));
  }

  return <>{output}</>;
}
