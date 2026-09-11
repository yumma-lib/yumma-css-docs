"use client";

import { ToggleGroup } from "@base-ui/react/toggle-group";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle" | "pill";
type Orientation = "horizontal" | "vertical";

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "br-0",
  squircle: "br-xxl cs-s",
  pill: "br-9999",
};

const BASE = "p-r d-f g-1 p-1 w-fc bg-white bc-silver-2 bw-1";

export interface ToggleGroupProps {
  className?: string;
  children: ReactNode;
  shape?: Shape;
  orientation?: Orientation;
  /** More than one toggle can be pressed at a time. */
  multiple?: boolean;
  disabled?: boolean;
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (value: string[]) => void;
}

export default function ToggleGroupBase({
  className,
  children,
  shape = "square",
  orientation = "horizontal",
  multiple = false,
  disabled = false,
  value,
  defaultValue,
  onValueChange,
}: ToggleGroupProps) {
  return (
    <ToggleGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      multiple={multiple}
      disabled={disabled}
      orientation={orientation}
      className={merge(
        BASE,
        SHAPES[shape],
        orientation === "vertical" && "fd-c",
        className,
      )}
    >
      {children}
    </ToggleGroup>
  );
}
