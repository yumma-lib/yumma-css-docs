"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Side = "top" | "right" | "bottom" | "left";
type Tone = "light" | "dark";
type TriggerTone = "neutral" | "danger";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-3xl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

const TONES: Record<Tone, string> = {
  light: "bg-white bc-silver-2 c-slate-10 bw-1",
  dark: "bg-indigo-7 c-white",
};

const TRIGGER_TONES: Record<TriggerTone, string> = {
  neutral: "c-slate-8 h:c-slate-10 fv:oc-indigo-5",
  danger: "c-red-7 h:c-red-8 fv:oc-red-6",
};

export interface TooltipProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  trigger: ReactNode;
  triggerLabel?: string;
  triggerTone?: TriggerTone;
  content: ReactNode;
  side?: Side;
  sideOffset?: number;
  tone?: Tone;
  arrow?: boolean;
  delay?: number;
  shape?: Shape;
  shadow?: Shadow;
  animate?: boolean;
  className?: string;
}

export default function TooltipBase({
  trigger,
  triggerLabel,
  triggerTone = "neutral",
  content,
  side = "top",
  sideOffset = 8,
  tone = "light",
  arrow = false,
  delay = 300,
  shape = "rounded",
  shadow = "none",
  animate = true,
  className,
  container,
}: TooltipProps) {
  const triggerClasses = merge(
    "d-f ai-c jc-c bg-transparent bw-0 c-p fv:oo-2",
    TRIGGER_TONES[triggerTone],
    className,
  );

  const popupClasses = [
    "px-3 py-2 fs-sm us-none",
    TONES[tone],
    SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const popup = (
    <Tooltip.Popup
      render={
        animate ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        ) : undefined
      }
      className={popupClasses}
    >
      {arrow && (
        <Tooltip.Arrow className="d-f w-4 h-2 c-silver-2">
          <svg viewBox="0 0 10 5" width="16" height="8">
            <title>Arrow</title>
            <path
              d="M0 5 L5 0 L10 5"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </Tooltip.Arrow>
      )}
      {content}
    </Tooltip.Popup>
  );

  return (
    <Tooltip.Provider delay={delay}>
      <Tooltip.Root>
        <Tooltip.Trigger className={triggerClasses} aria-label={triggerLabel}>
          {trigger}
        </Tooltip.Trigger>
        <Tooltip.Portal container={container}>
          <Tooltip.Positioner side={side} sideOffset={sideOffset}>
            {animate ? <AnimatePresence>{popup}</AnimatePresence> : popup}
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
