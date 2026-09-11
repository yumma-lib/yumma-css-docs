"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Lock, Minus, NavArrowDown, Plus } from "iconoir-react";
import { type HTMLMotionProps, motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Variant = "default" | "bordered" | "ghost" | "subtle";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type Icon = "chevron" | "plus-minus";
type IconPosition = "leading" | "trailing";

export interface AccordionItem {
  value: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

const SHAPES: Record<Shape, { item: string; trigger: string }> = {
  rounded: { item: "br-lg", trigger: "br-sm" },
  square: { item: "", trigger: "" },
  squircle: { item: "br-xxl cs-s", trigger: "br-xxl cs-s" },
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

export interface AccordionProps {
  items: AccordionItem[];
  variant?: Variant;
  shape?: Shape;
  shadow?: Shadow;
  separator?: boolean;
  icon?: Icon;
  iconPosition?: IconPosition;
  multiple?: boolean;
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  animated?: boolean;
  className?: string;
}

export default function AccordionBase({
  items,
  variant = "default",
  shape = "rounded",
  shadow = "none",
  separator = true,
  icon = "chevron",
  iconPosition = "trailing",
  multiple = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  animated = true,
  className,
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string[]>(
    defaultValue ?? controlledValue ?? [],
  );
  const value = controlledValue ?? internalValue;

  const handleValueChange = (next: string[]) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  // `default` is one surface, so its shadow goes on the root. `bordered` and
  // `subtle` are a gap-separated stack, where a root shadow would be drawn
  // around the gaps: those get it per item instead. `ghost` has no surface to
  // lift at all. Gated to `default` alone, the prop did nothing in three
  // variants out of four.
  const isCard = variant === "default" && shadow !== "none";
  const itemShadow =
    shadow !== "none" && (variant === "bordered" || variant === "subtle")
      ? SHADOWS[shadow]
      : "";

  const rootClasses = merge(
    "d-f fd-c w-100% max-w-96",
    variant === "bordered" || variant === "subtle" ? "g-2" : "",
    isCard
      ? ["bg-white br-lg bw-1 bc-silver-2", SHADOWS[shadow]]
          .filter(Boolean)
          .join(" ")
      : "",
    className,
  );

  return (
    <Accordion.Root
      className={rootClasses}
      value={value}
      onValueChange={handleValueChange}
      multiple={multiple}
    >
      {items.map((item, index) => {
        const isOpen = value.includes(item.value);
        const isLast = index === items.length - 1;

        const itemClasses =
          variant === "bordered"
            ? ["bg-white bc-silver-3 bw-1", SHAPES[shape].item, itemShadow]
                .filter(Boolean)
                .join(" ")
            : variant === "ghost"
              ? [
                  "blw-2 pl-4",
                  isOpen ? "blc-indigo-5" : "blc-silver-3",
                  isLast ? "" : "mb-3",
                ]
                  .filter(Boolean)
                  .join(" ")
              : variant === "subtle"
                ? [
                    "br-lg",
                    isOpen ? "bg-indigo-1" : "bg-silver-1 h:bg-silver-2",
                    itemShadow,
                  ]
                    .filter(Boolean)
                    .join(" ")
                : separator && !isLast
                  ? "bbw-1 bc-silver-3"
                  : "";

        const triggerRadius =
          variant === "bordered" ? SHAPES[shape].trigger : "br-sm";
        // `subtle` is a tinted surface like `bordered`, so its copy needs the
        // same gutter. Without it the text sat on the fill's left edge.
        const inset = variant === "bordered" || variant === "subtle" || isCard;
        const triggerPadX = inset ? "px-4" : "px-0";
        const triggerPadY =
          variant === "ghost"
            ? "py-2"
            : variant === "default" && !separator
              ? "py-3"
              : "py-4";
        const panelPadX = inset ? "px-4" : "";

        const titleColor = item.disabled
          ? "c-slate-4"
          : variant === "ghost"
            ? isOpen
              ? "c-indigo-6"
              : "c-slate-8"
            : variant === "subtle"
              ? isOpen
                ? "c-indigo-7"
                : "c-slate-8"
              : "c-slate-8";
        const contentColor =
          variant === "subtle" && isOpen ? "c-indigo-9" : "c-slate-6";
        const panelClasses = ["m-0 pb-4", panelPadX, "fs-sm lh-4", contentColor]
          .filter(Boolean)
          .join(" ");
        const glyphColor = item.disabled
          ? "c-slate-4"
          : variant === "ghost"
            ? isOpen
              ? "c-indigo-5"
              : "c-slate-6"
            : variant === "subtle" && isOpen
              ? "c-indigo-5"
              : "c-slate-6";

        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={itemClasses}
          >
            <Accordion.Header className="m-0">
              <Accordion.Trigger
                className={[
                  "d-f ai-c",
                  iconPosition === "trailing" ? "jc-sb" : "",
                  "g-3 w-100%",
                  triggerPadY,
                  triggerPadX,
                  "bg-transparent bw-0",
                  triggerRadius,
                  "ta-l",
                  item.disabled ? "c-na o-60" : "c-p",
                  "fv:oo-1 fv:oc-indigo-5",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {icon === "plus-minus" && iconPosition === "leading" && (
                  <PlusMinusGlyph
                    isOpen={isOpen}
                    animated={animated}
                    className={glyphColor}
                  />
                )}
                <div className="d-f ai-c g-3">
                  <span
                    className={["fs-sm fw-500", titleColor]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {item.title}
                  </span>
                  {item.disabled && (
                    <Lock className="w-3 h-3 c-slate-4" aria-hidden />
                  )}
                </div>
                {icon === "chevron" ? (
                  <ChevronGlyph
                    isOpen={isOpen}
                    animated={animated}
                    className={glyphColor}
                  />
                ) : (
                  iconPosition === "trailing" && (
                    <PlusMinusGlyph
                      isOpen={isOpen}
                      animated={animated}
                      className={glyphColor}
                    />
                  )
                )}
              </Accordion.Trigger>
            </Accordion.Header>
            {animated ? (
              <Accordion.Panel
                keepMounted
                render={(props) => (
                  <motion.div
                    {...(props as HTMLMotionProps<"div">)}
                    initial={false}
                    animate={
                      isOpen
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="d-b o-h"
                  />
                )}
              >
                <p className={panelClasses}>{item.content}</p>
              </Accordion.Panel>
            ) : (
              // keepMounted either way, so `animated` changes the transition
              // and not the height of the whole accordion.
              <Accordion.Panel keepMounted>
                <p className={panelClasses}>{item.content}</p>
              </Accordion.Panel>
            )}
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

function ChevronGlyph({
  isOpen,
  animated,
  className,
}: {
  isOpen: boolean;
  animated: boolean;
  className: string;
}) {
  if (!animated) {
    return (
      <NavArrowDown
        className={merge("fs-0 w-4 h-4", isOpen ? "ro-36" : "ro-0", className)}
        aria-hidden
      />
    );
  }

  return (
    <motion.span
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="d-f"
    >
      <NavArrowDown className={merge("fs-0 w-4 h-4", className)} aria-hidden />
    </motion.span>
  );
}

function PlusMinusGlyph({
  isOpen,
  animated,
  className,
}: {
  isOpen: boolean;
  animated: boolean;
  className: string;
}) {
  const glyphClasses = merge("fs-0 w-4 h-4", className);
  const icon = isOpen ? (
    <Minus className={glyphClasses} aria-hidden />
  ) : (
    <Plus className={glyphClasses} aria-hidden />
  );

  if (!animated) {
    return icon;
  }

  return (
    <motion.span
      initial={false}
      animate={{ rotate: isOpen ? 90 : 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="d-f"
    >
      {icon}
    </motion.span>
  );
}
