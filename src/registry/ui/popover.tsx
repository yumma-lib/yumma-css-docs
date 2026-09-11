"use client";

import { Popover } from "@base-ui/react/popover";
import { Xmark } from "iconoir-react";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Side = "top" | "right" | "bottom" | "left";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type TriggerVariant = "icon" | "label";

/**
 * Keyed on Base UI's own transition attributes.
 *
 * Base UI asks `getAnimations()` whether anything is running before it closes
 * the popup, and Motion's animation never appears there - measured zero. So it
 * hid the **positioner** in the first frame of the exit and Motion faded a
 * popup that was already inside a `display:none` parent. CSS transitions do
 * register, so Base UI waits for these.
 */
const POPOVER_MOTION = `
  .yui-popover-pop {
    transition: opacity 150ms ease-out, scale 150ms ease-out;
  }
  .yui-popover-pop[data-starting-style],
  .yui-popover-pop[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-popover-pop { transition: none; }
  }
`;

const TRIGGER_VARIANTS: Record<TriggerVariant, string> = {
  icon: "w-10 h-10",
  label: "px-3 py-2 g-2",
};

const TRIGGER_SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-3xl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
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

export interface PopoverProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  trigger: ReactNode;
  triggerLabel?: string;
  triggerVariant?: TriggerVariant;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  side?: Side;
  sideOffset?: number;
  arrow?: boolean;
  openOnHover?: boolean;
  delay?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showClose?: boolean;
  shape?: Shape;
  shadow?: Shadow;
  animated?: boolean;
  className?: string;
}

export default function PopoverBase({
  trigger,
  triggerLabel,
  triggerVariant = "icon",
  title,
  description,
  children,
  side = "bottom",
  sideOffset = 8,
  arrow = false,
  openOnHover = false,
  delay = 300,
  open: controlledOpen,
  onOpenChange,
  showClose = false,
  shape = "rounded",
  shadow = "none",
  animated = true,
  className,
  container,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const triggerClasses = merge(
    "d-f ai-c jc-c bw-1 bc-silver-2 bg-white c-slate-10 us-none c-p h:bg-silver-1 fv:oo-2 fv:oc-indigo-5",
    TRIGGER_VARIANTS[triggerVariant],
    TRIGGER_SHAPES[shape],
    open ? "bg-silver-1" : "",
    className,
  );

  const popupClasses = [
    "px-4 py-3 w-56 bg-white bc-silver-2 c-slate-10 bw-1",
    POPUP_SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
    arrow ? "p-r" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const body = (
    <>
      {arrow && (
        <Popover.Arrow
          className="d-f w-4 h-2"
          style={(state) => ARROW_PLACEMENT[state.side]}
        >
          <svg viewBox="0 0 10 5" width="16" height="8">
            <title>Arrow</title>
            {/* The popup's own surface: `bg-white bc-silver-2`. */}
            <path
              d="M0 5 L5 0 L10 5"
              strokeWidth="1"
              className="f-white s-silver-2"
            />
          </svg>
        </Popover.Arrow>
      )}

      <div className="d-f ai-s jc-sb g-3">
        <Popover.Title className="m-0 mb-1 c-slate-10 fs-sm fw-500">
          {title}
        </Popover.Title>
        {showClose && (
          <Popover.Close
            className="d-f fs-0 ai-c jc-c w-7 h-7 bg-transparent c-slate-5 bw-0 br-9999 c-p h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5"
            aria-label="Close"
          >
            <Xmark aria-hidden className="w-5 h-5" />
          </Popover.Close>
        )}
      </div>

      {description && (
        <Popover.Description className="m-0 c-slate-8 fs-xs">
          {description}
        </Popover.Description>
      )}

      {children}
    </>
  );

  const popup = (
    <Popover.Portal container={container} keepMounted>
      <Popover.Positioner side={side} sideOffset={sideOffset}>
        <Popover.Popup
          className={`${popupClasses} ${animated ? "yui-popover-pop" : ""}`}
        >
          {body}
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <style href="yumma-ui-popover-motion" precedence="default">
        {POPOVER_MOTION}
      </style>

      <Popover.Trigger
        className={triggerClasses}
        aria-label={triggerLabel}
        openOnHover={openOnHover}
        delay={openOnHover ? delay : undefined}
      >
        {trigger}
      </Popover.Trigger>

      {popup}
    </Popover.Root>
  );
}
