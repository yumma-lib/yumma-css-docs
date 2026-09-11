"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Avatar } from "@base-ui/react/avatar";
import { type ReactNode, useEffect, useId, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconSide = "leading" | "trailing";

export interface AutocompleteItem {
  label: string;
  description?: string;
  avatar?: string;
  icon?: ReactNode;
}

export interface AutocompleteGroup {
  group: string;
  items: AutocompleteItem[];
}

const INPUT =
  "bg-white bc-silver-3 c-slate-10 bw-1 fs-md fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3";

const SIZES: Record<Size, string> = {
  sm: "h-8 w-56",
  md: "h-10 w-64",
  lg: "h-12 w-72",
};

/** Base UI waits on `getAnimations()`, which never sees Motion. See NOTES.md. */
const AUTOCOMPLETE_MOTION = `
  .yui-autocomplete-pop {
    transition: opacity 150ms ease-out, scale 150ms ease-out;
  }
  .yui-autocomplete-pop[data-starting-style],
  .yui-autocomplete-pop[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-autocomplete-pop { transition: none; }
  }
`;

const POPUP_SIZES: Record<Size, string> = {
  sm: "w-56",
  md: "w-64",
  lg: "w-72",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "br-0",
  squircle: "br-xxl cs-s",
};

const SHADOWS: Record<Shadow, string> = {
  none: "",
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const ICON_PADDING: Record<IconSide, string> = {
  leading: "pl-10 pr-4",
  trailing: "pl-4 pr-10",
};

export interface AutocompleteProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  items: AutocompleteItem[] | AutocompleteGroup[];
  label?: ReactNode;
  description?: string;
  placeholder?: string;
  size?: Size;
  shape?: Shape;
  shadow?: Shadow;
  icon?: ReactNode;
  iconPosition?: IconSide;
  disabled?: boolean;
  loading?: boolean;
  autoHighlight?: boolean;
  limit?: number;
  animated?: boolean;
  emptyMessage?: string;
  onQueryChange?: (value: string) => void;
  className?: string;
}

function isGroupEntry(
  entry: AutocompleteItem | AutocompleteGroup,
): entry is AutocompleteGroup {
  return "items" in entry;
}

function renderItem(item: AutocompleteItem) {
  return (
    <Autocomplete.Item
      key={item.label}
      value={item.label}
      render={(props, state) => (
        <div
          {...props}
          className={`d-f ai-c g-3 py-2 px-3 mx-1 c-slate-10 br-md fs-sm us-none c-p ${
            state.highlighted ? "bg-silver-2/50" : "bg-transparent"
          }`}
        >
          {item.icon ? (
            <span className="d-f fs-0 ai-c jc-c w-6 h-6 c-slate-5">
              {item.icon}
            </span>
          ) : (
            item.avatar && (
              <Avatar.Root className="fs-0 w-6 h-6 bc-white br-9999 bw-1">
                <Avatar.Image
                  src={item.avatar}
                  alt=""
                  className="of-c w-100% h-100% br-9999"
                />
                <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% bg-silver-2 c-slate-8 fs-xs">
                  {item.label[0]}
                </Avatar.Fallback>
              </Avatar.Root>
            )
          )}
          <div className="d-f fd-c min-w-0">
            <span className="o-h fw-500 to-e ws-nw">{item.label}</span>
            {item.description && (
              <span className="c-slate-6 fs-xs">{item.description}</span>
            )}
          </div>
        </div>
      )}
    />
  );
}

export default function AutocompleteBase({
  items,
  label,
  description,
  placeholder = "Search",
  size = "md",
  shape = "square",
  shadow = "none",
  icon,
  iconPosition = "leading",
  disabled = false,
  loading = false,
  autoHighlight = false,
  limit = 0,
  animated = true,
  emptyMessage = "No results found.",
  onQueryChange,
  className,
  container,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false);

  // A control that gets disabled while its popup is open should put it away.
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);
  const id = useId();

  const inputClasses = merge(
    INPUT,
    SIZES[size],
    SHAPES[shape],
    SHADOWS[shadow],
    icon ? ICON_PADDING[iconPosition] : "pl-4",
    className,
  );

  const popup = (
    <Autocomplete.Popup
      className={`o-h bg-white bc-silver-2 c-slate-10 bw-1 ${POPUP_SIZES[size]} ${SHAPES[shape]} ${animated ? "yui-autocomplete-pop" : ""}`}
    >
      {loading ? (
        <div className="py-3 px-4 c-slate-6 fs-sm us-none">Loading...</div>
      ) : (
        <>
          <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
            {(entry: AutocompleteItem | AutocompleteGroup) =>
              isGroupEntry(entry) ? (
                <Autocomplete.Group key={entry.group}>
                  <Autocomplete.GroupLabel className="px-3 pt-2 pb-1 fs-xs fw-500 c-slate-5 us-none">
                    {entry.group}
                  </Autocomplete.GroupLabel>
                  {entry.items.map(renderItem)}
                </Autocomplete.Group>
              ) : (
                renderItem(entry)
              )
            }
          </Autocomplete.List>
          <Autocomplete.Empty className="c-slate-6 fs-sm">
            <div className="pt-2 pb-3 px-4 us-none">{emptyMessage}</div>
          </Autocomplete.Empty>
        </>
      )}
    </Autocomplete.Popup>
  );

  return (
    <Autocomplete.Root
      items={items as AutocompleteItem[]}
      open={open}
      onOpenChange={setOpen}
      onValueChange={onQueryChange}
      disabled={disabled}
      autoHighlight={autoHighlight}
      limit={limit > 0 ? limit : undefined}
    >
      <div className={`d-f fd-c g-2 ${disabled ? "o-60 c-na" : ""}`}>
        {label && (
          <label htmlFor={id} className="c-slate-10 fs-sm fw-500">
            {label}
          </label>
        )}
        <div className="d-f p-r ai-c">
          {icon && (
            <span
              className={`d-f p-a ai-c c-slate-5 pe-none ${iconPosition === "leading" ? "l-3" : "r-3"}`}
            >
              {icon}
            </span>
          )}
          <style href="yumma-ui-autocomplete-motion" precedence="default">
            {AUTOCOMPLETE_MOTION}
          </style>
          <Autocomplete.Input
            id={id}
            placeholder={placeholder}
            className={inputClasses}
          />
        </div>
        {description && <p className="m-0 c-slate-6 fs-xs">{description}</p>}
      </div>
      <Autocomplete.Portal container={container} keepMounted>
        <Autocomplete.Positioner className="ow-0" sideOffset={8}>
          {popup}
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}
