"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { ArrowSeparateVertical, Check } from "iconoir-react";
import { type ReactNode, useId, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconSide = "leading" | "trailing";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  avatar?: string;
}

export interface SelectGroup {
  group: string;
  items: SelectOption[];
}

const TRIGGER =
  "d-f ai-c jc-sb bw-1 bc-silver-3 bg-white c-slate-10 us-none c-p fv:oo--1 fv:oc-indigo-5";

const SIZES: Record<Size, string> = {
  sm: "h-8 w-56 px-3",
  md: "h-10 w-64 px-3",
  lg: "h-12 w-72 px-4",
};

/**
 * Keyed on Base UI's own transition attributes.
 *
 * Base UI asks `getAnimations()` whether anything is running before it closes,
 * and Motion's animation never appears there - measured zero. So it hid the
 * positioner in the first frame of the exit and Motion faded a popup that was
 * already inside a `display:none` parent. CSS transitions do register.
 */
const SELECT_MOTION = `
  .yui-select-pop {
    transition: opacity 150ms ease-out, scale 150ms ease-out;
  }
  .yui-select-pop[data-starting-style],
  .yui-select-pop[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-select-pop { transition: none; }
  }
`;

const POPUP_SIZES: Record<Size, string> = {
  sm: "w-56",
  md: "w-64",
  lg: "w-72",
};

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

function isGroupEntry(entry: SelectOption | SelectGroup): entry is SelectGroup {
  return "items" in entry;
}

function flattenOptions(
  options: SelectOption[] | SelectGroup[],
): SelectOption[] {
  return options.flatMap((entry) =>
    isGroupEntry(entry) ? entry.items : [entry],
  );
}

function renderOption(option: SelectOption) {
  return (
    <Select.Item
      key={option.value}
      value={option.value}
      className={(state) =>
        `d-f ai-c g-3 py-2 px-3 mx-1 br-md fs-sm fw-500 us-none c-p c-slate-10 ${
          state.highlighted ? "bg-silver-2/50" : "bg-transparent"
        }`
      }
    >
      <Select.ItemIndicator className="d-f ai-c">
        <Check className="w-4 h-4" />
      </Select.ItemIndicator>
      {option.avatar && (
        <Avatar.Root className="d-if o-h ai-c jc-c w-6 h-6 bc-white br-9999 bw-1 va-m us-none">
          <Avatar.Image
            src={option.avatar}
            alt=""
            className="of-c w-100% h-100%"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-xs">
            {option.label[0]}
          </Avatar.Fallback>
        </Avatar.Root>
      )}
      <div className="d-f fd-c">
        <Select.ItemText>{option.label}</Select.ItemText>
        {option.description && (
          <span className="c-slate-5 fs-xs">{option.description}</span>
        )}
      </div>
    </Select.Item>
  );
}

export interface SelectProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  options: SelectOption[] | SelectGroup[];
  label?: string;
  required?: boolean;
  description?: string;
  placeholder?: string;
  defaultValue?: string | null;
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  icon?: ReactNode;
  iconPosition?: IconSide;
  disabled?: boolean;
  animated?: boolean;
  className?: string;
}

export default function SelectBase({
  options,
  label,
  required = false,
  description,
  placeholder = "Select...",
  defaultValue = null,
  value,
  onValueChange,
  size = "md",
  shape = "rounded",
  shadow = "none",
  icon,
  iconPosition = "leading",
  disabled = false,
  animated = true,
  className,
  container,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const triggerClasses = merge(
    TRIGGER,
    SIZES[size],
    SHAPES[shape],
    SHADOWS[shadow],
    open ? "bg-silver-2/50" : "bg-transparent",
    className,
  );

  const iconEl = icon && (
    <span className="d-f ai-c c-slate-5" aria-hidden>
      {icon}
    </span>
  );

  const flatOptions = flattenOptions(options);

  const value_ = (
    <Select.Value>
      {(selected: string) => (
        <span className="min-w-0 o-h to-e ws-nw">
          {selected
            ? (flatOptions.find((o) => o.value === selected)?.label ?? selected)
            : placeholder}
        </span>
      )}
    </Select.Value>
  );

  const arrow = (
    <Select.Icon className="d-f c-slate-8">
      <ArrowSeparateVertical className="w-4 h-4" />
    </Select.Icon>
  );

  const popup = (
    <Select.Popup
      className={`o-h py-1 bg-white bc-silver-2 bw-1 ${POPUP_SIZES[size]} ${SHAPES[shape]} ${animated ? "yui-select-pop" : ""}`}
    >
      <Select.List className="p-r o-auto">
        {options.map((entry) =>
          isGroupEntry(entry) ? (
            <Select.Group key={entry.group}>
              <Select.GroupLabel className="px-3 pt-2 pb-1 fs-xs fw-500 c-slate-5 us-none">
                {entry.group}
              </Select.GroupLabel>
              {entry.items.map(renderOption)}
            </Select.Group>
          ) : (
            renderOption(entry)
          ),
        )}
      </Select.List>
    </Select.Popup>
  );

  return (
    <Field.Root className={`d-f fd-c g-2 ${disabled ? "o-60 c-na" : ""}`}>
      <style href="yumma-ui-select-motion" precedence="default">
        {SELECT_MOTION}
      </style>
      {label && (
        <label htmlFor={id} className="c-slate-10 fs-sm fw-500 us-none">
          {label}
          {required && <span className="c-red-5"> *</span>}
        </label>
      )}

      <Select.Root
        items={options as SelectOption[]}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
        required={required}
      >
        <Select.Trigger id={id} className={triggerClasses}>
          {icon && iconPosition === "leading" && (
            <span className="d-f ai-c g-2">
              {iconEl}
              {value_}
            </span>
          )}
          {(!icon || iconPosition !== "leading") && value_}
          {icon && iconPosition === "trailing" ? (
            <span className="d-f ai-c g-1">
              {iconEl}
              {arrow}
            </span>
          ) : (
            arrow
          )}
        </Select.Trigger>
        <Select.Portal container={container}>
          <Select.Positioner
            sideOffset={8}
            alignItemWithTrigger={false}
            className="zi-10 p-0 ow-0 us-none"
          >
            {popup}
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>

      {description && <p className="m-0 c-slate-6 fs-xs">{description}</p>}
    </Field.Root>
  );
}
