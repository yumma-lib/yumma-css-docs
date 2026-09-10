"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { Check, Circle, KeyCommand, NavArrowRight } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconPosition = "leading" | "trailing";

const TRIGGER_SHAPES: Record<Shape, string> = {
  rounded: "br-xxl cs-s",
  square: "",
  squircle: "br-xxl cs-s",
};

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br-xxl",
  square: "",
  squircle: "br-3xl cs-s",
};

const ITEM_SHAPES: Record<Shape, string> = {
  rounded: "br-xl",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

export interface ContextMenuAction {
  type?: "item";
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ContextMenuSeparator {
  type: "separator";
}

export interface ContextMenuGroup {
  type: "group";
  label?: string;
  items: ContextMenuItem[];
}

export interface ContextMenuCheckbox {
  type: "checkbox";
  label: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export interface ContextMenuRadio {
  type: "radio";
  value: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
}

export interface ContextMenuSubmenu {
  type: "submenu";
  label: string;
  items: ContextMenuItem[];
}

export type ContextMenuItem =
  | ContextMenuAction
  | ContextMenuSeparator
  | ContextMenuGroup
  | ContextMenuCheckbox
  | ContextMenuRadio
  | ContextMenuSubmenu;

export interface ContextMenuProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  trigger: ReactNode;
  items: ContextMenuItem[];
  shape?: Shape;
  shadow?: Shadow;
  iconPosition?: IconPosition;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  animated?: boolean;
  className?: string;
}

export default function ContextMenuBase({
  trigger,
  items,
  shape = "rounded",
  shadow = "none",
  iconPosition = "leading",
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  animated = true,
  className,
  container,
}: ContextMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  const handleOpenChange = (next: boolean) => {
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  const shadowClass =
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "";

  // No shadow here. `shadow` describes the menu that opens, and lifting the
  // dashed area you right-click made the page look like the area was the
  // floating thing.
  const triggerClasses = merge(
    "d-f ai-c jc-c h-48 w-60 bg-white bs-d bw-1 fs-sm fw-500 us-none",
    TRIGGER_SHAPES[shape],
    // The same disabled surface the other controls use, rather than a fade.
    disabled
      ? "bg-silver-1 bc-silver-2 c-slate-4 c-na"
      : "bc-slate-3 c-slate-10",
    className,
  );

  const popupClasses = [
    "py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1",
    POPUP_SHAPES[shape],
    shadowClass,
  ]
    .filter(Boolean)
    .join(" ");

  const itemClasses =
    (destructive: boolean, spread: boolean) =>
    (state: { highlighted: boolean }) =>
      [
        "d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm fw-500 us-none c-p mx-1",
        spread ? "jc-sb" : "",
        ITEM_SHAPES[shape],
        destructive ? "c-red" : "",
        state.highlighted
          ? destructive
            ? "bg-red-1/50"
            : "bg-silver-2/50"
          : "bg-transparent",
      ]
        .filter(Boolean)
        .join(" ");

  const renderItems = (list: ContextMenuItem[], keyPrefix: string) =>
    list.map((item, index) => {
      const key = `${keyPrefix}-${index}`;

      if ("type" in item && item.type === "separator") {
        return (
          <ContextMenu.Separator
            key={key}
            className="my-1 w-100% h-px bg-silver-2"
          />
        );
      }

      if ("type" in item && item.type === "group") {
        return (
          <ContextMenu.Group key={key}>
            {item.label && (
              <div className="px-3 py-1 fs-xs fw-600 c-slate-5 us-none">
                {item.label}
              </div>
            )}
            {renderItems(item.items, key)}
          </ContextMenu.Group>
        );
      }

      if ("type" in item && item.type === "checkbox") {
        return (
          <ContextMenu.CheckboxItem
            key={key}
            checked={item.checked}
            onCheckedChange={item.onCheckedChange}
            disabled={item.disabled}
            className={itemClasses(false, false)}
          >
            <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
              <ContextMenu.CheckboxItemIndicator>
                <Check className="w-3 h-3 c-indigo" />
              </ContextMenu.CheckboxItemIndicator>
            </span>
            {item.label}
          </ContextMenu.CheckboxItem>
        );
      }

      if ("type" in item && item.type === "radio") {
        return (
          <ContextMenu.RadioGroup
            key={key}
            value={item.value}
            onValueChange={item.onValueChange}
          >
            {item.options.map((option) => (
              <ContextMenu.RadioItem
                key={option.value}
                value={option.value}
                className={itemClasses(false, false)}
              >
                <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-9999 bw-1">
                  <ContextMenu.RadioItemIndicator>
                    <Circle className="w-2 h-2 c-indigo f-current" />
                  </ContextMenu.RadioItemIndicator>
                </span>
                {option.label}
              </ContextMenu.RadioItem>
            ))}
          </ContextMenu.RadioGroup>
        );
      }

      if ("type" in item && item.type === "submenu") {
        return (
          <ContextMenu.SubmenuRoot key={key}>
            <ContextMenu.SubmenuTrigger className={itemClasses(false, true)}>
              <span className="fg-1">{item.label}</span>
              <NavArrowRight className="fs-0 w-4 h-4 c-slate-4" />
            </ContextMenu.SubmenuTrigger>

            <ContextMenu.Portal container={container}>
              <ContextMenu.Positioner
                className="ow-0"
                sideOffset={-4}
                alignOffset={-4}
              >
                <ContextMenu.Popup className={popupClasses}>
                  {renderItems(item.items, key)}
                </ContextMenu.Popup>
              </ContextMenu.Positioner>
            </ContextMenu.Portal>
          </ContextMenu.SubmenuRoot>
        );
      }

      const action = item as ContextMenuAction;
      const destructive = Boolean(action.destructive);

      const trailing =
        Boolean(action.shortcut) ||
        (Boolean(action.icon) && iconPosition === "trailing");

      return (
        <ContextMenu.Item
          key={key}
          disabled={action.disabled}
          onClick={action.onClick}
          className={itemClasses(destructive, trailing)}
        >
          {action.icon && iconPosition === "leading" && (
            <span className="d-f fs-0 c-slate-5">{action.icon}</span>
          )}
          {trailing ? (
            <span className="fg-1">{action.label}</span>
          ) : (
            action.label
          )}
          {action.icon && iconPosition === "trailing" && (
            <span className="d-f fs-0 c-slate-5">{action.icon}</span>
          )}
          {action.shortcut && (
            <span
              className={[
                "d-f ai-c g-1 ml-4 fw-400 fs-xs",
                destructive ? "c-red" : "c-slate-6",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <KeyCommand className="w-3 h-3" />
              <span>{action.shortcut}</span>
            </span>
          )}
        </ContextMenu.Item>
      );
    });

  const popup = (
    <ContextMenu.Portal container={container} keepMounted>
      <ContextMenu.Positioner className="ow-0">
        <ContextMenu.Popup
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
          {renderItems(items, "item")}
        </ContextMenu.Popup>
      </ContextMenu.Positioner>
    </ContextMenu.Portal>
  );

  return (
    <ContextMenu.Root
      open={open}
      onOpenChange={handleOpenChange}
      disabled={disabled}
    >
      <ContextMenu.Trigger className={triggerClasses}>
        {trigger}
      </ContextMenu.Trigger>

      {animated ? (
        <AnimatePresence>{open && popup}</AnimatePresence>
      ) : (
        open && popup
      )}
    </ContextMenu.Root>
  );
}
