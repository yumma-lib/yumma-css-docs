"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { type ReactNode, useId } from "react";
import { merge } from "yummacss/merge";
import Checkbox from "./checkbox";

export interface CheckboxGroupProps {
  className?: string;
  children: ReactNode;
  /** Names the group for screen readers, and is shown above it. */
  label?: ReactNode;
  /**
   * Renders a checkbox above the group that checks and clears all of them, and
   * is indeterminate while only some are checked. Needs `allValues`.
   */
  parentLabel?: ReactNode;
  /** Every value in the group, which is how the parent knows its state. */
  allValues?: string[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  name?: string;
}

export default function CheckboxGroupBase({
  className,
  children,
  label,
  parentLabel,
  allValues,
  value,
  defaultValue,
  onValueChange,
  disabled,
  name,
}: CheckboxGroupProps) {
  const labelId = useId();

  return (
    <CheckboxGroup
      // Only a plain `label` names the group by reference. Pointing
      // `aria-labelledby` at the parent checkbox would make the group's name an
      // interactive control, so a string `parentLabel` names it by value.
      aria-labelledby={label ? labelId : undefined}
      aria-label={
        !label && typeof parentLabel === "string" ? parentLabel : undefined
      }
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      allValues={allValues}
      disabled={disabled}
      className={merge("d-f fd-c g-2 c-slate-10", className)}
    >
      {label && (
        <div className="fs-xs fw-600 c-slate-5 us-none" id={labelId}>
          {label}
        </div>
      )}
      {parentLabel && <Checkbox name={name} parent label={parentLabel} />}
      <div className={merge("d-f fd-c g-2", parentLabel ? "ml-6" : undefined)}>
        {children}
      </div>
    </CheckboxGroup>
  );
}
