"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { type ReactNode, useId } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconSide = "leading" | "trailing";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

const BASE =
  "d-f ai-c jc-c p-0 m-0 fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3";

const SIZES: Record<Size, string> = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const DOT_SIZES: Record<Size, string> = {
  sm: "w-1 h-1",
  md: "w-2 h-2",
  lg: "w-3 h-3",
};

const LABEL_SIZES: Record<Size, string> = {
  sm: "fs-xs",
  md: "fs-sm",
  lg: "fs-md",
};

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

export interface RadioProps {
  options: RadioOption[];
  label?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  iconPosition?: IconSide;
  disabled?: boolean;
  animated?: boolean;
  className?: string;
}

export default function RadioBase({
  options,
  label,
  defaultValue,
  value,
  onValueChange,
  size = "md",
  shape = "square",
  shadow = "none",
  iconPosition = "leading",
  disabled = false,
  animated = true,
  className,
}: RadioProps) {
  const labelId = useId();

  const dotClasses = (checked: boolean) =>
    checked ? `${DOT_SIZES[size]} ${SHAPES[shape]} bg-white` : "d-none";

  return (
    <div className="d-f fd-c g-2">
      {label && (
        <div id={labelId} className="fs-xs fw-600 c-slate-5 us-none">
          {label}
        </div>
      )}

      <RadioGroup
        aria-labelledby={label ? labelId : undefined}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className={merge("d-f fd-c g-3 ai-fs", className)}
      >
        {options.map((option) => {
          const rootClasses = (checked: boolean) =>
            [
              BASE,
              SIZES[size],
              SHAPES[shape],
              checked
                ? "bg-indigo"
                : `bg-white bw-1 bc-silver-3 ${SHADOWS[shadow]}`,
            ]
              .filter(Boolean)
              .join(" ");

          const indicator = (
            <Radio.Indicator className={(state) => dotClasses(state.checked)} />
          );

          return (
            <label
              key={option.value}
              className={`d-f fd-c g-1 fw-500 ${LABEL_SIZES[size]} ${
                disabled ? "o-60 c-na" : "c-slate-10 c-p"
              }`}
            >
              <div className="d-f ai-c g-2">
                {option.icon && iconPosition === "leading" && (
                  <span className="d-f ai-c c-slate-5">{option.icon}</span>
                )}
                <Radio.Root
                  value={option.value}
                  className={(state) => rootClasses(state.checked)}
                  render={
                    animated
                      ? (props, _) => (
                          <motion.span {...(props as HTMLMotionProps<"span">)}>
                            {indicator}
                          </motion.span>
                        )
                      : undefined
                  }
                >
                  {animated ? undefined : indicator}
                </Radio.Root>
                <span>{option.label}</span>
                {option.icon && iconPosition === "trailing" && (
                  <span className="d-f ai-c c-slate-5 ml-auto">
                    {option.icon}
                  </span>
                )}
              </div>
              {option.description && (
                <p className="pl-6 m-0 c-slate-6 fs-xs fw-400">
                  {option.description}
                </p>
              )}
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
