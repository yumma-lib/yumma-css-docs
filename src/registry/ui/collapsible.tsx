"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { Lock, Minus, NavArrowRight, Plus } from "iconoir-react";
import { type HTMLMotionProps, motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "square" | "squircle";
type Icon = "chevron" | "plus-minus";
type IconPosition = "leading" | "trailing";

const SHAPES: Record<Shape, string> = {
  square: "",
  squircle: "br-xxl cs-s",
};

export interface CollapsibleProps {
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  shape?: Shape;
  icon?: Icon;
  iconPosition?: IconPosition;
  animate?: boolean;
  className?: string;
}

export default function CollapsibleBase({
  trigger,
  children,
  defaultOpen,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  shape = "square",
  icon = "chevron",
  iconPosition = "trailing",
  animate = true,
  className,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(
    defaultOpen ?? controlledOpen ?? false,
  );
  const open = controlledOpen ?? internalOpen;

  const handleOpenChange = (next: boolean) => {
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  const rootClasses = merge(
    "d-f fd-c w-72 c-slate-10",
    disabled ? "o-60 c-na" : "",
    className,
  );

  const triggerClasses = [
    "d-f ai-c jc-sb g-3 w-100% py-3 px-3 bg-white bc-silver-3 bbw-1 ta-l",
    SHAPES[shape],
    disabled ? "" : "c-p fv:oo-1 fv:oc-indigo-5",
    !animate && !disabled ? "h:bg-silver-1/50" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const panelContentClasses = "d-f fd-c px-3 py-2 bg-white";

  const glyph = disabled ? (
    <Lock className="w-3 h-3 c-slate-5" />
  ) : icon === "chevron" ? (
    <ChevronGlyph open={open} animate={animate} />
  ) : (
    <PlusMinusGlyph open={open} animate={animate} />
  );

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={handleOpenChange}
      disabled={disabled}
      className={rootClasses}
    >
      <Collapsible.Trigger className={triggerClasses}>
        {iconPosition === "leading" && !disabled && glyph}
        <span className="c-slate-8 fs-sm fw-500">{trigger}</span>
        {(iconPosition === "trailing" || disabled) && glyph}
      </Collapsible.Trigger>

      {disabled ? (
        <Collapsible.Panel keepMounted className="d-b o-h h-auto">
          <div className={panelContentClasses}>{children}</div>
        </Collapsible.Panel>
      ) : animate ? (
        <Collapsible.Panel
          keepMounted
          render={(props) => (
            <motion.div
              {...(props as HTMLMotionProps<"div">)}
              initial={false}
              animate={
                open
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="d-b o-h"
            />
          )}
        >
          <div className={panelContentClasses}>{children}</div>
        </Collapsible.Panel>
      ) : (
        <Collapsible.Panel
          className={[
            "d-b o-h tp-a tdu-200 ttf-io",
            open ? "h-auto o-100" : "h-0 o-0",
          ].join(" ")}
        >
          <div className={panelContentClasses}>{children}</div>
        </Collapsible.Panel>
      )}
    </Collapsible.Root>
  );
}

function ChevronGlyph({ open, animate }: { open: boolean; animate: boolean }) {
  if (!animate) {
    return (
      <NavArrowRight
        className={[
          "w-4 h-4 c-slate-5 tp-t tdu-150 ttf-io",
          open ? "ro-18" : "ro-0",
        ]
          .filter(Boolean)
          .join(" ")}
      />
    );
  }

  return (
    <motion.span
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="d-f"
    >
      <NavArrowRight className="w-4 h-4 c-slate-5" />
    </motion.span>
  );
}

function PlusMinusGlyph({
  open,
  animate,
}: {
  open: boolean;
  animate: boolean;
}) {
  const icon = open ? (
    <Minus className="w-4 h-4 c-slate-5" aria-hidden />
  ) : (
    <Plus className="w-4 h-4 c-slate-5" aria-hidden />
  );

  if (!animate) {
    return icon;
  }

  return (
    <motion.span
      initial={false}
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="d-f"
    >
      {icon}
    </motion.span>
  );
}
