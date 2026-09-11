"use client";

import { Tabs } from "@base-ui/react/tabs";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Orientation = "horizontal" | "vertical";
type Size = "sm" | "md" | "lg";
type Shape = "pill" | "rounded" | "square" | "squircle";
type IconPosition = "leading" | "trailing";

const SIZES: Record<Size, { tab: string; text: string }> = {
  sm: { tab: "py-1 px-2", text: "fs-xs" },
  md: { tab: "py-2 px-3", text: "fs-sm" },
  lg: { tab: "py-3 px-4", text: "fs-md" },
};

const LIST_SHAPES: Record<Shape, string> = {
  pill: "br-9999",
  rounded: "br-lg",
  square: "",
  squircle: "br-3xl cs-s",
};

const TAB_SHAPES: Record<Shape, string> = {
  pill: "br-9999",
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  iconOnly?: boolean;
  count?: string | number;
  disabled?: boolean;
  panel?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: Orientation;
  size?: Size;
  shape?: Shape;
  iconPosition?: IconPosition;
  animated?: boolean;
  className?: string;
}

export default function TabsBase({
  items,
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = "horizontal",
  size = "md",
  shape = "pill",
  iconPosition = "leading",
  animated = true,
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? controlledValue ?? items[0]?.value,
  );
  const value = controlledValue ?? internalValue;

  const handleValueChange = (next: string) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const spec = SIZES[size];
  const isVertical = orientation === "vertical";
  const hasPanels = items.some((item) => item.panel !== undefined);

  const rootClasses = merge(isVertical ? "d-f ai-s g-4" : "w-fc", className);

  // `br-9999` on a column resolves against its width, so the track becomes a
  // capsule and square-cornered tabs escape the curve. The tabs keep their
  // shape; only the track steps down.
  const listShape = isVertical && shape === "pill" ? "rounded" : shape;

  const listClasses = merge(
    "d-f p-r g-1 p-1 w-fc bg-silver-1 bw-1 bc-silver-2",
    LIST_SHAPES[listShape],
    isVertical && "fd-c",
    hasPanels && !isVertical && "mb-6",
  );

  const indicatorClasses = merge(
    "p-a l-0 t-0 zi-0 bg-white",
    TAB_SHAPES[shape],
    animated && "tp-a tdu-200 ttf-io",
  );

  return (
    <Tabs.Root
      value={value}
      onValueChange={handleValueChange}
      orientation={orientation}
      className={rootClasses}
    >
      <Tabs.List className={listClasses}>
        {items.map((item) => {
          const isSelected = value === item.value;

          const tabClasses = [
            "p-r zi-10 fg-1 d-f ai-c jc-c bg-transparent us-none fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3",
            item.icon && !item.iconOnly ? "g-2" : "",
            item.count !== undefined ? "g-2" : "",
            spec.tab,
            TAB_SHAPES[shape],
            item.disabled
              ? "c-slate-5 o-60 c-na"
              : isSelected
                ? "c-slate-10"
                : "c-slate-8 h:c-slate-10",
          ]
            .filter(Boolean)
            .join(" ");

          const labelClasses = ["p-r zi-10 fw-500", spec.text]
            .filter(Boolean)
            .join(" ");

          return (
            <Tabs.Tab
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={tabClasses}
              aria-label={item.iconOnly ? item.label : undefined}
            >
              {item.icon && iconPosition === "leading" && (
                <span className="d-f p-r zi-10">{item.icon}</span>
              )}
              {!item.iconOnly && (
                <span className={labelClasses}>{item.label}</span>
              )}
              {item.icon && iconPosition === "trailing" && (
                <span className="d-f p-r zi-10">{item.icon}</span>
              )}
              {item.count !== undefined && (
                <span className="d-f p-r zi-10 ai-c jc-c h-5 px-2 br-9999 fs-xs fw-500 bg-silver-8 c-white">
                  {item.count}
                </span>
              )}
            </Tabs.Tab>
          );
        })}

        {}
        <Tabs.Indicator
          className={indicatorClasses}
          style={{
            translate: "var(--active-tab-left) var(--active-tab-top)",
            width: "var(--active-tab-width)",
            height: "var(--active-tab-height)",
          }}
        />
      </Tabs.List>

      {hasPanels &&
        items.map((item) => (
          <Tabs.Panel key={item.value} value={item.value}>
            {item.panel}
          </Tabs.Panel>
        ))}
    </Tabs.Root>
  );
}
