"use client";

import { Progress } from "@base-ui/react/progress";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const SHAPES: Record<Shape, string> = {
  rounded: "br-9999",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

export interface ProgressProps {
  value: number | null;
  label: ReactNode;
  shape?: Shape;
  shadow?: Shadow;
  animated?: boolean;
  className?: string;
}

export default function ProgressBase({
  value,
  label,
  shape = "rounded",
  shadow = "none",
  animated = true,
  className,
}: ProgressProps) {
  const isCard = shadow !== "none";
  const isIndeterminate = value === null;

  const rootClasses = merge(
    "d-f fd-c g-2 w-64",
    isCard ? "p-4 bg-white bc-silver-2 br-lg bw-1" : "",
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
    className,
  );

  const trackClasses = ["o-h h-2 bg-silver-2", SHAPES[shape]]
    .filter(Boolean)
    .join(" ");

  return (
    <Progress.Root className={rootClasses} value={value}>
      <div className="d-f jc-sb ai-c">
        <Progress.Label className="c-slate-10 fs-sm fw-500">
          {label}
        </Progress.Label>
        <Progress.Value className="c-slate-8 fs-sm" />
      </div>
      <Progress.Track className={trackClasses}>
        {isIndeterminate ? (
          <Progress.Indicator
            render={
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={["h-100% bg-indigo", SHAPES[shape]]
                  .filter(Boolean)
                  .join(" ")}
              />
            }
            className="h-100%"
          />
        ) : (
          <Progress.Indicator
            render={
              animated ? (
                <motion.div
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              ) : undefined
            }
            className={(state) =>
              [
                "h-100%",
                SHAPES[shape],
                state.status === "complete" ? "bg-green" : "bg-indigo",
              ]
                .filter(Boolean)
                .join(" ")
            }
          />
        )}
      </Progress.Track>
    </Progress.Root>
  );
}
