"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

export interface PreviewCardProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  shape?: Shape;
  shadow?: Shadow;
  animated?: boolean;
  className?: string;
}

export default function PreviewCardBase({
  trigger,
  children,
  defaultOpen,
  open,
  onOpenChange,
  shape = "rounded",
  shadow = "none",
  animated = true,
  className,
  container,
}: PreviewCardProps) {
  const popupClasses = [
    "d-f fd-c g-3 w-64 p-3 bg-white bc-silver-2 bw-1 c-slate-10 fs-sm",
    SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <PreviewCard.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <PreviewCard.Trigger
        className={(state) =>
          merge(
            "c-indigo c-p fw-500 td-none h:td-u fv:td-u",
            state.open ? "td-u" : "",
            className,
          )
        }
      >
        {trigger}
      </PreviewCard.Trigger>

      <PreviewCard.Portal container={container}>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup
            render={
              animated ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              ) : undefined
            }
            className={popupClasses}
          >
            {children}
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
