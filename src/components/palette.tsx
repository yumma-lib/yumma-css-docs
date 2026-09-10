"use client";

import { Tooltip } from "@base-ui/react";
import { useState } from "react";
import tinycolor from "tinycolor2";
import { generateShades, getBorderColor, SHADE_LABELS } from "@/utils/colors";

interface ColorItem {
  name: string;
  color: string;
}

interface Props {
  data: ColorItem[];
  scale?: string[];
  whitePercentage?: number;
  blackPercentage?: number;
}

export default function Palette({
  data,
  scale = SHADE_LABELS,
  whitePercentage = 14,
  blackPercentage = 14,
}: Props) {
  return (
    <div className="d-f fd-c g-1">
      <div className="d-none @lg:d-f fd-c g-1 @md:fd-r @md:ai-c">
        <div className="d-f ai-c ws-nw ta-c @md:w-24 @md:min-w-24 @md:mr-2" />
        <div
          className="d-g g-1 f-1 my-2 w-100%"
          style={{
            gridTemplateColumns: `repeat(${scale.length}, minmax(0, 1fr))`,
          }}
        >
          {scale.map((label) => (
            <div
              key={`header-${label}`}
              className="d-f ai-c jc-c c-white fs-sm"
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {data.map((colorItem) => {
        const shades = generateShades(
          colorItem.color,
          whitePercentage,
          blackPercentage,
        );
        return (
          <div
            key={colorItem.name}
            className="d-f fd-c g-1 ai-c @md:ai-c @md:fd-r"
          >
            <p className="d-f ai-c c-white ws-nw o-h fs-sm @md:w-24 @md:min-w-24 @md:mr-2">
              {colorItem.name}
            </p>
            <div
              className="d-g g-1 f-1 w-100%"
              style={{
                gridTemplateColumns: `repeat(${scale.length}, minmax(0, 1fr))`,
              }}
            >
              {shades.map((shade, index) => (
                <ColorSwatch
                  key={`${colorItem.name}-${scale[index]}`}
                  name={colorItem.name}
                  shade={shade}
                  label={scale[index]}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ColorSwatch({
  name,
  shade,
  label,
}: {
  name: string;
  shade: string;
  label: string;
}) {
  const [showCopied, setShowCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleClick = async () => {
    const hex = tinycolor(shade).toHexString().toUpperCase();
    await navigator.clipboard.writeText(hex);

    setShowCopied(true);
    setTooltipOpen(true);
    setTimeout(() => {
      setShowCopied(false);
      setTooltipOpen(false);
    }, 1500);
  };

  const handleMouseEnter = () => {
    setTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    if (!showCopied) {
      setTooltipOpen(false);
    }
  };

  return (
    <Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <Tooltip.Trigger
        className="p-r w-100% ar-1/1 c-p os-none"
        style={{
          backgroundColor: shade,
          border: getBorderColor(shade),
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={`${name} ${label}: ${shade}`}
      />
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={10}>
          <Tooltip.Popup
            className="d-f p-r fd-c px-2 py-1 bc-border bg-surface c-white bw-1 fs-xs"
            style={{
              transformOrigin: "bottom center",
              transition: !showCopied
                ? "transform 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
              opacity: tooltipOpen ? 1 : 0,
              transform: tooltipOpen ? "scale(1)" : "scale(0.9)",
              pointerEvents: tooltipOpen ? "auto" : "none",
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 10 5"
              className="p-a b--2 l-50% ml--2 w-4 h-2 f-surface"
            >
              <path
                d="M0 0 L5 5 L10 0"
                className="f-surface"
                stroke="#232741"
                strokeWidth="1"
              />
            </svg>
            {showCopied ? "Copied!" : `${name} ${label}`}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
