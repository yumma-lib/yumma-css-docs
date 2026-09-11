"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import type { CSSProperties, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Side = "top" | "right" | "bottom" | "left";
type Tone = "light" | "dark";
type TriggerTone = "neutral" | "danger";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

/**
 * Keyed on Base UI's own transition attributes.
 *
 * Base UI asks `getAnimations()` whether anything is running before it closes,
 * and Motion's animation never appears there - measured zero. So it hid the
 * positioner in the first frame of the exit and Motion faded a popup that was
 * already inside a `display:none` parent. CSS transitions do register.
 */
const TOOLTIP_MOTION = `
  .yui-tooltip-pop {
    transition: opacity 150ms ease-out, translate 150ms ease-out, scale 150ms ease-out;
  }
  .yui-tooltip-pop[data-starting-style],
  .yui-tooltip-pop[data-ending-style] {
    opacity: 0;
    translate: 0 4px;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-tooltip-pop { transition: none; }
  }
`;

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-3xl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const TONES: Record<Tone, string> = {
  light: "bg-white bc-silver-2 c-slate-10 bw-1",
  dark: "bg-indigo-7 c-white",
};

const TRIGGER_TONES: Record<TriggerTone, string> = {
  neutral: "c-slate-8 h:c-slate-10 fv:oc-indigo-5",
  danger: "c-red-7 h:c-red-8 fv:oc-red-6",
};

/** The arrow paints the popup's own surface, so it follows `tone` with it. */
const ARROW_TONES: Record<Tone, string> = {
  light: "f-white s-silver-2",
  dark: "f-indigo-7 s-indigo-7",
};

/**
 * Where the arrow sits, and which way it points.
 *
 * Base UI gives the arrow `position:absolute` and the offset *along* the
 * popup's edge; the offset *across* that edge, and the rotation, are the
 * consumer's - without them the arrow lands on top of the content, which is
 * what "completely out of place" was. The key is the side Base UI actually
 * placed the popup on, not the `side` asked for, because it flips on
 * collision; `style` takes a function of that state for exactly this.
 *
 * The box is 16x8. Rotating it a quarter turn leaves the box that shape but
 * draws it 8x16, so a vertical edge needs 8 + (16 - 8) / 2. Yumma has no
 * negative inset values, so this is a style object rather than classes.
 */
const ARROW_PLACEMENT: Record<string, CSSProperties> = {
  top: { bottom: -8, rotate: "180deg" },
  bottom: { top: -8 },
  left: { right: -12, rotate: "90deg" },
  right: { left: -12, rotate: "-90deg" },
  "inline-start": { right: -12, rotate: "90deg" },
  "inline-end": { left: -12, rotate: "-90deg" },
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
  animated?: boolean;
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
  animated = true,
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
    // The arrow is positioned against the popup, so the popup has to be what
    // `position:absolute` resolves against.
    arrow ? "p-r" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const arrowTone = ARROW_TONES[tone];

  const popup = (
    <Tooltip.Popup
      className={`${popupClasses} ${animated ? "yui-tooltip-pop" : ""}`}
    >
      {arrow && (
        <Tooltip.Arrow
          className="d-f w-4 h-2"
          style={(state) => ARROW_PLACEMENT[state.side]}
        >
          <svg viewBox="0 0 10 5" width="16" height="8">
            <title>Arrow</title>
            <path d="M0 5 L5 0 L10 5" strokeWidth="1" className={arrowTone} />
          </svg>
        </Tooltip.Arrow>
      )}
      {content}
    </Tooltip.Popup>
  );

  return (
    <Tooltip.Provider delay={delay}>
      <Tooltip.Root>
        <style href="yumma-ui-tooltip-motion" precedence="default">
          {TOOLTIP_MOTION}
        </style>
        <Tooltip.Trigger className={triggerClasses} aria-label={triggerLabel}>
          {trigger}
        </Tooltip.Trigger>
        <Tooltip.Portal container={container}>
          <Tooltip.Positioner side={side} sideOffset={sideOffset}>
            {popup}
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
