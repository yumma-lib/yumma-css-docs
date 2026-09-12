"use client";

import { NumberField } from "@base-ui/react/number-field";
import { NavArrowDown, NavArrowUp } from "iconoir-react";
import type { ComponentProps } from "react";
import { useId } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

// A number field is a field that happens to step, so the number gets the room
// and the steppers become a column at the trailing edge.
const STEP =
  "d-f ai-c jc-c bg-white c-slate-10 us-none c-p h:bg-silver-1/50 a:bg-silver-2 fv:os-s fv:ow-3 fv:oo--1 fv:oc-silver-3/60 fv:bc-silver-5";

const STEP_SIZES: Record<Size, string> = {
  sm: "w-6 h-4",
  md: "w-7 h-5",
  lg: "w-8 h-6",
};

const INPUT_SIZES: Record<Size, string> = {
  sm: "h-8 w-28 pl-3 fs-sm",
  md: "h-10 w-32 pl-3 fs-md",
  lg: "h-12 w-36 pl-4 fs-lg",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-4 h-4",
};

// The outline follows the group's own radius, and the group had none: the
// corners live on the end buttons, so the focus ring drew a square.
const GROUP_SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

export interface NumberFieldProps
  extends Omit<ComponentProps<typeof NumberField.Root>, "className" | "id"> {
  label?: string;

  required?: boolean;

  description?: string;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;

  className?: string;
}

export default function NumberFieldBase({
  label,
  required = false,
  description,
  size = "md",
  shape = "square",
  shadow = "none",
  disabled = false,
  className,
  ...props
}: NumberFieldProps) {
  const id = useId();

  const stepClasses = [STEP, STEP_SIZES[size]].join(" ");

  const inputClasses = merge(
    "bg-white bc-transparent c-slate-10 bw-1 ta-l fv:os-s fv:ow-3 fv:oo--1 fv:oc-silver-3/60 fv:bc-silver-5",
    INPUT_SIZES[size],
    SHADOWS[shadow],
    className,
  );

  return (
    <NumberField.Root
      id={id}
      disabled={disabled}
      className={`d-f fd-c ai-fs g-2 ${disabled ? "o-60 c-na" : ""}`}
      {...props}
    >
      {label && (
        <NumberField.ScrubArea className="c-er">
          <label htmlFor={id} className="c-slate-10 fs-sm fw-500 c-er">
            {label}
            {required && <span className="c-red-5"> *</span>}
          </label>
        </NumberField.ScrubArea>
      )}

      <NumberField.Group
        className={`d-f o-h bc-silver-3 bw-1 ${GROUP_SHAPES[shape]}`}
      >
        <NumberField.Input required={required} className={inputClasses} />
        <span className="d-f fd-c blc-silver-3 blw-1">
          <NumberField.Increment className={stepClasses}>
            <NavArrowUp className={ICON_SIZES[size]} />
          </NumberField.Increment>
          <NumberField.Decrement
            className={`${stepClasses} btc-silver-3 btw-1`}
          >
            <NavArrowDown className={ICON_SIZES[size]} />
          </NumberField.Decrement>
        </span>
      </NumberField.Group>

      {description && <p className="m-0 c-slate-6 fs-xs">{description}</p>}
    </NumberField.Root>
  );
}
