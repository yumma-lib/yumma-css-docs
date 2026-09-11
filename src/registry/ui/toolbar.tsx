"use client";

import { Button } from "@base-ui/react";
import { NumberField } from "@base-ui/react/number-field";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import { Minus, Plus } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const ROOT_SHAPES: Record<Shape, string> = {
  rounded: "br-xxl",
  square: "",
  squircle: "br-3xl cs-s",
};

const CONTROL_SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

export interface ToolbarButtonItem {
  type?: "button";
  label?: string;
  icon?: ReactNode;
  iconOnly?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ToolbarSeparatorItem {
  type: "separator";
}

export interface ToolbarToggleOption {
  value: string;
  label: string;
  icon: ReactNode;
}

export interface ToolbarTogglesItem {
  type: "toggles";
  options: ToolbarToggleOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  label?: string;
}

export interface ToolbarInputItem {
  type: "input";
  placeholder?: string;
  label: string;
}

export interface ToolbarLinkItem {
  type: "link";
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface ToolbarNumberItem {
  type: "number";
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
}

export type ToolbarItem =
  | ToolbarButtonItem
  | ToolbarSeparatorItem
  | ToolbarTogglesItem
  | ToolbarInputItem
  | ToolbarLinkItem
  | ToolbarNumberItem;

export interface ToolbarProps {
  items: ToolbarItem[];
  shape?: Shape;
  shadow?: Shadow;
  animated?: boolean;
  className?: string;
}

export default function ToolbarBase({
  items,
  shape = "square",
  shadow = "none",
  animated = true,
  className,
}: ToolbarProps) {
  const shadowClass =
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "";

  const rootClasses = merge(
    "d-f ai-c g-1 p-2 bg-white bc-silver-2 bw-1",
    ROOT_SHAPES[shape],
    shadowClass,
    className,
  );

  const control = CONTROL_SHAPES[shape];

  return (
    <Toolbar.Root className={rootClasses}>
      {items.map((item, index) => {
        const key = `item-${index}`;

        if ("type" in item && item.type === "separator") {
          return (
            <Toolbar.Separator
              key={key}
              className="w-px h-5 mx-1 bg-silver-2"
            />
          );
        }

        if ("type" in item && item.type === "toggles") {
          return (
            <ToolbarToggles
              key={key}
              item={item}
              control={control}
              animated={animated}
            />
          );
        }

        if ("type" in item && item.type === "input") {
          return (
            <Toolbar.Input
              key={key}
              className={[
                "h-9 w-40 pl-3 bg-transparent bw-0 fs-sm fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3",
                control,
              ]
                .filter(Boolean)
                .join(" ")}
              placeholder={item.placeholder}
              aria-label={item.label}
            />
          );
        }

        if ("type" in item && item.type === "number") {
          const stepClasses = [
            "d-f ai-c jc-c w-9 h-9 bg-transparent c-slate-7 bw-0 us-none c-p h:bg-silver-1 h:c-slate-10",
            control,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <NumberField.Root
              key={key}
              defaultValue={item.defaultValue}
              value={item.value}
              onValueChange={(value) =>
                item.onValueChange?.(value ?? item.min ?? 0)
              }
              min={item.min}
              max={item.max}
              aria-label={item.label}
            >
              <NumberField.Group className="d-f ai-c">
                <NumberField.Decrement
                  render={
                    animated
                      ? (props) => (
                          <motion.button
                            type="button"
                            {...(props as HTMLMotionProps<"button">)}
                            whileTap={{ scale: 0.92 }}
                            className={stepClasses}
                          />
                        )
                      : undefined
                  }
                  className={animated ? undefined : stepClasses}
                >
                  <Minus className="w-5 h-5" />
                </NumberField.Decrement>
                <Toolbar.Input
                  render={<NumberField.Input />}
                  className="w-16 bg-transparent c-slate-10 bw-0 ta-c fs-sm fw-500 fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3"
                />
                <NumberField.Increment
                  render={
                    animated
                      ? (props) => (
                          <motion.button
                            type="button"
                            {...(props as HTMLMotionProps<"button">)}
                            whileTap={{ scale: 0.92 }}
                            className={stepClasses}
                          />
                        )
                      : undefined
                  }
                  className={animated ? undefined : stepClasses}
                >
                  <Plus className="w-5 h-5" />
                </NumberField.Increment>
              </NumberField.Group>
            </NumberField.Root>
          );
        }

        if ("type" in item && item.type === "link") {
          return (
            <Toolbar.Link
              key={key}
              href={item.href}
              className={[
                "d-f ai-c g-1 h-9 px-3 c-slate-7 fs-sm fw-500 td-none h:c-slate-10 fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3",
                control,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.icon}
              {item.label}
            </Toolbar.Link>
          );
        }

        const button = item as ToolbarButtonItem;
        const buttonClasses = [
          // `ws-nw`: a toolbar is a row of controls, and a label that wraps
          // makes the whole bar two lines tall to fit one button.
          "d-f ai-c jc-c ws-nw bg-transparent c-slate-7 bw-0 us-none fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3",
          button.iconOnly ? "w-9 h-9" : "g-1 h-9 px-3 fs-sm fw-500",
          control,
          // Surface, not fade, matching the rest of the library.
          button.disabled
            ? "bg-silver-1 c-slate-4 c-na"
            : "c-p h:bg-silver-1 h:c-slate-10",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <Toolbar.Button
            key={key}
            disabled={button.disabled}
            onClick={button.onClick}
            aria-label={button.iconOnly ? button.label : undefined}
            render={
              animated && !button.disabled
                ? (props) => (
                    <motion.button
                      type="button"
                      {...(props as HTMLMotionProps<"button">)}
                      whileTap={{ scale: 0.92 }}
                      className={buttonClasses}
                    />
                  )
                : undefined
            }
            className={animated && !button.disabled ? undefined : buttonClasses}
          >
            {button.icon}
            {!button.iconOnly && button.label}
          </Toolbar.Button>
        );
      })}
    </Toolbar.Root>
  );
}

/**
 * The pop a toggle makes as it takes hold.
 *
 * `animated` meant `whileTap` alone, which lasts exactly as long as the pointer
 * is held down, so a click was over before you saw it. The plain buttons and
 * the stepper keep only `whileTap`, which is right for a momentary action -
 * there is no state for them to settle into. A toggle has one.
 */
function Pop({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.span
      key={on ? "on" : "off"}
      className="d-f"
      initial={{ scale: on ? 0.8 : 1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

function ToolbarToggles({
  item,
  control,
  animated,
}: {
  item: ToolbarTogglesItem;
  control: string;
  animated: boolean;
}) {
  const [internalValue, setInternalValue] = useState<string[]>(
    item.defaultValue ?? item.value ?? [],
  );
  const value = item.value ?? internalValue;

  const handleChange = (next: string[]) => {
    setInternalValue(next);
    item.onValueChange?.(next);
  };

  const toggleClasses = (pressed: boolean) =>
    [
      "d-f w-9 h-9 ai-c jc-c bw-0 us-none c-p fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3",
      control,
      pressed
        ? "bg-indigo-1 bc-indigo-2 c-indigo-7 bw-1"
        : "bg-transparent c-slate-7 h:bg-silver-1 h:c-slate-10",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <ToggleGroup
      className="d-f g-1"
      value={value}
      onValueChange={handleChange}
      aria-label={item.label}
    >
      {item.options.map((option) => (
        <Toggle
          key={option.value}
          value={option.value}
          aria-label={option.label}
          render={
            animated
              ? (props, state) => {
                  // The icon arrives as `children`, so it has to be lifted out
                  // to be wrapped rather than spread straight onto the button.
                  const { children, ...rest } =
                    props as HTMLMotionProps<"button">;
                  return (
                    <motion.button
                      type="button"
                      {...rest}
                      whileTap={{ scale: 0.92 }}
                      className={toggleClasses(state.pressed)}
                    >
                      <Pop on={state.pressed}>{children as ReactNode}</Pop>
                    </motion.button>
                  );
                }
              : (props, state) => (
                  <Button {...props} className={toggleClasses(state.pressed)} />
                )
          }
        >
          {option.icon}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
