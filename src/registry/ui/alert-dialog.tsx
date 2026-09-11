"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { Xmark } from "iconoir-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Tone = "danger" | "neutral";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconPosition = "leading" | "trailing";

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br-xxl",
  square: "",
  squircle: "br-3xl cs-s",
};

const BADGE_SHAPES: Record<Shape, string> = {
  rounded: "br-9999",
  square: "",
  squircle: "br-xxl cs-s",
};

const BUTTON_SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

/** Base UI waits on `getAnimations()`, which never sees Motion. See NOTES.md. */
const ALERT_MOTION = `
  .yui-alert-pop {
    transition: opacity 200ms ease-out, scale 200ms ease-out;
  }
  .yui-alert-pop[data-starting-style],
  .yui-alert-pop[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
  .yui-alert-fade {
    transition: opacity 200ms ease-out;
  }
  .yui-alert-fade[data-starting-style],
  .yui-alert-fade[data-ending-style] {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-alert-pop,
    .yui-alert-fade { transition: none; }
  }
`;

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const TONE_BUTTON: Record<Tone, string> = {
  danger: "bg-red h:bg-red-8 bc-red-7 c-white fv:oc-red-2/60 fv:bc-red-3",
  neutral:
    "bg-white bc-silver-2 c-slate-10 h:bg-silver-1/50 fv:oc-indigo-2/60 fv:bc-indigo-3",
};

const TONE_BADGE: Record<Tone, string> = {
  danger: "bg-red-1/50 c-red",
  neutral: "bg-silver-2 c-slate-7",
};

export interface AlertDialogProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  trigger: ReactNode;
  triggerIcon?: ReactNode;
  triggerIconPosition?: IconPosition;
  triggerTone?: Tone;
  icon?: ReactNode;
  tone?: Tone;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel: string;
  onConfirm?: () => void;
  showClose?: boolean;
  shape?: Shape;
  shadow?: Shadow;
  animated?: boolean;
  className?: string;
}

export default function AlertDialogBase({
  trigger,
  triggerIcon,
  triggerIconPosition = "leading",
  triggerTone = "danger",
  icon,
  tone = "danger",
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel,
  onConfirm,
  showClose = true,
  shape = "square",
  shadow = "none",
  animated = true,
  className,
  container,
}: AlertDialogProps) {
  const [open, setOpen] = useState(false);

  const base =
    "px-3 py-2 bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:os-s fv:ow-3 fv:oo-0";

  const triggerClasses = merge(
    "d-if ai-c g-2",
    base,
    BUTTON_SHAPES[shape],
    TONE_BUTTON[triggerTone],
    className,
  );

  const popupClasses = [
    "o-h p-r w-96 bg-white bc-silver-2 c-slate-10 bw-1",
    POPUP_SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const badgeClasses = [
    "d-f ai-c jc-c w-12 h-12",
    TONE_BADGE[tone],
    BADGE_SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  const cancelClasses = [
    "px-4 py-2 bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3",
    BUTTON_SHAPES[shape],
    TONE_BUTTON.neutral,
  ]
    .filter(Boolean)
    .join(" ");

  const confirmClasses = [
    "px-4 py-2 bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3",
    BUTTON_SHAPES[shape],
    TONE_BUTTON[tone],
  ]
    .filter(Boolean)
    .join(" ");

  const popup = (
    <AlertDialog.Portal container={container} keepMounted>
      <AlertDialog.Backdrop
        className={`p-f i-0 min-h-dvh bg-black/5 bf-b-xs ${
          animated ? "yui-alert-fade" : ""
        }`}
      />
      <AlertDialog.Viewport className="d-f p-f i-0 ai-c jc-c">
        <AlertDialog.Popup
          className={`${popupClasses} ${animated ? "yui-alert-pop" : ""}`}
          style={{ maxWidth: "90vw" }}
        >
          {showClose && (
            <AlertDialog.Close
              render={
                <Button className="d-f p-a r-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-9999 h:bg-silver-1/50 h:c-slate-7 fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3" />
              }
              aria-label="Close"
            >
              <Xmark aria-hidden className="w-5 h-5" />
            </AlertDialog.Close>
          )}

          <div className="d-f fd-c ai-c g-3 pt-10 pb-6 px-4 bg-white">
            {icon && <span className={badgeClasses}>{icon}</span>}
            <AlertDialog.Title className="c-slate-10 fs-md fw-500">
              {title}
            </AlertDialog.Title>
            <AlertDialog.Description className="m-0 c-slate-6 fs-sm lh-4 ta-c">
              {description}
            </AlertDialog.Description>
          </div>

          <div className="d-f jc-c g-3 px-4 pb-4 bg-white">
            <AlertDialog.Close render={<Button className={cancelClasses} />}>
              {cancelLabel}
            </AlertDialog.Close>
            <AlertDialog.Close
              render={<Button className={confirmClasses} />}
              onClick={onConfirm}
            >
              {confirmLabel}
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Viewport>
    </AlertDialog.Portal>
  );

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <style href="yumma-ui-alert-dialog-motion" precedence="default">
        {ALERT_MOTION}
      </style>
      <AlertDialog.Trigger render={<Button className={triggerClasses} />}>
        {triggerIcon && triggerIconPosition === "leading" && triggerIcon}
        {trigger}
        {triggerIcon && triggerIconPosition === "trailing" && triggerIcon}
      </AlertDialog.Trigger>

      {popup}
    </AlertDialog.Root>
  );
}
