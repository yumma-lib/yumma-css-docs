import { Button } from "@base-ui/react";
import { Xmark } from "iconoir-react";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Tone = "outline" | "subtle" | "solid";
type Color = "slate" | "indigo" | "red" | "green" | "yellow" | "orange";
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

const SUBTLE_BG: Record<Color, string> = {
  slate: "bg-slate-1",
  indigo: "bg-indigo-1",
  red: "bg-red-1",
  green: "bg-green-1",
  yellow: "bg-yellow-1",
  orange: "bg-orange-1",
};

const SUBTLE_TEXT: Record<Color, string> = {
  slate: "c-slate-7",
  indigo: "c-indigo-7",
  red: "c-red-7",
  green: "c-green-7",
  yellow: "c-yellow-7",
  orange: "c-orange-7",
};

const SOLID_BG: Record<Color, string> = {
  slate: "bg-slate-7",
  indigo: "bg-indigo",
  red: "bg-red",
  green: "bg-green",
  yellow: "bg-yellow",
  orange: "bg-orange",
};

const SOLID_TEXT: Record<Color, string> = {
  slate: "c-slate-7",
  indigo: "c-indigo",
  red: "c-red",
  green: "c-green",
  yellow: "c-yellow",
  orange: "c-orange",
};

const DOT_OUTLINE: Record<Color, string> = {
  slate: "bg-slate-5",
  indigo: "bg-indigo-5",
  red: "bg-red-5",
  green: "bg-green-5",
  yellow: "bg-yellow-5",
  orange: "bg-orange-5",
};

const DOT_SUBTLE: Record<Color, string> = {
  slate: "bg-slate-7",
  indigo: "bg-indigo-7",
  red: "bg-red-7",
  green: "bg-green-7",
  yellow: "bg-yellow-7",
  orange: "bg-orange-7",
};

const SOLID_HOVER: Record<Color, string> = {
  slate: "h:bg-slate-8",
  indigo: "h:bg-indigo-8",
  red: "h:bg-red-8",
  green: "h:bg-green-8",
  yellow: "h:bg-yellow-8",
  orange: "h:bg-orange-8",
};

const SUBTLE_HOVER: Record<Color, string> = {
  slate: "h:bg-slate-2",
  indigo: "h:bg-indigo-2",
  red: "h:bg-red-2",
  green: "h:bg-green-2",
  yellow: "h:bg-yellow-2",
  orange: "h:bg-orange-2",
};

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
        ? [SUBTLE_BG[color], "bw-0"].join(" ")
        : [SOLID_BG[color], "bw-0"].join(" "),
    className,
  );

  const contentColor =
    tone === "outline"
      ? "c-slate-10"
      : tone === "subtle"
        ? SUBTLE_TEXT[color]
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
      ? DOT_OUTLINE[color]
      : tone === "subtle"
        ? DOT_SUBTLE[color]
        : "bg-white",
  ]
    .filter(Boolean)
    .join(" ");

  const countClasses = [
    "d-if ai-c jc-c w-4 h-4 br-9999 fs-xs fw-500",
    tone === "outline"
      ? "bg-red c-white"
      : tone === "subtle"
        ? [SOLID_BG[color], "c-white"].join(" ")
        : ["bg-white", SOLID_TEXT[color]].join(" "),
  ]
    .filter(Boolean)
    .join(" ");

  const closeButtonClasses = [
    "d-f ai-c jc-c w-4 h-4 p-0 bg-transparent br-9999",
    contentColor,
    tone === "outline"
      ? "h:bg-silver-2"
      : tone === "subtle"
        ? SUBTLE_HOVER[color]
        : SOLID_HOVER[color],
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
