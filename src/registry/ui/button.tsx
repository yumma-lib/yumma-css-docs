import { Button } from "@base-ui/react/button";
import type { ComponentProps, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Variant = "primary" | "secondary" | "subtle" | "ghost" | "danger" | "link";
type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle" | "pill";
type Shadow = "none" | "inset" | "outset";
type IconSide = "leading" | "trailing";

const BASE = "d-if ai-c jc-c g-2 bw-1 fw-500 us-none fv:os-s fv:ow-3 fv:oo-0";

const MOTION = "tp-c tdu-150 ttf-io";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-indigo h:bg-indigo-8 bc-indigo-7 c-white fv:oc-indigo-2/60 fv:bc-indigo-3",
  secondary:
    "bg-white bc-silver-2 c-slate-10 h:bg-silver-1/50 fv:oc-indigo-2/60 fv:bc-indigo-3",
  subtle:
    "bg-silver-1 bc-transparent c-slate-7 h:bg-silver-2 fv:oc-indigo-2/60 fv:bc-indigo-3",
  ghost:
    "bg-transparent bc-transparent c-slate-10 h:bg-silver-1/50 h:c-slate-7 fv:oc-indigo-2/60 fv:bc-indigo-3",
  danger: "bg-red h:bg-red-8 bc-red-7 c-white fv:oc-red-2/60 fv:bc-red-3",
  link: "bg-transparent bc-transparent c-slate-10 tuo-2 h:td-u fv:oc-indigo-2/60 fv:bc-indigo-3",
};

const SIZES: Record<Size, string> = {
  sm: "px-2 py-1 fs-sm",
  md: "px-3 py-2 fs-md",
  lg: "px-4 py-3 fs-lg",
};

const ICON_ONLY: Record<Size, string> = {
  sm: "p-1",
  md: "p-2",
  lg: "p-3",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "br-0",
  squircle: "br-xxl cs-s",
  pill: "br-9999",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

export interface ButtonProps extends ComponentProps<typeof Button> {
  // merge composes a string, so the Base UI function form is not accepted here.
  className?: string;
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: IconSide;
  iconOnly?: boolean;
  transition?: boolean;
  children?: ReactNode;
}

export default function ButtonBase({
  variant = "primary",
  size = "md",
  shape = "square",
  shadow = "none",
  loading = false,
  icon,
  iconPosition = "leading",
  iconOnly = false,
  transition = true,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const inactive = disabled || loading;
  // `iconOnly` needs an icon to be only. Without one it dropped the label and
  // put nothing in its place, and `ICON_ONLY` is padding rather than a fixed
  // size - so the button collapsed to an empty 18px box. The prop yields
  // instead: no icon, no effect.
  const iconOnlyActive = iconOnly && Boolean(icon);

  const classes = merge(
    BASE,
    transition ? MOTION : "",
    VARIANTS[variant],
    iconOnlyActive ? ICON_ONLY[size] : SIZES[size],
    SHAPES[shape],
    SHADOWS[shadow],
    inactive ? "o-60 c-na" : "c-p",
    className,
  );

  return (
    <Button
      className={classes}
      disabled={inactive}
      aria-busy={loading || undefined}
      // A label the eye cannot see still has to reach a screen reader, so a
      // string child becomes the name unless one is passed.
      aria-label={
        iconOnlyActive && typeof children === "string" ? children : undefined
      }
      {...props}
    >
      {iconOnlyActive ? (
        icon
      ) : (
        <>
          {iconPosition === "leading" && icon}
          {children}
          {iconPosition === "trailing" && icon}
        </>
      )}
    </Button>
  );
}
