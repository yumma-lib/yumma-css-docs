import { Meter } from "@base-ui/react/meter";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Color = "yellow" | "indigo" | "red" | "green";
type Shadow = "none" | "inset" | "outset";

const COLORS: Record<Color, string> = {
  yellow: "bg-yellow",
  indigo: "bg-indigo-5",
  red: "bg-red",
  green: "bg-green",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

export interface MeterProps {
  value: number;
  min?: number;
  max?: number;
  label: ReactNode;
  description?: string;
  icon?: ReactNode;
  color?: Color;
  shadow?: Shadow;
  animated?: boolean;
  className?: string;
}

export default function MeterBase({
  value,
  min,
  max,
  label,
  description,
  icon,
  color = "yellow",
  shadow = "none",
  animated = true,
  className,
}: MeterProps) {
  const isCard = shadow !== "none";
  const hasHeader = Boolean(icon);

  const rootClasses = merge(
    "d-f fd-c w-64",
    hasHeader ? "g-3" : "g-2",
    isCard ? "p-4 bg-white bc-silver-2 br-lg bw-1" : "",
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
    className,
  );

  const indicatorClasses = [
    "d-b h-100% br-9999",
    COLORS[color],
    animated ? "tp-w tdu-500 ttf-io" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Meter.Root className={rootClasses} value={value} min={min} max={max}>
      {hasHeader ? (
        <div className="d-f ai-c g-3">
          <span className="d-f ai-c jc-c fs-0 w-8 h-8 bg-indigo-1 c-indigo br-lg">
            {icon}
          </span>
          <div className="d-f fd-c">
            <Meter.Label className="c-slate-10 fs-sm fw-500">
              {label}
            </Meter.Label>
            {description && (
              <span className="c-slate-5 fs-xs">{description}</span>
            )}
          </div>
        </div>
      ) : (
        <div className="d-f jc-sb ai-c">
          <Meter.Label className="c-slate-10 fs-sm fw-500">{label}</Meter.Label>
          <Meter.Value className="c-slate-8 fs-sm" />
        </div>
      )}

      <Meter.Track className="o-h h-2 bg-silver-2 br-9999">
        <Meter.Indicator className={indicatorClasses} />
      </Meter.Track>

      {hasHeader && <Meter.Value className="d-f jc-fe c-slate-5 fs-xs" />}
    </Meter.Root>
  );
}
