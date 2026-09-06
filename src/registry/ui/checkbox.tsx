import { Checkbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "iconoir-react";
import type { ComponentProps, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const BOX = "d-f ai-c jc-c fs-0 fv:oo-2 fv:oc-indigo-5";

const SIZES: Record<Size, string> = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const LABEL_SIZES: Record<Size, string> = {
  sm: "fs-xs",
  md: "fs-sm",
  lg: "fs-md",
};

const DESCRIPTION_INDENT: Record<Size, string> = {
  sm: "ml-5",
  md: "ml-6",
  lg: "ml-7",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br-sm",
  square: "br-0",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

const CHECKED = "bg-indigo";
const UNCHECKED = "bw-1 bc-silver-3 bg-transparent";

export interface CheckboxProps
  extends Omit<ComponentProps<typeof Checkbox.Root>, "className"> {
  label?: ReactNode;

  description?: string;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  className?: string;
}

export default function CheckboxBase({
  label,
  description,
  size = "md",
  shape = "rounded",
  shadow = "none",
  disabled = false,
  className,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={`d-f fd-c g-1 c-slate-10 us-none ${
        disabled ? "o-60 c-na" : "c-p"
      }`}
    >
      <span className={`d-f ai-c g-2 fw-500 ${LABEL_SIZES[size]}`}>
        <Checkbox.Root
          disabled={disabled}
          className={(state) =>
            merge(
              BOX,
              SIZES[size],
              SHAPES[shape],
              SHADOWS[shadow],

              state.checked || state.indeterminate ? CHECKED : UNCHECKED,
              className,
            )
          }
          {...props}
        >
          <Checkbox.Indicator
            className="d-f c-white"
            render={(indicatorProps, state) => (
              <span {...indicatorProps}>
                {state.indeterminate ? (
                  <Minus className={ICON_SIZES[size]} />
                ) : (
                  <Check className={ICON_SIZES[size]} />
                )}
              </span>
            )}
          />
        </Checkbox.Root>
        {label}
      </span>

      {description && (
        <span className={`c-slate-6 fs-xs ${DESCRIPTION_INDENT[size]}`}>
          {description}
        </span>
      )}
    </label>
  );
}
