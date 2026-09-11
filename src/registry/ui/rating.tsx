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
  inset: "bg-white bc-silver-2 bw-1 bs-i-md",
  outset: "bg-white bc-silver-2 bw-1 bs-o-sm",
};

export interface RatingProps {
  label?: string;
  max?: number;
  icons?: RatingIcon[];
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  readOnly?: boolean;
  shadow?: Shadow;
  animated?: boolean;
  emptyHint?: string;
  /**
   * A figure beside the marks rather than under them - an average, where the
   * marks round it. Without it the row is unchanged.
   */
  score?: ReactNode;
  /**
   * Replaces the `3 / 5` readout under the marks. A read-only average reports
   * what it is an average *of*, which the number of filled stars cannot say.
   */
  hint?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function RatingBase({
  label,
  max = 5,
  icons,
  defaultValue,
  value: controlledValue,
  onValueChange,
  disabled = false,
  readOnly = false,
  shadow = "none",
  animated = true,
  emptyHint = "Click to rate",
  score,
  hint,
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

  // `p-0` is not decoration. Yumma's normalize gives every button `.5rem` of
  // padding, so a 36px button with `box-sizing:border-box` leaves 20px of
  // content and the 24px star is squeezed to 20 wide by 24 tall. The read-only
  // star is a `<span>`, which never had the padding, so it drew at its real
  // size - and the difference read as read-only making the stars *bigger*.
  const starClasses = (pressed: boolean) =>
    [
      "d-f ai-c jc-c p-0 w-9 h-9 br-lg us-none",
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
      "d-f ai-c jc-c p-0 w-12 h-12 bw-0 br-lg us-none",
      disabled ? "c-na o-60" : "c-p fv:oo--1 fv:oc-indigo-5",
      active ? (option.activeClassName ?? "c-yellow-5") : "c-slate-4",
      !disabled && !active ? "h:c-slate-6" : "",
    );

  return (
    <div className={merge("d-f fd-c ai-c jc-c g-4 p-8 h-56", className)}>
      {label && <span className="c-slate-10 fs-sm fw-500">{label}</span>}

      <Scored score={score}>
        <Row
          className={`d-f ${icons ? "g-3" : "g-1"}`}
          readOnly={readOnly}
          label={`${value} out of ${max} stars`}
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
                      animated && !disabled
                        ? (props) => (
                            <motion.button
                              type="button"
                              {...(props as HTMLMotionProps<"button">)}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                              <Pop on={active}>{option.icon}</Pop>
                            </motion.button>
                          )
                        : undefined
                    }
                  >
                    {animated && !disabled ? undefined : option.icon}
                  </Toggle>
                );
              })
            : Array.from({ length: max }, (_, index) => index + 1).map(
                (star) => {
                  const filled = star <= value;
                  const mark = (
                    <Star
                      className={`fs-0 w-6 h-6 ${filled ? "f-current" : ""}`}
                      fill="none"
                    />
                  );
                  const icon = animated ? <Pop on={filled}>{mark}</Pop> : mark;

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
                        animated && !disabled
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
                      {animated && !disabled ? undefined : icon}
                    </Toggle>
                  );
                },
              )}
        </Row>
      </Scored>

      <span className="c-slate-6 fs-xs">
        {hint ??
          (icons
            ? value >= 0
              ? icons[value].label
              : emptyHint
            : value > 0
              ? `${value} / ${max}`
              : emptyHint)}
      </span>

      {children}
    </div>
  );
}

/**
 * The pop a mark makes when it fills.
 *
 * `animated` used to mean `whileTap` alone, which lasts exactly as long as the
 * pointer is held down: click a star and it is over before the star has
 * finished filling. Keyed on the state, so remounting is what replays it -
 * a keyframe array would be a fresh target on every render and could retrigger
 * on its own.
 */
function Pop({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.span
      key={on ? "on" : "off"}
      className="d-f"
      initial={{ scale: on ? 0.8 : 1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

/** The marks, with a figure alongside them when there is one. */
function Scored({
  score,
  children,
}: {
  score?: ReactNode;
  children: ReactNode;
}) {
  if (score === undefined || score === null) return <>{children}</>;

  return (
    <div className="d-f ai-c g-3">
      <span className="c-slate-10 fs-xxl fw-500">{score}</span>
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
