import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle" | "circle";

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
  circle: "br-9999",
};

type Orientation = "horizontal" | "vertical";

export interface SeparatorProps {
  icon?: ReactNode;
  onIconClick?: () => void;
  label?: ReactNode;
  shape?: Shape;
  orientation?: Orientation;
  className?: string;
}

export default function SeparatorBase({
  icon,
  onIconClick,
  label,
  shape = "rounded",
  orientation = "horizontal",
  className,
}: SeparatorProps) {
  if (!icon && !label) {
    return (
      <Separator
        orientation={orientation}
        className={merge(
          orientation === "vertical" ? "w-px h-100%" : "h-px w-100%",
          "bg-silver-2",
          className,
        )}
      />
    );
  }

  const buttonClasses = [
    "d-if ai-c jc-c w-8 h-8 bg-white bc-silver-2 c-slate-10 bw-1 tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5",
    SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={merge("d-f ai-c g-2 w-100%", className)}>
      <Separator className="fg-1 h-px bg-silver-2" />
      {icon ? (
        <Button className={buttonClasses} onClick={onIconClick}>
          {icon}
        </Button>
      ) : (
        <span className="c-slate-6 fs-xs fw-500 tt-u ls-3">{label}</span>
      )}
      <Separator className="fg-1 h-px bg-silver-2" />
    </div>
  );
}
