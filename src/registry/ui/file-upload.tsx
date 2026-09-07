import { CloudUpload } from "iconoir-react";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type Border = "dashed" | "solid";

const ZONE = "d-f fd-c ai-c g-3 w-100 bg-white";

const SHAPES: Record<Shape, string> = {
  rounded: "br-xxl",
  square: "br-0",
  squircle: "br-3xl cs-s",
};

const BORDERS: Record<Border, string> = {
  dashed: "bw-2 bs-d",
  solid: "bw-1",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

export interface FileUploadProps {
  label?: string;
  hint?: string;
  description?: string;
  icon?: ReactNode;
  shape?: Shape;
  shadow?: Shadow;
  border?: Border;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export default function FileUploadBase({
  label = "Upload files",
  hint = "Drag and drop files here",
  description,
  icon,
  shape = "rounded",
  shadow = "none",
  border = "dashed",
  error,
  disabled = false,
  className,
}: FileUploadProps) {
  const message = error ?? description;

  const zone = merge(
    ZONE,
    SHAPES[shape],
    BORDERS[border],
    error ? "bc-red-5" : "bc-silver-2",
    // A half-opacity near-white on white is not a surface. Fill it.
    disabled ? "bg-silver-1 o-60 c-na" : "",
    className,
  );

  return (
    <section className={zone}>
      <div className="d-f fd-c ai-c g-2 p-8 ta-c">
        <div
          className={`d-f ai-c jc-c w-10 h-10 br-lg bw-1 ${SHADOWS[shadow]} ${
            error ? "bg-red-1/50 bc-red-5" : "bg-white bc-silver-2"
          }`}
        >
          {icon ?? (
            <CloudUpload
              className={`w-5 h-5 ${error ? "c-red-5" : "c-slate-6"}`}
            />
          )}
        </div>
        <div className="d-f fd-c ai-c g-1">
          <span className={`fs-sm fw-500 ${error ? "c-red-5" : "c-slate-10"}`}>
            <a className="c-indigo td-none c-p">{label}</a> or drag and drop
          </span>
          <span className={`fs-xs fw-400 ${error ? "c-red-5" : "c-slate-6"}`}>
            {hint}
          </span>
        </div>
      </div>

      {message && (
        <p
          className={`w-100% m-0 pb-6 fs-xs ta-c ${error ? "c-red-5" : "c-slate-6"}`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
