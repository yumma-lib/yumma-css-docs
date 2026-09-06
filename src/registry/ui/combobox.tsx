"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Combobox } from "@base-ui/react/combobox";
import { ArrowSeparateVertical, Check, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useId, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

export interface ComboboxItem {
  label: string;
  description?: string;
  avatar?: string;
}

export interface ComboboxGroup {
  group: string;
  items: ComboboxItem[];
}

const INPUT =
  "pl-4 pr-16 bg-white bc-silver-3 c-slate-10 bw-1 fs-md fv:oo--1 fv:oc-indigo-5";

const SIZES: Record<Size, string> = {
  sm: "h-8 w-56",
  md: "h-10 w-64",
  lg: "h-12 w-72",
};

const POPUP_SIZES: Record<Size, string> = {
  sm: "w-56",
  md: "w-64",
  lg: "w-72",
};

const ACTION_HEIGHTS: Record<Size, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "br-0",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-sm",
  outset: "bs-o-xs",
};

const ACTION =
  "d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10 fv:oo--1 fv:oc-indigo-5";

export interface ComboboxProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  items: ComboboxItem[] | ComboboxGroup[];
  label?: ReactNode;
  description?: string;
  placeholder?: string;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  multiple?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  animate?: boolean;
  emptyMessage?: string;
  className?: string;
}

function isGroupEntry(
  entry: ComboboxItem | ComboboxGroup,
): entry is ComboboxGroup {
  return "items" in entry;
}

function renderItem(item: ComboboxItem) {
  return (
    <Combobox.Item
      key={item.label}
      value={item.label}
      className={(state) =>
        `d-f ai-c g-2 py-2 px-3 mx-1 br-md fs-sm fw-500 us-none c-p ${
          state.highlighted ? "bg-silver-2/50" : "bg-transparent"
        }`
      }
    >
      {item.avatar && (
        <Avatar.Root className="d-if o-h ai-c jc-c w-6 h-6 bc-white br-9999 bw-1 us-none">
          <Avatar.Image
            src={item.avatar}
            alt=""
            className="of-c w-100% h-100%"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-xs">
            {item.label[0]}
          </Avatar.Fallback>
        </Avatar.Root>
      )}
      <span className="fg-1 min-w-0 o-h to-e ws-nw">{item.label}</span>
      {item.description && (
        <span className="fs-0 c-slate-6 fw-400">{item.description}</span>
      )}
      <Combobox.ItemIndicator className="d-f ml-auto c-indigo">
        <Check className="w-3 h-3" />
      </Combobox.ItemIndicator>
    </Combobox.Item>
  );
}

export default function ComboboxBase({
  items,
  label,
  description,
  placeholder = "Search",
  size = "md",
  shape = "rounded",
  shadow = "none",
  multiple = false,
  clearable = true,
  disabled = false,
  loading = false,
  animate = true,
  emptyMessage = "No results found.",
  className,
  container,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const inputClasses = merge(
    INPUT,
    SIZES[size],
    SHAPES[shape],
    SHADOWS[shadow],
    className,
  );

  const popup = (
    <Combobox.Popup
      className={`o-h bg-white bc-silver-2 c-slate-10 bw-1 ${POPUP_SIZES[size]} ${SHAPES[shape]}`}
    >
      {loading ? (
        <div className="py-4 px-4 c-slate-6 fs-sm us-none">Loading...</div>
      ) : (
        <>
          <Combobox.List className="oy-auto py-1 max-h-72 ow-0">
            {(entry: ComboboxItem | ComboboxGroup) =>
              isGroupEntry(entry) ? (
                <Combobox.Group key={entry.group}>
                  <Combobox.GroupLabel className="px-3 pt-2 pb-1 fs-xs fw-500 c-slate-5 us-none">
                    {entry.group}
                  </Combobox.GroupLabel>
                  {entry.items.map(renderItem)}
                </Combobox.Group>
              ) : (
                renderItem(entry)
              )
            }
          </Combobox.List>
          <Combobox.Empty className="c-slate-6 fs-sm">
            <div className="py-4 px-4">{emptyMessage}</div>
          </Combobox.Empty>
        </>
      )}
    </Combobox.Popup>
  );

  return (
    <Combobox.Root
      items={items as ComboboxItem[]}
      open={open}
      onOpenChange={setOpen}
      multiple={multiple}
      disabled={disabled}
    >
      <div
        className={`d-f p-r fd-c g-2 c-slate-10 fs-sm ${disabled ? "o-60 c-na" : ""}`}
      >
        {label && (
          <label htmlFor={id} className="fw-500">
            {label}
          </label>
        )}

        <div className="p-r">
          <Combobox.Input
            id={id}
            placeholder={placeholder}
            className={inputClasses}
          />
          <div
            className={`d-f p-a r-2 b-0 ai-c jc-c c-slate-6 ${ACTION_HEIGHTS[size]}`}
          >
            {}
            {clearable && !multiple && (
              <Combobox.Clear className={ACTION} aria-label="Clear selection">
                <Xmark className="w-4 h-4" />
              </Combobox.Clear>
            )}
            <Combobox.Trigger className={ACTION} aria-label="Open popup">
              <ArrowSeparateVertical className="w-4 h-4" />
            </Combobox.Trigger>
          </div>
        </div>

        {multiple && (
          <Combobox.Value>
            {(selected: string[]) => (
              <div className="d-f fw-w ai-c g-1">
                {selected.map((chip) => (
                  <Combobox.Chip
                    key={chip}
                    className="d-f ai-c g-1 px-2 py-0 h-6 bg-indigo-1 bc-indigo-2 c-indigo-7 bw-1 br-9999 fs-xs fw-500"
                  >
                    {chip}
                    <Combobox.ChipRemove
                      className="d-f b-0 ai-c jc-c p-0 bg-transparent c-indigo-5 c-p h:c-indigo-8"
                      aria-label={`Remove ${chip}`}
                    >
                      <Xmark className="w-3 h-3" />
                    </Combobox.ChipRemove>
                  </Combobox.Chip>
                ))}
              </div>
            )}
          </Combobox.Value>
        )}

        {description && <p className="m-0 c-slate-6 fs-xs">{description}</p>}
      </div>

      <AnimatePresence>
        {open && (
          <Combobox.Portal container={container} keepMounted>
            <Combobox.Positioner className="ow-0" sideOffset={8}>
              {animate ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {popup}
                </motion.div>
              ) : (
                popup
              )}
            </Combobox.Positioner>
          </Combobox.Portal>
        )}
      </AnimatePresence>
    </Combobox.Root>
  );
}
