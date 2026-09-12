"use client";

import { CloudUpload, Xmark } from "iconoir-react";
import type { ChangeEvent, DragEvent, ReactNode } from "react";
import { useId, useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type Border = "dashed" | "solid";

const ZONE = "d-f fd-c ai-c g-3 m-0 p-0 w-100 min-w-0 bg-white";

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
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const UNITS = ["B", "KB", "MB", "GB"];

/** A size a person reads, not a byte count. */
function formatSize(bytes: number) {
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < UNITS.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size < 10 && unit > 0 ? size.toFixed(1) : Math.round(size)} ${UNITS[unit]}`;
}

export interface FileUploadProps {
  label?: string;
  hint?: string;
  description?: string;
  icon?: ReactNode;
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
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
  accept,
  multiple = false,
  onFilesChange,
  shape = "square",
  shadow = "none",
  border = "dashed",
  error,
  disabled = false,
  className,
}: FileUploadProps) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const message = error ?? description;

  const commit = (next: File[]) => {
    setFiles(next);
    onFilesChange?.(next);
  };

  const add = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    const picked = Array.from(incoming);
    commit(multiple ? [...files, ...picked] : picked.slice(0, 1));
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    add(event.target.files);
    // The same file twice in a row is not a change, so the picker would stay
    // silent the second time.
    event.target.value = "";
  };

  // `dragOver` has to preventDefault on every tick or the browser opens the
  // file instead of handing it over.
  const onDragOver = (event: DragEvent) => {
    if (disabled) return;
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (event: DragEvent) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null))
      return;
    setDragging(false);
  };

  const onDrop = (event: DragEvent) => {
    if (disabled) return;
    event.preventDefault();
    setDragging(false);
    add(event.dataTransfer.files);
  };

  const zone = merge(
    ZONE,
    SHAPES[shape],
    BORDERS[border],
    error ? "bc-red-5" : "bc-silver-2",
    // Surface, not fade: the zone fills, so the dashed edge stops reading as
    // an invitation to drop something on it. No border colour here - the line
    // above already sets one, and repeating it silently beat `bc-red-5` on a
    // zone that was both disabled and in error.
    disabled
      ? "bg-silver-1 c-slate-5 c-na"
      : dragging
        ? "bc-indigo bg-indigo-1/50"
        : "",
    className,
  );

  return (
    <fieldset
      aria-label={label}
      className={zone}
      onDragEnter={onDragOver}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        ref={input}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={onChange}
        className="d-none"
      />

      <div className="d-f fd-c ai-c g-2 p-8 ta-c">
        <div
          className={merge(
            "d-f ai-c jc-c w-10 h-10 bw-1",
            SHAPES[shape],
            SHADOWS[shadow],
            error ? "bg-red-1/50 bc-red-5" : "bg-white bc-silver-2",
          )}
        >
          {icon ?? (
            <CloudUpload
              className={`w-5 h-5 ${error ? "c-red-5" : "c-slate-6"}`}
            />
          )}
        </div>
        <div className="d-f fd-c ai-c g-1">
          <span className={`fs-sm fw-500 ${error ? "c-red-5" : "c-slate-10"}`}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => input.current?.click()}
              className={merge(
                "p-0 bg-transparent bw-0 fs-sm fw-500 c-p d:c-na fv:os-s fv:ow-3 fv:oo-1",
                error ? "c-red-5 fv:oc-red-2/60" : "c-indigo fv:oc-indigo-2/60",
              )}
            >
              {label}
            </button>{" "}
            or drag and drop
          </span>
          <span className={`fs-xs fw-400 ${error ? "c-red-5" : "c-slate-6"}`}>
            {hint}
          </span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="d-f fd-c g-1 w-100% px-6 pb-6">
          {files.map((file) => (
            <div
              key={`${file.name}:${file.lastModified}`}
              className={merge(
                "d-f ai-c jc-sb g-3 px-3 py-2 bg-silver-1/50 bc-silver-2 bw-1",
                SHAPES[shape],
              )}
            >
              <span className="o-h fs-xs c-slate-10 to-e ws-nw">
                {file.name}
              </span>
              <span className="d-f ai-c g-2 fs-xs c-slate-6">
                {formatSize(file.size)}
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  disabled={disabled}
                  onClick={() =>
                    commit(files.filter((entry) => entry !== file))
                  }
                  className={merge(
                    "d-f ai-c jc-c w-5 h-5 p-0 bg-transparent bw-0 c-slate-6 c-p h:c-slate-10 fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60",
                    SHAPES[shape],
                  )}
                >
                  <Xmark className="w-4 h-4" />
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      {message && (
        <p
          className={`w-100% m-0 pb-6 fs-xs ta-c ${error ? "c-red-5" : "c-slate-6"}`}
        >
          {message}
        </p>
      )}
    </fieldset>
  );
}
