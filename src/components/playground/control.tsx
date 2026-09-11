"use client";

import { Button } from "@base-ui/react";
import { Select } from "@base-ui/react/select";
import { Switch } from "@base-ui/react/switch";
import { NavArrowDown } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { RegistryProp } from "@/registry";
import { exampleIcon } from "@/utils/demo";

interface Props {
  prop: RegistryProp;
  value: unknown;
  onChange: (value: unknown) => void;
  /** The prop cannot do anything under the current values. */
  inert?: boolean;
}

/**
 * Widget for one controllable prop (enum, boolean, or icon slot).
 *
 * Every enum is a select, however few values it has. Segments laid each option
 * out across a rail three columns wide, so `shape` with four ate a line that
 * `size` with three had already crowded. Triggers share a fixed width so the
 * column lines up; the popup shares that width (`w-32`), grows with short
 * lists, and scrolls past `max-h-40`.
 */
export default function Control({ prop, value, onChange, inert }: Props) {
  if (prop.exampleIcon) {
    return (
      <Toggle
        checked={value !== undefined && value !== null}
        onCheckedChange={(next) =>
          onChange(next ? exampleIcon(prop.exampleIcon ?? "") : undefined)
        }
        label={prop.name}
        inert={inert}
      />
    );
  }

  if (prop.type === "boolean") {
    return (
      <Toggle
        checked={Boolean(value)}
        onCheckedChange={onChange}
        label={prop.name}
        inert={inert}
      />
    );
  }

  if (prop.type === "number") {
    return (
      <Stepper
        name={prop.name}
        value={
          typeof value === "number" ? value : ((prop.default as number) ?? 0)
        }
        min={prop.min}
        max={prop.max}
        step={prop.step ?? 1}
        onChange={onChange}
        inert={inert}
      />
    );
  }

  if (prop.type === "enum" && prop.values) {
    return (
      <EnumSelect
        name={prop.name}
        values={prop.values}
        value={typeof value === "string" ? value : null}
        onChange={onChange}
        inert={inert}
      />
    );
  }

  return null;
}

/**
 * Minus, the value, plus. A range input would read the bound off the schema
 * too, but half of these props have no bound and an unbounded slider has no
 * position to show.
 */
function Stepper({
  name,
  value,
  min,
  max,
  step,
  onChange,
  inert,
}: {
  name: string;
  value: number;
  min?: number;
  max?: number;
  step: number;
  onChange: (value: unknown) => void;
  inert?: boolean;
}) {
  const clamp = (next: number) =>
    Math.min(
      max ?? Number.POSITIVE_INFINITY,
      Math.max(min ?? Number.NEGATIVE_INFINITY, next),
    );

  const atMin = min !== undefined && value <= min;
  const atMax = max !== undefined && value >= max;

  const button = (spent: boolean) =>
    `d-f fs-0 ai-c jc-c w-6 h-6 bw-0 bg-transparent ff-m fs-xs fv:oo--1 fv:oc-accent ${
      inert || spent ? "c-white/25 c-na" : "c-accent-dim h:c-accent c-p"
    }`;

  return (
    <div
      className={`d-f fs-0 ai-c jc-sb w-32 bw-1 ${
        inert ? "bc-diff-remove/40" : "bc-border"
      }`}
    >
      <Button
        type="button"
        aria-label={`Decrease ${name}`}
        disabled={inert || atMin}
        onClick={() => onChange(clamp(value - step))}
        className={button(atMin)}
      >
        &minus;
      </Button>
      <span
        aria-live="polite"
        className={`ff-m fs-xs ${inert ? "c-diff-remove" : "c-accent"}`}
      >
        {value}
      </span>
      <Button
        type="button"
        aria-label={`Increase ${name}`}
        disabled={inert || atMax}
        onClick={() => onChange(clamp(value + step))}
        className={button(atMax)}
      >
        +
      </Button>
    </div>
  );
}

function EnumSelect({
  name,
  values,
  value,
  onChange,
  inert,
}: {
  name: string;
  values: string[];
  value: string | null;
  onChange: (value: unknown) => void;
  inert?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const popup = (
    <Select.Popup className="p-1 oy-auto w-32 max-h-40 bc-border bg-surface bw-1">
      <Select.List>
        {values.map((option) => (
          <Select.Item
            key={option}
            value={option}
            className={(state) =>
              `d-b px-2 py-1 ff-m fs-xs c-p us-none ${
                state.highlighted ? "bg-border c-accent" : "c-accent-dim"
              }`
            }
          >
            <Select.ItemText>{option}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.List>
    </Select.Popup>
  );

  return (
    <Select.Root
      value={value}
      onValueChange={onChange}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger
        aria-label={name}
        className={`d-f fs-0 ai-c jc-sb g-1 px-2 py-1 w-32 bg-transparent bw-1 ff-m fs-xs us-none fv:oo--1 fv:oc-accent ${
          inert
            ? "bc-diff-remove/40 c-diff-remove c-na"
            : "bc-border c-accent c-p"
        }`}
      >
        <Select.Value className="o-h to-e ws-nw" />
        <NavArrowDown className="fs-0 w-3 h-3 c-accent-dim" aria-hidden />
      </Select.Trigger>
      <AnimatePresence>
        {open && (
          <Select.Portal>
            <Select.Positioner
              side="bottom"
              sideOffset={4}
              alignItemWithTrigger={false}
              collisionAvoidance={{ side: "none", fallbackAxisSide: "none" }}
              className="zi-50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {popup}
              </motion.div>
            </Select.Positioner>
          </Select.Portal>
        )}
      </AnimatePresence>
    </Select.Root>
  );
}

/**
 * A switch in the docs palette.
 *
 * The geometry is Yumma UI's own switch at `sm` - a `px-1` track, a thumb that
 * travels `ml-0` to `ml-2` - because that is the part worth borrowing. Its
 * colours are not: `bg-indigo` on a white track is the library's look, and in
 * the rail it read as a saturated blue stripe with a thumb you could barely
 * find. These are the page's own accent and border.
 */
function Toggle({
  checked,
  onCheckedChange,
  label,
  inert,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  inert?: boolean;
}) {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={label}
      className={`d-f fs-0 ai-c px-1 w-7 h-4 bw-0 tp-c tdu-150 ttf-io fv:oo-2 fv:oc-accent ${
        inert
          ? "bg-diff-remove/30 c-na"
          : `c-p ${checked ? "bg-accent-dim" : "bg-border"}`
      }`}
    >
      <Switch.Thumb
        className={`d-b w-3 h-2 tp-a tdu-150 ttf-io ${
          checked ? "ml-2 bg-page" : "ml-0 bg-white/40"
        }`}
      />
    </Switch.Root>
  );
}
