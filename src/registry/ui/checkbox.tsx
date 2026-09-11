import { Checkbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "iconoir-react";
import type { ComponentProps, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const BOX =
  "d-f ai-c jc-c fs-0 fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3";

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
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const CHECKED = "bg-indigo";
const UNCHECKED = "bw-1 bc-silver-3 bg-transparent";

// Disabled is a surface, not a transparency. The fade this used to carry as
// well took the label's contrast down with it and flattened the very thing it
// was meant to mark, while the box underneath was already doing the work.
// Checked and unchecked share the surface: the tick is the difference, and it
// stays readable, because a control is usually disabled *because* its value
// was settled elsewhere and that value is what you want to read off it.
const DISABLED_BOX = "bw-1 bc-silver-2 bg-silver-1";

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
      className={`d-f fd-c g-1 us-none ${
        disabled ? "c-slate-5 c-na" : "c-slate-10 c-p"
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

              disabled
                ? DISABLED_BOX
                : state.checked || state.indeterminate
                  ? CHECKED
                  : UNCHECKED,
              className,
            )
          }
          {...props}
        >
          <Checkbox.Indicator
            className={`d-f ${disabled ? "c-slate-4" : "c-white"}`}
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
