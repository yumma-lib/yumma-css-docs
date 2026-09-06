"use client";

import { Chrome, Edge, Firefox, Safari } from "@ridemountainpig/svgl-react";
import { CheckCircle, Sparks, WarningTriangle } from "iconoir-react";
import { baselineFor } from "../utils/baseline";

const ICONS = {
  chrome: Chrome,
  edge: Edge,
  firefox: Firefox,
  safari: Safari,
} as const;

interface Props {
  path: string;
}

export default function Baseline({ path }: Props) {
  const baseline = baselineFor(path);
  if (!baseline) return null;

  const { level, label, description, browsers } = baseline;
  const statusColor =
    level === "high" ? "c-green" : level === "low" ? "c-green-5" : "c-yellow";
  const StatusIcon =
    level === "high" ? CheckCircle : level === "low" ? Sparks : WarningTriangle;

  return (
    <div className="mb-6 p-4 bc-border bg-surface bw-1">
      <div className="mb-4">
        <div className="d-f ai-c g-2 mb-2">
          <StatusIcon className={`${statusColor} w-5 h-5`} />
          <h3 className="c-white fs-lg fw-500">{label}</h3>
        </div>
        <p className="c-white/70">{description}</p>
      </div>

      <div className="d-g g-4 gtc-1 @sm:gtc-2 @md:gtc-4">
        {browsers.map((browser) => {
          const Icon = ICONS[browser.key as keyof typeof ICONS];
          return (
            <div key={browser.key} className="d-f ai-c g-2">
              <div
                className="d-f ai-c jc-c w-6 h-6"
                style={{
                  filter: !browser.supported ? "grayscale(1)" : "none",
                  opacity: !browser.supported ? 0.5 : 1,
                }}
              >
                <Icon className="w-100% h-100%" />
              </div>
              <div className="d-f fd-c">
                <span
                  className="c-white/80"
                  style={{ opacity: !browser.supported ? 0.5 : 1 }}
                >
                  {browser.name}
                </span>
                {browser.desktopOnly && (
                  <span className="c-white/50 fs-xs">Desktop only</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
