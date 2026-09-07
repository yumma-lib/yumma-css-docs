"use client";

import { Field } from "@base-ui/react/field";
import { Check, WarningTriangle } from "iconoir-react";
import type { ChangeEvent, ComponentProps } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type Status = "default" | "error" | "success";

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const STATUS_BORDER: Record<Status, string> = {
  default: "bc-silver-3",
  error: "bc-red-5",
  success: "bc-green-5",
};

const STATUS_RING: Record<Status, string> = {
  default: "fv:oc-indigo-5",
  error: "fv:oc-red-5",
  success: "fv:oc-green-5",
};

const STATUS_ICON: Record<Status, string> = {
  default: "",
  error: "c-red-5",
  success: "c-green-5",
};

const STATUS_MESSAGE: Record<Status, string> = {
  default: "c-slate-6",
  error: "c-red-5",
  success: "c-green-6",
};

const WARN_AT = 20;

export interface TextareaProps
  extends Omit<ComponentProps<"textarea">, "className" | "onChange"> {
  label?: string;

  required?: boolean;

  description?: string;

  error?: string;

  success?: string;

  maxLength?: number;
  shape?: Shape;
  shadow?: Shadow;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export default function TextareaBase({
  label,
  required = false,
  description,
  error,
  success,
  maxLength,
  shape = "rounded",
  shadow = "none",
  disabled,
  className,
  onChange,
  defaultValue,
  value: controlledValue,
  ...props
}: TextareaProps) {
  const [internalValue, setInternalValue] = useState(
    String(defaultValue ?? controlledValue ?? ""),
  );
  const value = String(controlledValue ?? internalValue);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(event.target.value);
    onChange?.(event);
  };

  const status: Status = error ? "error" : success ? "success" : "default";
  const message = error ?? success ?? description;

  const showCounter = maxLength !== undefined;
  const remaining = showCounter ? maxLength - value.length : 0;
  const percent = showCounter
    ? Math.min((value.length / maxLength) * 100, 100)
    : 0;
  const warn = showCounter && remaining <= WARN_AT;

  const controlClasses = merge(
    "h-24 w-64 pt-3 pl-3 bg-white c-slate-10 bw-1 fs-md r-none fv:oo--1",
    showCounter || status !== "default" ? "pr-10" : "pr-3",
    SHAPES[shape],
    SHADOWS[shadow],
    STATUS_BORDER[status],
    STATUS_RING[status],
    className,
  );

  return (
    <Field.Root
      disabled={disabled}
      className={`d-f fd-c g-2 ${disabled ? "o-60 c-na" : ""}`}
    >
      {label && (
        <Field.Label className="c-slate-10 fs-sm fw-500">
          {label}
          {required && <span className="c-red-5"> *</span>}
        </Field.Label>
      )}

      <div className="d-f p-r ai-s">
        {}
        <Field.Control
          render={<textarea />}
          value={value}
          maxLength={maxLength}
          required={required}
          className={controlClasses}
          {...(props as ComponentProps<typeof Field.Control>)}
          onChange={
            handleChange as unknown as ComponentProps<
              typeof Field.Control
            >["onChange"]
          }
        />
        {status !== "default" && (
          <span className={`d-f p-a r-3 t-3 ai-c jc-c ${STATUS_ICON[status]}`}>
            {status === "error" ? (
              <WarningTriangle className="w-4 h-4" />
            ) : (
              <Check className="w-4 h-4" />
            )}
          </span>
        )}
      </div>

      {message && (
        <p className={`m-0 fs-xs ${STATUS_MESSAGE[status]}`}>{message}</p>
      )}

      {showCounter && (
        <div className="d-f fd-c g-1">
          <div className="d-f jc-sb">
            <span className="c-slate-5 fs-xs">
              {remaining} characters remaining
            </span>
            <span className={`fs-xs fw-500 ${warn ? "c-red" : "c-slate-5"}`}>
              {value.length} / {maxLength}
            </span>
          </div>
          <div className="w-100% h-1 bg-silver-2 br-9999 o-h">
            <div
              className={`h-100% br-9999 ${warn ? "bg-red" : "bg-indigo"}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}
    </Field.Root>
  );
}
