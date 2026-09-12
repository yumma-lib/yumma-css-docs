"use client";

import { Slider } from "@base-ui/react/slider";
import { type FocusEvent, type ReactNode, useState } from "react";
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
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

// Switch's thumb sits in a box a padding wider on every side, the way Switch's
// own `px-1` holds it off the ends of its track. Base UI measures that box, so
// the same padding is what keeps the fill clear of the thumb: the indicator
// takes half a box past `--start-position`, which is the box's edge and a
// padding beyond the thumb's.
const THUMB_BOX = "d-f ai-c jc-c w-6 h-5 p-1";
const BOX = "1.5rem";
const HALF_BOX = "0.75rem";

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
  shape = "square",
  shadow = "none",
  disabled = false,
  formatValue = defaultFormat,
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<Value>(
    defaultValue ?? controlledValue ?? 0,
  );
  const [focused, setFocused] = useState(-1);
  const value = controlledValue ?? internalValue;
  const isRange = Array.isArray(value);

  const handleChange = (next: Value) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  // Focus is held in state because `fv:` never matches here: Base UI puts the
  // focusable `<input type="range">` inside the thumb, so the ring has to be
  // driven from the input's own focus.
  const thumbClasses = (index: number) =>
    merge(
      "w-4 h-3 bg-white",
      SHAPES[shape],
      focused === index ? "os-s ow-3 oo-0 oc-indigo-2/60" : "",
    );

  const focusProps = (index: number) => ({
    onFocus: (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.matches(":focus-visible")) setFocused(index);
    },
    onBlur: () => setFocused(-1),
  });

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
        thumbAlignment="edge"
      >
        <Slider.Control
          className={`d-f ai-c py-2 us-none ta-none ${disabled ? "c-na" : ""}`}
        >
          <Slider.Track
            className={merge(
              "p-r h-5 w-100% bg-silver-1",
              SHAPES[shape],
              SHADOWS[shadow],
            )}
          >
            <Slider.Indicator
              style={
                isRange
                  ? {
                      insetInlineStart: `calc(var(--start-position) - ${HALF_BOX})`,
                      width: `calc(var(--relative-size) + ${BOX})`,
                    }
                  : { width: `calc(var(--start-position) + ${HALF_BOX})` }
              }
              className={merge(
                disabled ? "bg-silver-3" : "bg-indigo",
                SHAPES[shape],
              )}
            />
            {isRange ? (
              value.map((_, index) => (
                <Slider.Thumb
                  // biome-ignore lint/suspicious/noArrayIndexKey: positional by design
                  key={index}
                  index={index}
                  className={THUMB_BOX}
                  {...focusProps(index)}
                >
                  <span className={thumbClasses(index)} />
                </Slider.Thumb>
              ))
            ) : (
              <Slider.Thumb className={THUMB_BOX} {...focusProps(0)}>
                <span className={thumbClasses(0)} />
              </Slider.Thumb>
            )}
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>

      {description && <p className="m-0 c-slate-6 fs-xs">{description}</p>}
    </div>
  );
}
