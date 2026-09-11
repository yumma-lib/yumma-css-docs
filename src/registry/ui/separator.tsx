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
  /** Does nothing while `icon` is set. */
  label?: ReactNode;
  /**
   * Corner radius on the icon button, which is the only thing here that has
   * corners: a rule is one pixel across, where a radius draws nothing. It was
   * called `shape`, and read as a promise the separator could not keep.
   */
  iconShape?: Shape;
  orientation?: Orientation;
  className?: string;
}

export default function SeparatorBase({
  icon,
  onIconClick,
  label,
  iconShape = "rounded",
  orientation = "horizontal",
  className,
}: SeparatorProps) {
  const vertical = orientation === "vertical";

  // A rule fills its container along its own axis. `as-s` covers the common
  // case - a vertical rule in a flex row, like a button group - where the row
  // has a height but has not declared one for its children to read.
  const rule = vertical ? "w-px h-100% as-s" : "h-px w-100%";

  if (!icon && !label) {
    return (
      <Separator
        orientation={orientation}
        className={merge(rule, "bg-silver-2", className)}
      />
    );
  }

  const buttonClasses = [
    "d-if ai-c jc-c w-8 h-8 bg-white bc-silver-2 c-slate-10 bw-1 tp-c tdu-150 ttf-io us-none c-p h:bg-silver-1/50 fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3",
    SHAPES[iconShape],
  ]
    .filter(Boolean)
    .join(" ");

  // The same rule either way round: the wrapper turns, and each half grows
  // along whichever axis that leaves. This branch used to hardcode a row and
  // `h-px`, so `orientation` reached the plain separator and nothing else.
  const half = `fg-1 bg-silver-2 ${vertical ? "w-px" : "h-px"}`;

  return (
    <div
      className={merge(
        `d-f ai-c g-2 ${vertical ? "fd-c h-100% as-s" : "w-100%"}`,
        className,
      )}
    >
      <Separator orientation={orientation} className={half} />
      {icon ? (
        <Button className={buttonClasses} onClick={onIconClick}>
          {icon}
        </Button>
      ) : (
        <span className="fs-0 c-slate-6 fs-xs fw-500 tt-u ls-3">{label}</span>
      )}
      <Separator orientation={orientation} className={half} />
    </div>
  );
}
