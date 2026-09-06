"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { motion } from "motion/react";
import { type ReactNode, useId, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";

interface SizeSpec {
  track: string;
  thumb: string;
  travel: number;
  travelClass: string;
}

const SIZES: Record<Size, SizeSpec> = {
  sm: { track: "h-4 w-7", thumb: "w-3 h-2", travel: 8, travelClass: "ml-2" },
  md: { track: "h-5 w-9", thumb: "w-4 h-3", travel: 12, travelClass: "ml-3" },
  lg: { track: "h-6 w-11", thumb: "w-5 h-4", travel: 16, travelClass: "ml-4" },
};

const SHAPES: Record<Shape, string> = {
  rounded: "br-9999",
  square: "",
  squircle: "br-xxl cs-s",
};

export interface SwitchProps {
  label?: string;
  description?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  icon?: ReactNode;
  size?: Size;
  shape?: Shape;
  disabled?: boolean;
  animate?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function SwitchBase({
  label,
  description,
  defaultChecked,
  checked: controlledChecked,
  onCheckedChange,
  icon,
  size = "md",
  shape = "rounded",
  disabled = false,
  animate = true,
  className,
  ariaLabel,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? controlledChecked ?? false,
  );
  const checked = controlledChecked ?? internalChecked;
  const id = useId();
  const { track, thumb, travel, travelClass } = SIZES[size];

  const handleChange = (next: boolean) => {
    setInternalChecked(next);
    onCheckedChange?.(next);
  };

  const trackClasses = merge(
    "p-r d-f ai-c m-0 px-1 tp-c tdu-150 ttf-io fv:oo-2 fv:oc-indigo-3",
    track,
    SHAPES[shape],
    checked ? "bg-indigo" : "bg-silver-1",
    disabled ? "" : "c-p",
    className,
  );

  const thumbClasses = ["bg-white", thumb, SHAPES[shape]]
    .filter(Boolean)
    .join(" ");

  return (
    <Field.Root
      className={`d-f fd-c g-1 ${disabled ? "o-60 c-na" : ""}`}
      disabled={disabled}
    >
      <div className="d-f ai-c g-2">
        <Switch.Root
          id={id}
          checked={checked}
          onCheckedChange={handleChange}
          aria-label={ariaLabel}
          className={trackClasses}
        >
          {icon && checked && (
            <span className="d-f p-a l-1 ai-c jc-c w-3 h-3 c-white">
              {icon}
            </span>
          )}
          <Switch.Thumb
            render={
              animate ? (
                <motion.span
                  animate={{ x: checked ? travel : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
              ) : undefined
            }
            className={
              animate
                ? thumbClasses
                : `${thumbClasses} ${checked ? travelClass : "ml-0"}`
            }
          />
        </Switch.Root>
        {label && (
          <Field.Label
            htmlFor={id}
            className={`c-slate-10 fs-sm fw-500 us-none ${disabled ? "" : "c-p"}`}
          >
            {label}
          </Field.Label>
        )}
      </div>

      {description && (
        <p className="pl-12 m-0 c-slate-6 fs-xs fw-400">{description}</p>
      )}
    </Field.Root>
  );
}
