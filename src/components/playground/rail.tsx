"use client";

import { Button } from "@base-ui/react";
import Link from "next/link";
import { useState } from "react";
import { BaseUI } from "@/components/icons/icons";
import { usePlayground } from "@/components/playground/context";
import Control from "@/components/playground/control";
import PropDescription from "@/components/prop-description";
import { NavArrowDown } from "@/icons";
import { getRegistryTarget, type RegistryProp } from "@/registry";
import { primitiveSlug } from "@/utils/primitive";
import { isControllable, isInert, typeOf } from "@/utils/props";

/** Playground rail: all props as controls or type labels. */
export default function PlaygroundRail() {
  const playground = usePlayground();
  const [open, setOpen] = useState<string | null>(null);

  const props = playground?.meta?.props ?? [];

  // The Base UI link belongs on this header rather than on the stage: it
  // answers a question the props below raise, since those are the props that
  // page documents.
  const target = playground ? getRegistryTarget(playground.id) : null;
  const primitive = target
    ? primitiveSlug(target.component, target.install)
    : null;

  const toggle = (name: string) =>
    setOpen((current) => (current === name ? null : name));

  return (
    // No extra horizontal pad on small screens: main already has `px-6`.
    <aside className="bc-border btw-1 @lg:btw-0 @lg:blw-1 @lg:gc-s-3">
      <div className="playground-rail">
        <div className="pt-8 pb-12 @lg:pt-0 @lg:px-8">
          {/* No reset: leaving the page & coming back reseeds from the
              schema, which is the only reset this needs. */}
          <div className="d-f ai-c jc-sb g-2 mb-3">
            <h3 className="c-silver-8 fs-xs ls-2 tt-u">Component API</h3>
            {primitive && (
              <Link
                href={`https://base-ui.com/react/components/${primitive}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Base UI reference"
                aria-label="Base UI reference"
                className="d-f ai-c jc-c fs-0 c-accent td-none h:c-accent-4 fv:oc-accent fv:ow-2"
              >
                <BaseUI className="w-4 h-4" />
              </Link>
            )}
          </div>

          {props.map((prop) => {
            const inert = isInert(prop, playground?.values ?? {}, props);
            return (
              <Row
                key={prop.name}
                prop={prop}
                inert={inert}
                open={open === prop.name}
                onToggle={() => toggle(prop.name)}
              >
                {isControllable(prop) ? (
                  <Control
                    prop={prop}
                    inert={Boolean(inert)}
                    value={playground?.values[prop.name]}
                    onChange={(value) => playground?.setValue(prop.name, value)}
                  />
                ) : (
                  <code className="fs-0 c-white/70 fs-xs ff-m">
                    {typeOf(prop)}
                  </code>
                )}
              </Row>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

/** Prop row: name, control, optional description on click. */
function Row({
  prop,
  inert,
  open,
  onToggle,
  children,
}: {
  prop: RegistryProp;
  inert?: string | null;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const name = <code className="c-code fs-xs ff-m">{prop.name}</code>;
  // The reason waits for someone to reach for the control. Shown on arrival it
  // is a wall of red on a page nobody has touched yet.
  const [attempted, setAttempted] = useState(false);

  return (
    <div className="py-2 bc-border bbw-1">
      <div className="d-f ai-c jc-sb g-2 fw-w">
        {prop.description ? (
          <Button
            onClick={onToggle}
            aria-expanded={open}
            className="d-f ai-c g-1 p-0 bg-transparent bw-0 ta-l c-p fv:oo--1 fv:oc-accent"
          >
            {name}
            <NavArrowDown
              aria-hidden
              className={`fs-0 w-3 h-3 tp-c tdu-150 ${
                open ? "ro-36 c-accent" : "c-white/25"
              }`}
            />
          </Button>
        ) : (
          name
        )}
        {/* The control is locked, so the press never reaches it; the wrapper
            is what hears the attempt. */}
        <span
          onPointerDownCapture={() => inert && setAttempted(true)}
          onFocusCapture={() => inert && setAttempted(true)}
        >
          {children}
        </span>
      </div>

      {inert && attempted && (
        <div className="mt-1 c-diff-remove fs-xs">
          Does nothing while <code className="ff-m">{inert}</code>.
        </div>
      )}

      {open && (
        <div className="mt-2 c-white/60 fs-sm lh-4">
          <PropDescription text={prop.description} />
        </div>
      )}
    </div>
  );
}
