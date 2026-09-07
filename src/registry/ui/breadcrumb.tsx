import { NavArrowRight } from "iconoir-react";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type Size = "sm" | "md" | "lg";
type Separator = "chevron" | "slash";

const SIZES: Record<Size, string> = {
  sm: "fs-xs",
  md: "fs-sm",
  lg: "fs-md",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  iconOnly?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  bordered?: boolean;
  shape?: Shape;
  shadow?: Shadow;
  size?: Size;
  separator?: Separator;
  className?: string;
}

export default function BreadcrumbBase({
  items,
  bordered = false,
  shape = "rounded",
  shadow = "none",
  size = "md",
  separator = "chevron",
  className,
}: BreadcrumbProps) {
  const navClasses = merge(
    "d-f ai-c g-2",
    bordered ? "px-3 py-2 bg-white bc-silver-2 bw-1" : "",
    bordered ? SHAPES[shape] : "",
    bordered && shadow !== "none" ? SHADOWS[shadow] : "",
    className,
  );

  const labelClasses = [SIZES[size], "fw-400"].filter(Boolean).join(" ");
  const currentClasses = [SIZES[size], "fw-500 c-indigo"]
    .filter(Boolean)
    .join(" ");

  return (
    <nav aria-label="Breadcrumb" className={navClasses}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        const linkClasses = [
          item.icon ? "d-f ai-c g-2" : "",
          "c-slate-6 h:c-slate-10 fv:oo-2 fv:oc-indigo-5",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <span key={item.label} className="d-f ai-c g-2">
            {isLast ? (
              <span
                className={["d-f ai-c g-1", currentClasses].join(" ")}
                aria-current="page"
              >
                {item.label}
                {item.icon}
              </span>
            ) : (
              <a
                href={item.href ?? "#"}
                className={linkClasses}
                aria-label={item.iconOnly ? item.label : undefined}
              >
                {item.icon}
                {!item.iconOnly && (
                  <span className={labelClasses}>{item.label}</span>
                )}
              </a>
            )}
            {!isLast &&
              (separator === "chevron" ? (
                <NavArrowRight className="w-4 h-4 c-slate-4" />
              ) : (
                <span className="c-slate-4" aria-hidden="true">
                  /
                </span>
              ))}
          </span>
        );
      })}
    </nav>
  );
}
