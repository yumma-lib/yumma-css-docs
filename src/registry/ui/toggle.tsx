"use client";

import { Button } from "@base-ui/react/button";
import { Toggle } from "@base-ui/react/toggle";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Size = "sm" | "md";
type Tone = "accent" | "ghost";

const SHAPES: Record<Shape, string> = {
  rounded: "br-9999",
  square: "",
  squircle: "br-xxl cs-s",
};

const SIZES: Record<Size, string> = {
  sm: "w-9 h-9",
  md: "w-12 h-12",
};

const TONES: Record<Tone, { pressed: string; unpressed: string }> = {
  accent: {
    pressed: "bg-indigo bc-indigo-6 c-white",
    unpressed: "bg-white bc-indigo-3 c-indigo h:bg-indigo-1",
  },
  ghost: {
    pressed: "bg-indigo c-white",
    unpressed: "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10",
  },
};

export interface ToggleProps
  extends Omit<ComponentProps<"button">, "className" | "value">,
    Pick<ComponentProps<typeof Toggle>, "value"> {
  icon?: ReactNode;

  pressedIcon?: ReactNode;
  defaultPressed?: boolean;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  shape?: Shape;
  size?: Size;
  tone?: Tone;

  swatchClassName?: string;

  animate?: boolean;
  className?: string;
}

export default function ToggleBase({
  icon,
  pressedIcon,
  defaultPressed,
  pressed: controlledPressed,
  onPressedChange,
  shape = "rounded",
  size = "md",
  tone = "accent",
  swatchClassName,
  animate = true,
  className,
  value,
  ...props
}: ToggleProps) {
  const grouped = value !== undefined;
  const [internalPressed, setInternalPressed] = useState(
    defaultPressed ?? false,
  );
  const pressed = controlledPressed ?? internalPressed;

  const handlePressedChange = (next: boolean) => {
    setInternalPressed(next);
    onPressedChange?.(next);
  };

  const pressedProps = grouped
    ? {}
    : { pressed, onPressedChange: handlePressedChange, defaultPressed };

  return (
    <Toggle
      value={value}
      {...pressedProps}
      className={(state) =>
        merge(
          "d-f ai-c jc-c us-none c-p fv:oo-2 fv:oc-indigo-5",
          SIZES[size],
          SHAPES[shape],
          swatchClassName
            ? "bw-0"
            : `bw-1 ${state.pressed ? TONES[tone].pressed : TONES[tone].unpressed}`,
          swatchClassName,
          className,
        )
      }
      render={(renderProps, state) =>
        animate ? (
          <motion.button
            type="button"
            {...(renderProps as HTMLMotionProps<"button">)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {state.pressed ? pressedIcon : icon}
          </motion.button>
        ) : (
          <Button {...(renderProps as ComponentProps<"button">)}>
            {state.pressed ? pressedIcon : icon}
          </Button>
        )
      }
      {...props}
    />
  );
}
