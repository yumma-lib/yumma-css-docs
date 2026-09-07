"use client";

import { NumberField } from "@base-ui/react/number-field";
import { Minus, Plus } from "iconoir-react";
import type { ComponentProps } from "react";
import { useId } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const BUTTON =
  "d-f ai-c jc-c bg-white bc-silver-3 c-slate-10 byw-1 us-none c-p h:bg-silver-1/50 a:bg-silver-2";

const BUTTON_SIZES: Record<Size, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const INPUT_SIZES: Record<Size, string> = {
  sm: "h-8 w-28 fs-sm",
  md: "h-10 w-32 fs-md",
  lg: "h-12 w-36 fs-lg",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "w-3 h-3",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const DECREMENT_SHAPES: Record<Shape, string> = {
  rounded: "blr-lg",
  square: "",
  squircle: "blr-xxl cs-s",
};

const INCREMENT_SHAPES: Record<Shape, string> = {
  rounded: "brr-lg",
  square: "",
  squircle: "brr-xxl cs-s",
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
  shape = "rounded",
  shadow = "none",
  disabled = false,
  className,
  ...props
}: NumberFieldProps) {
  const id = useId();

  const decrementClasses = [
    BUTTON,
    BUTTON_SIZES[size],
    "blw-1",
    DECREMENT_SHAPES[shape],
    SHADOWS[shadow],
  ]
    .filter(Boolean)
    .join(" ");

  const incrementClasses = [
    BUTTON,
    BUTTON_SIZES[size],
    "brw-1",
    INCREMENT_SHAPES[shape],
    SHADOWS[shadow],
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = merge(
    "bg-white bc-silver-3 c-slate-10 byw-1 ta-c",
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

      <NumberField.Group className="d-f fw:oo--1 fw:oc-indigo-5">
        <NumberField.Decrement className={decrementClasses}>
          <Minus className={ICON_SIZES[size]} />
        </NumberField.Decrement>
        <NumberField.Input required={required} className={inputClasses} />
        <NumberField.Increment className={incrementClasses}>
          <Plus className={ICON_SIZES[size]} />
        </NumberField.Increment>
      </NumberField.Group>

      {description && <p className="m-0 c-slate-6 fs-xs">{description}</p>}
    </NumberField.Root>
  );
}
