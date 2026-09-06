import { Children, type ReactNode } from "react";
import { merge } from "yummacss/merge";
import Separator from "./separator";

type Shape = "rounded" | "square" | "squircle" | "pill";

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "br-0",
  squircle: "br-xxl cs-s",
  pill: "p-1 br-9999",
};

const BASE = "d-f ai-c o-h w-fc bg-white bc-silver-2 bw-1";

export interface ButtonGroupProps {
  className?: string;
  children: ReactNode;
  shape?: Shape;
  /** Rules between the buttons. */
  separated?: boolean;
  /** Buttons share the width instead of sizing to their label. */
  stretch?: boolean;
}

export default function ButtonGroup({
  className,
  children,
  shape = "rounded",
  separated = true,
  stretch = false,
}: ButtonGroupProps) {
  const items = Children.toArray(children);

  return (
    <div className={merge(BASE, SHAPES[shape], stretch && "w-100%", className)}>
      {items.map((child, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: position is the identity here
        <div key={index} className={stretch ? "d-f fg-1" : "d-f"}>
          {index > 0 && separated && (
            <Separator
              orientation="vertical"
              className={shape === "pill" ? "mx-1 my-1" : undefined}
            />
          )}
          {child}
        </div>
      ))}
    </div>
  );
}
