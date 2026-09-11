"use client";

import { Menu } from "@base-ui/react/menu";
import { Check, Circle, KeyCommand, NavArrowRight } from "iconoir-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconPosition = "leading" | "trailing";

interface SizeSpec {
  trigger: string;
  popup: string;
  item: string;
  text: string;
}

/**
 * Keyed on Base UI's own transition attributes.
 *
 * Base UI asks `getAnimations()` whether anything is running before it closes,
 * and Motion's animation never appears there - measured zero. So it hid the
 * positioner in the first frame of the exit and Motion faded a popup that was
 * already inside a `display:none` parent. CSS transitions do register.
 */
const MENU_MOTION = `
  .yui-menu-pop {
    transition: opacity 150ms ease-out;
  }
  .yui-menu-pop[data-starting-style],
  .yui-menu-pop[data-ending-style] {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-menu-pop { transition: none; }
  }
`;

const SIZES: Record<Size, SizeSpec> = {
  sm: { trigger: "px-2 py-1", popup: "w-44", item: "py-1 px-2", text: "fs-xs" },
  md: {
    trigger: "px-3 py-2",
    popup: "w-52",
    item: "py-2 pl-2 pr-3",
    text: "fs-sm",
  },
  lg: { trigger: "px-4 py-3", popup: "w-60", item: "py-3 px-4", text: "fs-md" },
};

const TRIGGER_SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
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

export interface MenuAction {
  type?: "item";
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MenuSeparator {
  type: "separator";
}

export interface MenuGroup {
  type: "group";
  label?: string;
  items: MenuItem[];
}

export interface MenuCheckbox {
  type: "checkbox";
  label: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export interface MenuRadio {
  type: "radio";
  value: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
}

export interface MenuSubmenu {
  type: "submenu";
  label: string;
  icon?: ReactNode;
  items: MenuItem[];
}

export type MenuItem =
  | MenuAction
  | MenuSeparator
  | MenuGroup
  | MenuCheckbox
  | MenuRadio
  | MenuSubmenu;

export interface MenuProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  trigger: ReactNode;
  items: MenuItem[];
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  iconPosition?: IconPosition;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  animated?: boolean;
  className?: string;
}

export default function MenuBase({
  trigger,
  items,
  size = "md",
  shape = "rounded",
  shadow = "none",
  iconPosition = "leading",
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  animated = true,
  className,
  container,
}: MenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  const handleOpenChange = (next: boolean) => {
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  const spec = SIZES[size];
  const shadowClass =
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "";

  const triggerClasses = merge(
    "d-f ai-c g-2 h-fc bg-white bc-silver-2 bw-1 fw-500 us-none",
    spec.trigger,
    TRIGGER_SHAPES[shape],
    shadowClass,
    animated ? "tp-c tdu-150 ttf-io" : "",
    disabled
      ? "c-slate-4 o-60 c-na"
      : "c-slate-10 c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5",
    className,
  );

  // `os-none`: Base UI focuses the popup when it opens, and the browser
  // paints its own dark `auto` ring on it. Nothing was tabbed to, and the
  // open menu is its own signal.
  const popupClasses = [
    "py-1 bg-white bc-silver-2 c-slate-10 bw-1 os-none",
    spec.popup,
    POPUP_SHAPES[shape],
    shadowClass,
  ]
    .filter(Boolean)
    .join(" ");

  const itemClasses =
    (destructive: boolean, spread: boolean) =>
    (state: { highlighted: boolean }) =>
      [
        // Highlighting focuses the item, hover included, so the browser
        // drew its ring on every item the pointer crossed. The highlight
        // background is the signal.
        "d-f ai-c g-2 us-none c-p mx-1 fw-500 os-none",
        spec.item,
        spec.text,
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

  const renderItems = (list: MenuItem[], keyPrefix: string) =>
    list.map((item, index) => {
      const key = `${keyPrefix}-${index}`;

      if ("type" in item && item.type === "separator") {
        return (
          <Menu.Separator key={key} className="my-1 w-100% h-px bg-silver-2" />
        );
      }

      if ("type" in item && item.type === "group") {
        return (
          <Menu.Group key={key}>
            {item.label && (
              <div className="px-3 py-1 fs-xs fw-600 c-slate-5 us-none">
                {item.label}
              </div>
            )}
            {renderItems(item.items, key)}
          </Menu.Group>
        );
      }

      if ("type" in item && item.type === "checkbox") {
        return (
          <Menu.CheckboxItem
            key={key}
            checked={item.checked}
            onCheckedChange={item.onCheckedChange}
            disabled={item.disabled}
            className={itemClasses(false, false)}
          >
            <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-sm bw-1">
              <Menu.CheckboxItemIndicator>
                <Check className="w-3 h-3 c-indigo" />
              </Menu.CheckboxItemIndicator>
            </span>
            {item.label}
          </Menu.CheckboxItem>
        );
      }

      if ("type" in item && item.type === "radio") {
        return (
          <Menu.RadioGroup
            key={key}
            value={item.value}
            onValueChange={item.onValueChange}
          >
            {item.options.map((option) => (
              <Menu.RadioItem
                key={option.value}
                value={option.value}
                className={itemClasses(false, false)}
              >
                <span className="d-f ai-c jc-c fs-0 w-4 h-4 bc-silver-3 br-9999 bw-1">
                  <Menu.RadioItemIndicator>
                    <Circle className="w-2 h-2 c-indigo f-current" />
                  </Menu.RadioItemIndicator>
                </span>
                {option.label}
              </Menu.RadioItem>
            ))}
          </Menu.RadioGroup>
        );
      }

      if ("type" in item && item.type === "submenu") {
        return (
          <Menu.SubmenuRoot key={key}>
            <Menu.SubmenuTrigger className={itemClasses(false, true)}>
              {item.icon && (
                <span className="d-f fs-0 c-slate-5">{item.icon}</span>
              )}
              <span className="fg-1">{item.label}</span>
              <NavArrowRight className="fs-0 w-4 h-4 c-slate-4" />
            </Menu.SubmenuTrigger>

            <Menu.Portal container={container}>
              <Menu.Positioner
                className="ow-0"
                sideOffset={-4}
                alignOffset={-4}
              >
                <Menu.Popup className={popupClasses}>
                  {renderItems(item.items, key)}
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.SubmenuRoot>
        );
      }

      const action = item as MenuAction;
      const destructive = Boolean(action.destructive);
      const trailing =
        Boolean(action.shortcut) ||
        (Boolean(action.icon) && iconPosition === "trailing");

      return (
        <Menu.Item
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
        </Menu.Item>
      );
    });

  const popup = (
    <Menu.Portal container={container} keepMounted>
      <Menu.Positioner className="ow-0" sideOffset={8}>
        <Menu.Popup
          className={`${popupClasses} ${animated ? "yui-menu-pop" : ""}`}
        >
          {renderItems(items, "item")}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );

  return (
    <Menu.Root open={open} onOpenChange={handleOpenChange} disabled={disabled}>
      <style href="yumma-ui-menu-motion" precedence="default">
        {MENU_MOTION}
      </style>
      <Menu.Trigger className={triggerClasses}>{trigger}</Menu.Trigger>

      {popup}
    </Menu.Root>
  );
}
