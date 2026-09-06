"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconPosition = "leading" | "trailing";
type TriggerTone = "neutral" | "danger";
type TriggerSize = "sm" | "md";
type ConfirmTone = "primary" | "danger";

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br-xxl",
  square: "",
  squircle: "br-3xl cs-s",
};

const BUTTON_SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

const BUTTON_BASE = "bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2";

const NEUTRAL_BUTTON =
  "bg-white bc-silver-2 c-slate-10 h:bg-silver-1/50 fv:oc-indigo-5";

const PRIMARY_BUTTON =
  "bg-indigo h:bg-indigo-8 bc-indigo-7 c-white fv:oc-indigo-5";

const TRIGGER_TONES: Record<TriggerTone, string> = {
  neutral: NEUTRAL_BUTTON,
  danger: "bg-red h:bg-red-8 bc-red-7 c-white fv:oc-red-6",
};

const CONFIRM_TONES: Record<ConfirmTone, string> = {
  primary: PRIMARY_BUTTON,
  danger: "bg-red h:bg-red-8 bc-red-7 c-white fv:oc-red-6",
};

const TRIGGER_SIZES: Record<TriggerSize, string> = {
  sm: "px-2 py-1 fs-xs",
  md: "px-3 py-2",
};

export interface DialogProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  trigger: ReactNode;
  triggerIcon?: ReactNode;
  triggerIconPosition?: IconPosition;
  triggerTone?: TriggerTone;
  triggerSize?: TriggerSize;
  onTriggerClick?: () => void;
  header?: ReactNode;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  confirmTone?: ConfirmTone;
  showClose?: boolean;
  shape?: Shape;
  shadow?: Shadow;
  animate?: boolean;
  className?: string;
}

export default function DialogBase({
  trigger,
  triggerIcon,
  triggerIconPosition = "leading",
  triggerTone = "neutral",
  triggerSize = "md",
  onTriggerClick,
  header,
  title,
  description,
  children,
  cancelLabel = "Cancel",
  confirmLabel,
  onConfirm,
  confirmTone = "primary",
  showClose = true,
  shape = "rounded",
  shadow = "none",
  animate = true,
  className,
  container,
}: DialogProps) {
  const [open, setOpen] = useState(false);

  const triggerClasses = merge(
    "d-if ai-c g-2",
    BUTTON_BASE,
    TRIGGER_SIZES[triggerSize],
    BUTTON_SHAPES[shape],
    TRIGGER_TONES[triggerTone],
    className,
  );

  const popupClasses = [
    "o-h p-r w-96 bg-white bc-silver-2 c-slate-10 bw-1",
    POPUP_SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const cancelClasses = [
    BUTTON_BASE,
    TRIGGER_SIZES.md,
    BUTTON_SHAPES[shape],
    NEUTRAL_BUTTON,
  ]
    .filter(Boolean)
    .join(" ");

  const confirmClasses = [
    BUTTON_BASE,
    TRIGGER_SIZES.md,
    BUTTON_SHAPES[shape],
    CONFIRM_TONES[confirmTone],
  ]
    .filter(Boolean)
    .join(" ");

  const popup = (
    <Dialog.Portal container={container} keepMounted>
      <Dialog.Backdrop
        render={
          animate ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          ) : undefined
        }
        className="p-f i-0 min-h-dvh bg-black/5 bf-b-xs"
      />
      <div className="d-f p-f i-0 ai-c jc-c">
        <Dialog.Popup
          render={
            animate ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            ) : undefined
          }
          className={popupClasses}
          style={{ maxWidth: "90vw" }}
        >
          {showClose && (
            <Dialog.Close
              render={
                <Button className="d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-9999 h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5" />
              }
              aria-label="Close"
            >
              <Xmark aria-hidden className="w-5 h-5" />
            </Dialog.Close>
          )}

          {header && (
            <div className="d-f fd-c ai-c jc-c g-3 px-4 py-5 bg-white">
              {header}
            </div>
          )}

          <div className="px-4 py-2 bg-white">
            <Dialog.Title className="c-slate-10 fs-md fw-500 ta-c">
              {title}
            </Dialog.Title>
          </div>

          {description && (
            <div className="px-4 py-3 bg-white">
              <Dialog.Description className="c-slate-7 fs-sm lh-4 ta-c">
                {description}
              </Dialog.Description>
            </div>
          )}

          {children && <div className="px-4 py-3 bg-white">{children}</div>}

          {confirmLabel && (
            <div className="d-g gtc-2 g-3 px-4 py-4 bg-white">
              <Dialog.Close render={<Button className={cancelClasses} />}>
                {cancelLabel}
              </Dialog.Close>
              <Dialog.Close
                render={<Button className={confirmClasses} />}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Dialog.Close>
            </div>
          )}
        </Dialog.Popup>
      </div>
    </Dialog.Portal>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        onClick={onTriggerClick}
        render={<Button className={triggerClasses} />}
      >
        {triggerIcon && triggerIconPosition === "leading" && triggerIcon}
        {trigger}
        {triggerIcon && triggerIconPosition === "trailing" && triggerIcon}
      </Dialog.Trigger>

      {animate ? (
        <AnimatePresence>{open && popup}</AnimatePresence>
      ) : (
        open && popup
      )}
    </Dialog.Root>
  );
}
