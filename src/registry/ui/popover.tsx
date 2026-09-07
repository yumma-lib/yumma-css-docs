"use client";

import { Popover } from "@base-ui/react/popover";
import { Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Side = "top" | "right" | "bottom" | "left";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type TriggerVariant = "icon" | "label";

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
        <Popover.Arrow className="d-f w-4 h-2 c-silver-2">
          <svg viewBox="0 0 10 5" width="16" height="8">
            <title>Arrow</title>
            <path
              d="M0 5 L5 0 L10 5"
              fill="white"
              stroke="currentColor"
              strokeWidth="1"
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
            className="d-f ai-c jc-c w-5 h-5 bg-transparent c-slate-5 bw-0 br-lg c-p h:bg-silver-2 h:c-slate-8 fv:oo--1 fv:oc-indigo-5"
            aria-label="Close"
          >
            <Xmark aria-hidden className="w-4 h-4" />
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
          render={
            animated ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            ) : undefined
          }
          className={popupClasses}
        >
          {body}
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={triggerClasses}
        aria-label={triggerLabel}
        openOnHover={openOnHover}
        delay={openOnHover ? delay : undefined}
      >
        {trigger}
      </Popover.Trigger>

      {animated ? (
        <AnimatePresence>{open && popup}</AnimatePresence>
      ) : (
        open && popup
      )}
    </Popover.Root>
  );
}
