import { Button } from "@base-ui/react";
import { Xmark } from "iconoir-react";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Tone = "outline" | "subtle" | "solid";
type Shape = "square" | "rounded" | "pill" | "squircle";
type Size = "sm" | "md" | "lg";
type Shadow = "none" | "inset" | "outset";
type IconPosition = "leading" | "trailing";

const SHAPES: Record<Shape, string> = {
  square: "",
  rounded: "br-sm",
  pill: "br-9999",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const SIZES: Record<Size, { pad: string; text: string; icon: string }> = {
  sm: { pad: "px-2 py-0", text: "fs-xs", icon: "w-3 h-3" },
  md: { pad: "px-2 py-1", text: "fs-xs", icon: "w-3 h-3" },
  lg: { pad: "px-3 py-1", text: "fs-md", icon: "w-4 h-4" },
};

interface ColorSet {
  subtleBg: string;
  subtleText: string;
  subtleHover: string;
  solidBg: string;
  solidText: string;
  solidHover: string;
  dotOutline: string;
  dotSubtle: string;
}

// Written out rather than built from the family name: the scanner reads
// source, so a template literal generates no CSS.
const INTENTS = {
  neutral: {
    subtleBg: "bg-slate-1",
    subtleText: "c-slate-7",
    subtleHover: "h:bg-slate-2",
    solidBg: "bg-slate",
    solidText: "c-slate",
    solidHover: "h:bg-slate-8",
    dotOutline: "bg-slate-5",
    dotSubtle: "bg-slate-7",
  },
  info: {
    subtleBg: "bg-blue-1",
    subtleText: "c-blue-7",
    subtleHover: "h:bg-blue-2",
    solidBg: "bg-blue",
    solidText: "c-blue",
    solidHover: "h:bg-blue-8",
    dotOutline: "bg-blue-5",
    dotSubtle: "bg-blue-7",
  },
  success: {
    subtleBg: "bg-green-1",
    subtleText: "c-green-7",
    subtleHover: "h:bg-green-2",
    solidBg: "bg-green",
    solidText: "c-green",
    solidHover: "h:bg-green-8",
    dotOutline: "bg-green-5",
    dotSubtle: "bg-green-7",
  },
  warning: {
    subtleBg: "bg-orange-1",
    subtleText: "c-orange-7",
    subtleHover: "h:bg-orange-2",
    solidBg: "bg-orange",
    solidText: "c-orange",
    solidHover: "h:bg-orange-8",
    dotOutline: "bg-orange-5",
    dotSubtle: "bg-orange-7",
  },
  danger: {
    subtleBg: "bg-red-1",
    subtleText: "c-red-7",
    subtleHover: "h:bg-red-2",
    solidBg: "bg-red",
    solidText: "c-red",
    solidHover: "h:bg-red-8",
    dotOutline: "bg-red-5",
    dotSubtle: "bg-red-7",
  },
} satisfies Record<string, ColorSet>;

/**
 * Five meanings, not nineteen hues. Point one at another family here and the
 * type follows the table rather than repeating it.
 */
type Intent = keyof typeof INTENTS;

export interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  intent?: Intent;
  shape?: Shape;
  size?: Size;
  shadow?: Shadow;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  dot?: boolean;
  count?: string | number;
  onClose?: () => void;
  className?: string;
}

export default function BadgeBase({
  children,
  tone = "outline",
  intent = "neutral",
  shape = "rounded",
  size = "md",
  shadow = "none",
  icon,
  iconPosition = "leading",
  dot = false,
  count,
  onClose,
  className,
}: BadgeProps) {
  const { pad, text, icon: iconSize } = SIZES[size];

  const badgeClasses = merge(
    "d-if ai-c g-1",
    pad,
    SHAPES[shape],
    shadow !== "none" ? SHADOWS[shadow] : "",
    tone === "outline"
      ? "bg-white bc-silver-2 bw-1"
      : tone === "subtle"
        ? [INTENTS[intent].subtleBg, "bw-0"].join(" ")
        : [INTENTS[intent].solidBg, "bw-0"].join(" "),
    className,
  );

  const contentColor =
    tone === "outline"
      ? "c-slate-10"
      : tone === "subtle"
        ? INTENTS[intent].subtleText
        : "c-white";

  const textClasses = [text, "fw-500 us-none", contentColor]
    .filter(Boolean)
    .join(" ");

  const iconClasses = ["d-if ai-c jc-c fs-0", iconSize, contentColor]
    .filter(Boolean)
    .join(" ");

  const dotClasses = [
    "w-2 h-2 br-9999",
    tone === "outline"
      ? INTENTS[intent].dotOutline
      : tone === "subtle"
        ? INTENTS[intent].dotSubtle
        : "bg-white",
  ]
    .filter(Boolean)
    .join(" ");

  const countClasses = [
    "d-if ai-c jc-c w-4 h-4 br-9999 fs-xs fw-500",
    tone === "outline"
      ? "bg-red c-white"
      : tone === "subtle"
        ? [INTENTS[intent].solidBg, "c-white"].join(" ")
        : ["bg-white", INTENTS[intent].solidText].join(" "),
  ]
    .filter(Boolean)
    .join(" ");

  const closeButtonClasses = [
    "d-f ai-c jc-c w-4 h-4 p-0 bg-transparent br-9999",
    contentColor,
    tone === "outline"
      ? "h:bg-silver-2"
      : tone === "subtle"
        ? INTENTS[intent].subtleHover
        : INTENTS[intent].solidHover,
    "fv:oo-2 fv:oc-indigo-5",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClasses}>
      {dot && <span className={dotClasses} />}
      {icon && iconPosition === "leading" && (
        <span className={iconClasses}>{icon}</span>
      )}
      <span className={textClasses}>{children}</span>
      {icon && iconPosition === "trailing" && (
        <span className={iconClasses}>{icon}</span>
      )}
      {count !== undefined && <span className={countClasses}>{count}</span>}
      {onClose && (
        <Button type="button" onClick={onClose} className={closeButtonClasses}>
          <Xmark className={iconSize} />
        </Button>
      )}
    </span>
  );
}
