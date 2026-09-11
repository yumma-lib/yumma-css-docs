"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { Check, Circle, KeyCommand, NavArrowRight } from "iconoir-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconPosition = "leading" | "trailing";

/** Base UI waits on `getAnimations()`, which never sees Motion. See NOTES.md. */
const MENUBAR_MOTION = `
  .yui-menubar-pop {
    transition: opacity 150ms ease-out;
  }
  .yui-menubar-pop[data-starting-style],
  .yui-menubar-pop[data-ending-style] {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-menubar-pop { transition: none; }
  }
`;

const BAR_SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
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

export interface MenubarAction {
  type?: "item";
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MenubarSeparator {
  type: "separator";
}

export interface MenubarGroup {
  type: "group";
  label?: string;
  items: MenubarItem[];
}

export interface MenubarCheckbox {
  type: "checkbox";
  label: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export interface MenubarRadio {
  type: "radio";
  value: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
}

export interface MenubarSubmenu {
  type: "submenu";
  label: string;
  icon?: ReactNode;
  items: MenubarItem[];
}

export type MenubarItem =
  | MenubarAction
  | MenubarSeparator
  | MenubarGroup
  | MenubarCheckbox
  | MenubarRadio
  | MenubarSubmenu;

export interface MenubarMenu {
  label: string;
  items: MenubarItem[];
  disabled?: boolean;
}

export interface MenubarProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  menus: MenubarMenu[];
  shape?: Shape;
  shadow?: Shadow;
  iconPosition?: IconPosition;
  animated?: boolean;
  className?: string;
}

export default function MenubarBase({
  menus,
  shape = "square",
  shadow = "none",
  iconPosition = "leading",
  animated = true,
  className,
  container,
}: MenubarProps) {
  const shadowClass =
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "";

  const barClasses = merge(
    "d-f g-1 p-1 bg-white bc-silver-2 bw-1",
    BAR_SHAPES[shape],
    shadowClass,
    className,
  );

  // `os-none`: Base UI focuses the popup when it opens, and the browser
  // paints its own dark `auto` ring on it. Nothing was tabbed to, and the
  // open menu is its own signal.
  const popupClasses = [
    "py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 os-none",
    POPUP_SHAPES[shape],
    shadowClass,
  ]
    .filter(Boolean)
    .join(" ");

  const triggerClasses = (disabled: boolean) => (state: { open: boolean }) =>
    [
      "h-8 px-3 fs-sm fw-500 us-none bw-0 bg-transparent",
      TRIGGER_SHAPES[shape],
      disabled ? "c-slate-4 o-60 c-na" : "c-slate-10 c-p h:bg-silver-1/50",
      !disabled && state.open ? "bg-silver-2/50" : "",
    ]
      .filter(Boolean)
      .join(" ");

  const itemClasses =
    (destructive: boolean, spread: boolean) =>
    (state: { highlighted: boolean }) =>
      [
        // Highlighting focuses the item, hover included, so the browser
        // drew its ring on every item the pointer crossed. The
        // highlight background is the signal.
        "d-f ai-c g-2 py-2 pl-2 pr-3 fs-sm us-none c-p mx-1 fw-500 os-none",
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

  const renderItems = (list: MenubarItem[], keyPrefix: string) =>
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

      const action = item as MenubarAction;
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

  return (
    <Menubar className={barClasses}>
      {menus.map((menu) => (
        <MenubarEntry
          key={menu.label}
          menu={menu}
          animated={animated}
          popupClasses={popupClasses}
          triggerClasses={triggerClasses}
          renderItems={renderItems}
          container={container}
        />
      ))}
    </Menubar>
  );
}

function MenubarEntry({
  menu,
  animated,
  popupClasses,
  triggerClasses,
  renderItems,
  container,
}: {
  menu: MenubarMenu;
  animated: boolean;
  popupClasses: string;
  triggerClasses: (disabled: boolean) => (state: { open: boolean }) => string;
  renderItems: (list: MenubarItem[], keyPrefix: string) => ReactNode;
  container?: HTMLElement | null;
}) {
  const [open, setOpen] = useState(false);
  const disabled = Boolean(menu.disabled);

  const popup = (
    <Menu.Portal container={container} keepMounted>
      <Menu.Positioner className="ow-0" sideOffset={8}>
        <Menu.Popup
          className={`${popupClasses} ${animated ? "yui-menubar-pop" : ""}`}
        >
          {renderItems(menu.items, menu.label)}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );

  return (
    <Menu.Root open={open} onOpenChange={setOpen} disabled={disabled}>
      <style href="yumma-ui-menubar-motion" precedence="default">
        {MENUBAR_MOTION}
      </style>
      <Menu.Trigger className={triggerClasses(disabled)}>
        {menu.label}
      </Menu.Trigger>

      {popup}
    </Menu.Root>
  );
}
