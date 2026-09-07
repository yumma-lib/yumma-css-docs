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
  inset: "bs-i-sm",
  outset: "bs-o-xs",
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
const COLORS = {
  red: {
    subtleBg: "bg-red-1",
    subtleText: "c-red-7",
    subtleHover: "h:bg-red-2",
    solidBg: "bg-red",
    solidText: "c-red",
    solidHover: "h:bg-red-8",
    dotOutline: "bg-red-5",
    dotSubtle: "bg-red-7",
  },
  orange: {
    subtleBg: "bg-orange-1",
    subtleText: "c-orange-7",
    subtleHover: "h:bg-orange-2",
    solidBg: "bg-orange",
    solidText: "c-orange",
    solidHover: "h:bg-orange-8",
    dotOutline: "bg-orange-5",
    dotSubtle: "bg-orange-7",
  },
  yellow: {
    subtleBg: "bg-yellow-1",
    subtleText: "c-yellow-7",
    subtleHover: "h:bg-yellow-2",
    solidBg: "bg-yellow",
    solidText: "c-yellow",
    solidHover: "h:bg-yellow-8",
    dotOutline: "bg-yellow-5",
    dotSubtle: "bg-yellow-7",
  },
  lime: {
    subtleBg: "bg-lime-1",
    subtleText: "c-lime-7",
    subtleHover: "h:bg-lime-2",
    solidBg: "bg-lime",
    solidText: "c-lime",
    solidHover: "h:bg-lime-8",
    dotOutline: "bg-lime-5",
    dotSubtle: "bg-lime-7",
  },
  mint: {
    subtleBg: "bg-mint-1",
    subtleText: "c-mint-7",
    subtleHover: "h:bg-mint-2",
    solidBg: "bg-mint",
    solidText: "c-mint",
    solidHover: "h:bg-mint-8",
    dotOutline: "bg-mint-5",
    dotSubtle: "bg-mint-7",
  },
  green: {
    subtleBg: "bg-green-1",
    subtleText: "c-green-7",
    subtleHover: "h:bg-green-2",
    solidBg: "bg-green",
    solidText: "c-green",
    solidHover: "h:bg-green-8",
    dotOutline: "bg-green-5",
    dotSubtle: "bg-green-7",
  },
  cyan: {
    subtleBg: "bg-cyan-1",
    subtleText: "c-cyan-7",
    subtleHover: "h:bg-cyan-2",
    solidBg: "bg-cyan",
    solidText: "c-cyan",
    solidHover: "h:bg-cyan-8",
    dotOutline: "bg-cyan-5",
    dotSubtle: "bg-cyan-7",
  },
  sky: {
    subtleBg: "bg-sky-1",
    subtleText: "c-sky-7",
    subtleHover: "h:bg-sky-2",
    solidBg: "bg-sky",
    solidText: "c-sky",
    solidHover: "h:bg-sky-8",
    dotOutline: "bg-sky-5",
    dotSubtle: "bg-sky-7",
  },
  blue: {
    subtleBg: "bg-blue-1",
    subtleText: "c-blue-7",
    subtleHover: "h:bg-blue-2",
    solidBg: "bg-blue",
    solidText: "c-blue",
    solidHover: "h:bg-blue-8",
    dotOutline: "bg-blue-5",
    dotSubtle: "bg-blue-7",
  },
  indigo: {
    subtleBg: "bg-indigo-1",
    subtleText: "c-indigo-7",
    subtleHover: "h:bg-indigo-2",
    solidBg: "bg-indigo",
    solidText: "c-indigo",
    solidHover: "h:bg-indigo-8",
    dotOutline: "bg-indigo-5",
    dotSubtle: "bg-indigo-7",
  },
  violet: {
    subtleBg: "bg-violet-1",
    subtleText: "c-violet-7",
    subtleHover: "h:bg-violet-2",
    solidBg: "bg-violet",
    solidText: "c-violet",
    solidHover: "h:bg-violet-8",
    dotOutline: "bg-violet-5",
    dotSubtle: "bg-violet-7",
  },
  lavender: {
    subtleBg: "bg-lavender-1",
    subtleText: "c-lavender-7",
    subtleHover: "h:bg-lavender-2",
    solidBg: "bg-lavender",
    solidText: "c-lavender",
    solidHover: "h:bg-lavender-8",
    dotOutline: "bg-lavender-5",
    dotSubtle: "bg-lavender-7",
  },
  magenta: {
    subtleBg: "bg-magenta-1",
    subtleText: "c-magenta-7",
    subtleHover: "h:bg-magenta-2",
    solidBg: "bg-magenta",
    solidText: "c-magenta",
    solidHover: "h:bg-magenta-8",
    dotOutline: "bg-magenta-5",
    dotSubtle: "bg-magenta-7",
  },
  pink: {
    subtleBg: "bg-pink-1",
    subtleText: "c-pink-7",
    subtleHover: "h:bg-pink-2",
    solidBg: "bg-pink",
    solidText: "c-pink",
    solidHover: "h:bg-pink-8",
    dotOutline: "bg-pink-5",
    dotSubtle: "bg-pink-7",
  },
  coral: {
    subtleBg: "bg-coral-1",
    subtleText: "c-coral-7",
    subtleHover: "h:bg-coral-2",
    solidBg: "bg-coral",
    solidText: "c-coral",
    solidHover: "h:bg-coral-8",
    dotOutline: "bg-coral-5",
    dotSubtle: "bg-coral-7",
  },
  zinc: {
    subtleBg: "bg-zinc-1",
    subtleText: "c-zinc-7",
    subtleHover: "h:bg-zinc-2",
    solidBg: "bg-zinc-7",
    solidText: "c-zinc-7",
    solidHover: "h:bg-zinc-8",
    dotOutline: "bg-zinc-5",
    dotSubtle: "bg-zinc-7",
  },
  gray: {
    subtleBg: "bg-gray-1",
    subtleText: "c-gray-7",
    subtleHover: "h:bg-gray-2",
    solidBg: "bg-gray-7",
    solidText: "c-gray-7",
    solidHover: "h:bg-gray-8",
    dotOutline: "bg-gray-5",
    dotSubtle: "bg-gray-7",
  },
  slate: {
    subtleBg: "bg-slate-1",
    subtleText: "c-slate-7",
    subtleHover: "h:bg-slate-2",
    solidBg: "bg-slate-7",
    solidText: "c-slate-7",
    solidHover: "h:bg-slate-8",
    dotOutline: "bg-slate-5",
    dotSubtle: "bg-slate-7",
  },
  silver: {
    subtleBg: "bg-silver-1",
    subtleText: "c-silver-7",
    subtleHover: "h:bg-silver-2",
    solidBg: "bg-silver-7",
    solidText: "c-silver-7",
    solidHover: "h:bg-silver-8",
    dotOutline: "bg-silver-5",
    dotSubtle: "bg-silver-7",
  },
} satisfies Record<string, ColorSet>;

