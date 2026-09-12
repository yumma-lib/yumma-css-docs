"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Xmark } from "iconoir-react";
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

/** Base UI waits on `getAnimations()`, which never sees Motion. See NOTES.md. */
const DIALOG_MOTION = `
  .yui-dialog-pop {
    transition: opacity 200ms ease-out, scale 200ms ease-out;
  }
  .yui-dialog-pop[data-starting-style],
  .yui-dialog-pop[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
  .yui-dialog-fade {
    transition: opacity 200ms ease-out;
  }
  .yui-dialog-fade[data-starting-style],
  .yui-dialog-fade[data-ending-style] {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-dialog-pop,
    .yui-dialog-fade { transition: none; }
  }
`;

const CLOSE_SHAPES: Record<Shape, string> = {
  rounded: "br-9999",
  square: "",
  squircle: "br-lg cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const BUTTON_BASE =
  "bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:os-s fv:ow-3 fv:oo-0";

const NEUTRAL_BUTTON =
  "bg-white bc-silver-2 c-slate-10 h:bg-silver-1/50 fv:oc-silver-3/60 fv:bc-silver-5";

const PRIMARY_BUTTON =
  "bg-slate-12 h:bg-slate-11 bc-slate-12 c-white fv:oc-silver-3/60 fv:bc-silver-5";

const TRIGGER_TONES: Record<TriggerTone, string> = {
  neutral: NEUTRAL_BUTTON,
  danger: "bg-red h:bg-red-8 bc-red-7 c-white fv:oc-red-2/60 fv:bc-red-3",
};

const CONFIRM_TONES: Record<ConfirmTone, string> = {
  primary: PRIMARY_BUTTON,
  danger: "bg-red h:bg-red-8 bc-red-7 c-white fv:oc-red-2/60 fv:bc-red-3",
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
  animated?: boolean;
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
  shape = "square",
  shadow = "none",
  animated = true,
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
        className={`p-f i-0 min-h-dvh bg-black/5 bf-b-xs ${
          animated ? "yui-dialog-fade" : ""
        }`}
      />
      <Dialog.Viewport className="d-f p-f i-0 ai-c jc-c">
        <Dialog.Popup
          className={`${popupClasses} ${animated ? "yui-dialog-pop" : ""}`}
          style={{ maxWidth: "90vw" }}
        >
          {showClose && (
            <Dialog.Close
              render={
                <Button
                  className={`d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 ${CLOSE_SHAPES[shape]} h:bg-silver-1/50 h:c-slate-7 fv:os-s fv:ow-3 fv:oo-0 fv:oc-silver-3/60 fv:bc-silver-5`}
                />
              }
              aria-label="Close"
            >
              <Xmark aria-hidden className="w-5 h-5" />
            </Dialog.Close>
          )}

          {header && (
            <div className="d-f fd-c ai-c jc-c g-3 px-4 pt-5 bg-white">
              {header}
            </div>
          )}

          {/* One padded column with a gap, the way Alert Dialog does it. Title,
              description and children each carried their own `py-` before, so
              the space between them was two paddings stacked and the space
              above the title was a single `py-2` - which is what put it
              against the top edge when there is no header. */}
          <div
            className={`d-f fd-c g-3 px-4 pb-6 bg-white ${
              header ? "pt-5" : "pt-10"
            }`}
          >
            <Dialog.Title className="c-slate-10 fs-md fw-500 ta-c">
              {title}
            </Dialog.Title>

            {description && (
              <Dialog.Description className="m-0 c-slate-7 fs-sm lh-4 ta-c">
                {description}
              </Dialog.Description>
            )}

            {children}
          </div>

          {confirmLabel && (
            <div className="d-g gtc-2 g-3 px-4 pb-4 bg-white">
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
      </Dialog.Viewport>
    </Dialog.Portal>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <style href="yumma-ui-dialog-motion" precedence="default">
        {DIALOG_MOTION}
      </style>
      <Dialog.Trigger
        onClick={onTriggerClick}
        render={<Button className={triggerClasses} />}
      >
        {triggerIcon && triggerIconPosition === "leading" && triggerIcon}
        {trigger}
        {triggerIcon && triggerIconPosition === "trailing" && triggerIcon}
      </Dialog.Trigger>

      {popup}
    </Dialog.Root>
  );
}
