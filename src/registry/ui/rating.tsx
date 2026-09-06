"use client";

import { Toggle } from "@base-ui/react/toggle";
import { Star } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shadow = "none" | "inset" | "outset";

export interface RatingIcon {
  icon: ReactNode;
  label: string;
  activeClassName?: string;
}

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bg-white bc-silver-2 bw-1 bs-i-sm",
  outset: "bg-white bc-silver-2 bw-1 bs-o-xs",
};

export interface RatingProps {
  label?: string;
  count?: number;
  icons?: RatingIcon[];
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  readOnly?: boolean;
  shadow?: Shadow;
  animate?: boolean;
  emptyHint?: string;
  children?: ReactNode;
  className?: string;
}

export default function RatingBase({
  label,
  count = 5,
  icons,
  defaultValue,
  value: controlledValue,
  onValueChange,
  disabled = false,
  readOnly = false,
  shadow = "none",
  animate = true,
  emptyHint = "Click to rate",
  children,
  className,
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? controlledValue ?? (icons ? -1 : 0),
  );
  const value = controlledValue ?? internalValue;

  const handleChange = (next: number) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const shadowClass =
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "";

  const starClasses = (pressed: boolean) =>
    [
      "d-f ai-c jc-c w-9 h-9 br-lg us-none",
      shadowClass || "bw-0",
      disabled ? "c-na o-60" : "",
      !disabled && !readOnly ? "c-p fv:oo--1 fv:oc-indigo-5" : "",
      pressed ? "c-yellow-5" : "c-slate-4",
      !disabled && !readOnly && !pressed ? "h:c-slate-6" : "",
      shadowClass ? "" : "bg-transparent",
    ]
      .filter(Boolean)
      .join(" ");

  const iconClasses = (option: RatingIcon, active: boolean) =>
    merge(
      "d-f ai-c jc-c w-12 h-12 bw-0 br-lg us-none",
      disabled ? "c-na o-60" : "c-p fv:oo--1 fv:oc-indigo-5",
      active ? (option.activeClassName ?? "c-yellow-5") : "c-slate-4",
      !disabled && !active ? "h:c-slate-6" : "",
    );

  return (
    <div className={merge("d-f fd-c ai-c jc-c g-4 p-8 h-56", className)}>
      {label && <span className="c-slate-10 fs-sm fw-500">{label}</span>}

      <Row
        className={`d-f ${icons ? "g-3" : "g-1"}`}
        readOnly={readOnly}
        label={`${value} out of ${count} stars`}
      >
        {icons
          ? icons.map((option, index) => {
              const active = index === value;
              return (
                <Toggle
                  key={option.label}
                  pressed={active}
                  disabled={disabled}
                  onPressedChange={() => handleChange(active ? -1 : index)}
                  aria-label={option.label}
                  className={iconClasses(option, active)}
                  render={
                    animate && !disabled
                      ? (props) => (
                          <motion.button
                            type="button"
                            {...(props as HTMLMotionProps<"button">)}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            {option.icon}
                          </motion.button>
                        )
                      : undefined
                  }
                >
                  {animate && !disabled ? undefined : option.icon}
                </Toggle>
              );
            })
          : Array.from({ length: count }, (_, index) => index + 1).map(
              (star) => {
                const filled = star <= value;
                const icon = (
                  <Star
                    className="w-6 h-6"
                    style={{ fill: filled ? "currentColor" : "none" }}
                  />
                );

                if (readOnly) {
                  return (
                    <span key={star} className={starClasses(filled)}>
                      {icon}
                    </span>
                  );
                }

                return (
                  <Toggle
                    key={star}
                    pressed={filled}
                    disabled={disabled}
                    onPressedChange={() =>
                      handleChange(star === value ? 0 : star)
                    }
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    className={starClasses(filled)}
                    render={
                      animate && !disabled
                        ? (props) => (
                            <motion.button
                              type="button"
                              {...(props as HTMLMotionProps<"button">)}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                              {icon}
                            </motion.button>
                          )
                        : undefined
                    }
                  >
                    {animate && !disabled ? undefined : icon}
                  </Toggle>
                );
              },
            )}
      </Row>

      <span className="c-slate-6 fs-xs">
        {icons
          ? value >= 0
            ? icons[value].label
            : emptyHint
          : value > 0
            ? `${value} / ${count}`
            : emptyHint}
      </span>

      {children}
    </div>
  );
}

function Row({
  className,
  readOnly,
  label,
  children,
}: {
  className: string;
  readOnly: boolean;
  label: string;
  children: ReactNode;
}) {
  if (readOnly) {
    return (
      <div role="img" aria-label={label} className={className}>
        {children}
      </div>
    );
  }
  return <div className={className}>{children}</div>;
}