/**
 * Add a family here to use it: `theme.colors` is open, so the type follows
 * the table rather than repeating it.
 */
type Color = keyof typeof COLORS;

export interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  color?: Color;
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
  color = "indigo",
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
        ? [COLORS[color].subtleBg, "bw-0"].join(" ")
        : [COLORS[color].solidBg, "bw-0"].join(" "),
    className,
  );

  const contentColor =
    tone === "outline"
      ? "c-slate-10"
      : tone === "subtle"
        ? COLORS[color].subtleText
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
      ? COLORS[color].dotOutline
      : tone === "subtle"
        ? COLORS[color].dotSubtle
        : "bg-white",
  ]
    .filter(Boolean)
    .join(" ");

  const countClasses = [
    "d-if ai-c jc-c w-4 h-4 br-9999 fs-xs fw-500",
    tone === "outline"
      ? "bg-red c-white"
      : tone === "subtle"
        ? [COLORS[color].solidBg, "c-white"].join(" ")
        : ["bg-white", COLORS[color].solidText].join(" "),
  ]
    .filter(Boolean)
    .join(" ");

  const closeButtonClasses = [
    "d-f ai-c jc-c w-4 h-4 p-0 bg-transparent br-9999",
    contentColor,
    tone === "outline"
      ? "h:bg-silver-2"
      : tone === "subtle"
        ? COLORS[color].subtleHover
        : COLORS[color].solidHover,
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
