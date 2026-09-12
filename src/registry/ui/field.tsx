"use client";

import { Field } from "@base-ui/react/field";
import { Toggle } from "@base-ui/react/toggle";
import { Check, Eye, EyeClosed, WarningTriangle } from "iconoir-react";
import { type ComponentProps, type ReactNode, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconSide = "leading" | "trailing";
type Status = "default" | "error" | "success";

const SIZES: Record<Size, string> = {
  sm: "h-8 w-56",
  md: "h-10 w-64",
  lg: "h-12 w-72",
};

const HEIGHTS: Record<Size, string> = { sm: "h-8", md: "h-10", lg: "h-12" };

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "br-0",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const ICON_PADDING: Record<IconSide, string> = {
  leading: "pl-10 pr-4",
  trailing: "pl-4 pr-10",
};

const STATUS_BORDER: Record<Status, string> = {
  default: "bc-silver-3",
  error: "bc-red-5",
  success: "bc-green-5",
};

const STATUS_RING: Record<Status, string> = {
  default: "fv:oc-silver-3/60 fv:bc-silver-5",
  error: "fv:oc-red-2/60 fv:bc-red-3",
  success: "fv:oc-green-2/60 fv:bc-green-3",
};

const STATUS_ICON: Record<Status, string> = {
  default: "",
  error: "c-red-5",
  success: "c-green-5",
};

const STATUS_MESSAGE: Record<Status, string> = {
  default: "c-slate-6",
  error: "c-red-5",
  success: "c-green-6",
};

export interface FieldProps
  extends Omit<ComponentProps<typeof Field.Control>, "size"> {
  // merge composes a string, so the Base UI function form is not accepted here.
  className?: string;
  label?: string;

  description?: string;

  error?: string;

  success?: string;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;

  icon?: ReactNode;
  /** Does nothing while `revealable` is true. */
  iconPosition?: IconSide;

  /** Does nothing while `revealable` is true. */
  iconInteractive?: boolean;

  prefixNode?: ReactNode;

  suffix?: ReactNode;

  /** Adds a trailing button that shows and hides the value. Password fields. */
  revealable?: boolean;
}

export default function FieldBase({
  label,
  description,
  error,
  success,
  size = "md",
  shape = "square",
  shadow = "none",
  icon,
  iconPosition = "leading",
  iconInteractive = false,
  prefixNode,
  suffix,
  revealable = false,
  disabled,
  required,
  className,
  type,
  ...props
}: FieldProps) {
  const [revealed, setRevealed] = useState(false);
  const status: Status = error ? "error" : success ? "success" : "default";
  const message = error ?? success ?? description;
  const reveal = revealable;
  const controlType = reveal && revealed ? "text" : type;
  const trailingIcon = reveal ? (
    <Toggle
      aria-label={revealed ? "Hide" : "Show"}
      pressed={revealed}
      onPressedChange={setRevealed}
      disabled={disabled}
      className="d-f ai-c jc-c p-0 bg-transparent bw-0 c-slate-6 c-p us-none fv:os-s fv:ow-3 fv:oo-0 fv:oc-silver-3/60 fv:bc-silver-5"
    >
      {revealed ? (
        <Eye className="w-4 h-4" />
      ) : (
        <EyeClosed className="w-4 h-4" />
      )}
    </Toggle>
  ) : (
    icon
  );
  const activeIcon = reveal ? trailingIcon : icon;
  const showDecorativeIcon = Boolean(activeIcon) && status === "default";
  const activeSide: IconSide =
    reveal || status !== "default" ? "trailing" : iconPosition;
  const hasAffix = Boolean(prefixNode) || Boolean(suffix);

  const controlClasses = merge(
    "bg-white c-slate-10 bw-1 fs-md fv:os-s fv:ow-3 fv:oo-0",
    SIZES[size],
    SHAPES[shape],
    SHADOWS[shadow],
    STATUS_BORDER[status],
    STATUS_RING[status],
    showDecorativeIcon || status !== "default"
      ? ICON_PADDING[activeSide]
      : "px-4",
    className,
  );

  const affixControlClasses = merge(
    "fg-1 bg-white bc-silver-3 c-slate-10 byw-1 fs-md fv:os-s fv:ow-3 fv:oo-0",
    HEIGHTS[size],
    STATUS_RING[status],
    prefixNode && suffix
      ? "px-3"
      : prefixNode
        ? "pl-3 pr-4 brr-lg brw-1"
        : "pl-4 pr-3 blr-lg blw-1",
  );

  const affixBoxClasses =
    "d-f ai-c jc-c px-3 bg-white bc-silver-3 c-slate-6 byw-1 fs-md";

  return (
    <Field.Root
      disabled={disabled}
      className={`d-f fd-c g-2 c-slate-10 fs-sm ${disabled ? "o-60 c-na" : ""}`}
    >
      {label && (
        <Field.Label className="fw-500">
          {label}
          {required && <span className="c-red-5"> *</span>}
        </Field.Label>
      )}

      {hasAffix ? (
        <div className="d-f ai-c">
          {prefixNode && (
            <div className={`${affixBoxClasses} blr-lg blw-1`}>
              {prefixNode}
            </div>
          )}
          <Field.Control
            required={required}
            type={controlType}
            className={affixControlClasses}
            {...props}
          />
          {suffix && (
            <div className={`${affixBoxClasses} brr-lg brw-1`}>{suffix}</div>
          )}
        </div>
      ) : (
        <div className="d-f p-r ai-c">
          {showDecorativeIcon && (
            <span
              className={merge(
                "d-f p-a ai-c c-slate-5",
                !(iconInteractive || reveal) && "pe-none",
                activeSide === "leading" ? "l-3" : "r-3",
              )}
            >
              {activeIcon}
            </span>
          )}
          <Field.Control
            required={required}
            type={controlType}
            className={controlClasses}
            {...props}
          />
          {status !== "default" && (
            <span className={`d-f p-a r-3 ai-c pe-none ${STATUS_ICON[status]}`}>
              {status === "error" ? (
                <WarningTriangle className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </span>
          )}
        </div>
      )}

      {message && (
        <Field.Description className={`fs-xs ${STATUS_MESSAGE[status]}`}>
          {message}
        </Field.Description>
      )}
    </Field.Root>
  );
}
