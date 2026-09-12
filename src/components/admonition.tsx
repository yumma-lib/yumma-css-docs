import type { ReactNode } from "react";
import { CheckCircle, InfoCircle, WarningTriangle } from "@/icons";

type Kind = "note" | "warning" | "success";

interface Props {
  kind?: Kind;
  title?: string;
  children: ReactNode;
}

/**
 * The three kinds carry the meaning, so each gets its own color rather than a
 * shared one with a different icon. `note` reuses the accent the blockquote
 * already used, since that is the one readers have seen for a year.
 */
const KINDS: Record<
  Kind,
  { rail: string; icon: string; Icon: typeof InfoCircle }
> = {
  note: {
    rail: "bc-accent bg-accent-dim/10",
    icon: "c-accent",
    Icon: InfoCircle,
  },
  warning: {
    rail: "bc-diff-remove bg-diff-remove/10",
    icon: "c-diff-remove",
    Icon: WarningTriangle,
  },
  success: {
    rail: "bc-diff-add bg-diff-add/10",
    icon: "c-diff-add",
    Icon: CheckCircle,
  },
};

export default function Admonition({ kind = "note", title, children }: Props) {
  const { rail, icon, Icon } = KINDS[kind] ?? KINDS.note;

  return (
    <div className={`d-f g-3 my-6 pl-3 pr-4 py-3 blw-2 ${rail}`}>
      <Icon className={`fs-0 w-4 h-4 mt-1 ${icon}`} aria-hidden />
      <div className="f-1 min-w-0">
        {title && <p className={`m-0 mb-1 fs-sm fw-600 ${icon}`}>{title}</p>}
        <div className="admonition-body">{children}</div>
      </div>
    </div>
  );
}
