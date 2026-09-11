"use client";

import { motion } from "motion/react";
import { merge } from "yummacss/merge";

type Shape = "line" | "block" | "circle";
type Tone = "default" | "subtle";

const RADII: Record<Shape, string> = {
  line: "br-xs",
  block: "br-lg",
  circle: "br-9999",
};

const SIZES: Record<Shape, string> = {
  line: "h-3 w-100%",
  block: "h-8 w-24",
  circle: "w-10 h-10",
};

const TONES: Record<Tone, string> = {
  default: "bg-silver-2",
  subtle: "bg-silver-1",
};

export interface SkeletonProps {
  shape?: Shape;
  tone?: Tone;
  dimensions?: string;
  animated?: boolean;
  delay?: number;
  className?: string;
}

export default function SkeletonBase({
  shape = "line",
  tone = "default",
  dimensions,
  animated = true,
  delay = 0,
  className,
}: SkeletonProps) {
  const classes = merge(
    RADII[shape],
    dimensions ?? SIZES[shape],
    TONES[tone],
    className,
  );

  if (!animated) return <div aria-hidden className={classes} />;

  return (
    <motion.div
      aria-hidden
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
      className={classes}
    />
  );
}
