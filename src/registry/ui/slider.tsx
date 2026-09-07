"use client";

import { Slider } from "@base-ui/react/slider";
import { type ReactNode, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type Value = number | number[];

const SHAPES: Record<Shape, string> = {
  rounded: "br-9999",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

function defaultFormat(value: Value): ReactNode {
  return Array.isArray(value) ? `${value[0]} - ${value[1]}` : `${value}%`;
}

export interface SliderProps {
  label?: string;
  required?: boolean;
  description?: string;
  defaultValue?: Value;
  value?: Value;
  onValueChange?: (value: Value) => void;
  min?: number;
  max?: number;
  step?: number;
  shape?: Shape;
  shadow?: Shadow;
  disabled?: boolean;
  formatValue?: (value: Value) => ReactNode;
  className?: string;
}

export default function SliderBase({
  label,
  required = false,
  description,
  defaultValue,
  value: controlledValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  shape = "rounded",
  shadow = "none",
  disabled = false,
  formatValue = defaultFormat,
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<Value>(
    defaultValue ?? controlledValue ?? 0,
  );
  const value = controlledValue ?? internalValue;
  const isRange = Array.isArray(value);

  const handleChange = (next: Value) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const thumbClasses = [
    "w-5 h-5 bg-white bc-silver-3 bw-1 fv:oo-2 fv:oc-indigo-5",
    SHAPES[shape],
    SHADOWS[shadow],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={merge("d-f fd-c g-2 w-64", className)}>
      <div className="d-f ai-c jc-sb">
        {label && (
          <label className="c-slate-10 fs-sm fw-500 us-none">
            {label}
            {required && <span className="c-red-5"> *</span>}
          </label>
        )}
        <span className="c-slate-8 fs-sm">{formatValue(value)}</span>
      </div>

      <Slider.Root
        value={value}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      >
        <Slider.Control
          className={`d-f ai-c py-3 us-none ta-none ${disabled ? "o-60 c-na" : ""}`}
        >
          <Slider.Track
            className={`p-r h-2 w-100% bg-silver-1 ${SHAPES[shape]}`}
          >
            <Slider.Indicator className={`bg-indigo ${SHAPES[shape]}`} />
            {isRange ? (
              value.map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: positional by design
                <Slider.Thumb key={index} className={thumbClasses} />
              ))
            ) : (
              <Slider.Thumb className={thumbClasses} />
            )}
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>

      {description && <p className="m-0 c-slate-6 fs-xs">{description}</p>}
    </div>
  );
}
