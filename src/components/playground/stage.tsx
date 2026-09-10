"use client";

import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { BaseUI } from "@/components/icons/icons";
import { usePlayground } from "@/components/playground/context";
import Install from "@/components/playground/install";
import PreviewFrame, { usePreviewContainer } from "@/components/preview-frame";
import PreviewSpinner from "@/components/preview-spinner";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/tabs";
import TokenBlock from "@/components/ui/token-block";
import { getRegistryTarget, type RegistryMeta } from "@/registry";
import {
  type DemoProps,
  exampleChildren,
  resolveIcons,
  seedValues,
} from "@/utils/demo";
import {
  getCachedRegistryComponent,
  loadRegistryComponent,
} from "@/utils/prefetch-registry";
import { primitiveSlug } from "@/utils/primitive";
import { buildUsage } from "@/utils/snippet";

const PREVIEW_SHELL = "d-f p-r ox-auto ai-c jc-c p-10 bg-white";

// The stage fills the column instead of stopping at a fixed height and leaving
// the page short below it. A viewport-relative height needs an inline style
// until v4's viewport-minus utilities land; `sidebar-nav` and `toc` do the
// same thing. The floor is tall enough that a modal opening inside the frame
// is not clipped by it.
const STAGE_MIN = 384;
const STAGE = "calc(100dvh - 18rem)";

// A title bar or a tab strip: `py-2` around a line of `fs-xs`, plus its border.
// Subtracting it keeps every panel the same height as the preview, so the
// frame does not resize when you switch tabs.
const BAR = "2.0625rem";

interface Frame {
  id: string;
  meta: RegistryMeta;
  values: DemoProps;
  Component: ComponentType<DemoProps>;
}

/** Live preview and usage snippet; keeps the last ready frame while the next loads. */
export default function ComponentPlayground() {
  const playground = usePlayground();
  const playgroundRef = useRef(playground);
  playgroundRef.current = playground;
  const [frame, setFrame] = useState<Frame | null>(null);

  // Commit only when meta is present; fixtures come from the schema itself so
  // a cleared values bag can never ship into the preview.
  useEffect(() => {
    const id = playground?.id;
    const meta = playground?.meta;
    if (!id || !meta) return;

    let live = true;

    const commit = (Component: ComponentType<DemoProps>) => {
      if (!live) return;
      const current = playgroundRef.current;

      const values =
        current?.id === id && current.meta ? current.values : seedValues(meta);
      setFrame({ id, meta, values, Component });
    };

    const cached = getCachedRegistryComponent(id);
    if (cached) {
      commit(cached as ComponentType<DemoProps>);
      return () => {
        live = false;
      };
    }

    loadRegistryComponent(id).then((Component) => {
      if (Component) commit(Component as ComponentType<DemoProps>);
    });

    return () => {
      live = false;
    };
  }, [playground?.id, playground?.meta]);

  if (!frame) {
    return (
      <div className="mb-8 bc-border bw-1">
        {/* Same height as the loaded stage, so the page does not jump when the
            component arrives. */}
        <div
          data-preview
          className={PREVIEW_SHELL}
          style={{ height: STAGE, minHeight: STAGE_MIN }}
        >
          <PreviewSpinner />
        </div>
      </div>
    );
  }

  const live = frame.id === playground?.id && Boolean(playground?.meta);
  const values = live && playground ? playground.values : frame.values;
  const meta = live && playground?.meta ? playground.meta : frame.meta;
  const set = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== ""),
  );
  const usage = buildUsage(getRegistryTarget(frame.id).component, meta, set);
  const { Component } = frame;

  // `defaultChecked` and friends seed `useState`, which reads a prop once and
  // never again, so changing one in the controls did nothing. Remount instead:
  // 13 components take an uncontrolled default.
  const target = getRegistryTarget(frame.id);
  const primitive = primitiveSlug(target.component, target.install);

  const uncontrolled = Object.entries(set)
    .filter(([name]) => name.startsWith("default"))
    .map(([name, value]) => `${name}:${JSON.stringify(value)}`)
    .join("|");

  // Preview and code share one height, and the code scrolls inside it. Stacked,
  // an expanded snippet pushed the page down and put a scrollbar on the window;
  // the point of the tabs is that the page never scrolls.
  return (
    <Tabs defaultValue="preview" className="mb-8">
      <TabsList>
        <TabsTab value="preview">Preview</TabsTab>
        <TabsTab value="code">Code</TabsTab>

        {/* Trailing group: the two things you do here that are not looking.
            In the title row, Install competed with the page title for the
            widest line, and the Base UI link only existed on the Code tab. */}
        <div className="d-f ai-c g-2 ml-auto pr-1 fs-0">
          {primitive && (
            <>
              <Link
                href={`https://base-ui.com/react/components/${primitive}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Base UI primitive"
                className="d-f ai-c jc-c p-1 c-accent td-none h:c-accent-4 fv:oc-accent fv:ow-2"
              >
                <BaseUI className="w-4 h-4" />
              </Link>
              <span className="w-px h-4 bg-border" aria-hidden="true" />
            </>
          )}
          <Install id={target.install} />
        </div>
      </TabsList>

      <TabsPanel value="preview" className="">
        <PreviewFrame minHeight={STAGE_MIN} height={STAGE}>
          <Mounted
            key={uncontrolled}
            Component={Component}
            props={resolveIcons(set) as DemoProps}
            portals={meta.props.some((prop) => prop.name === "container")}
          >
            {exampleChildren(meta)}
          </Mounted>
        </PreviewFrame>
      </TabsPanel>

      <TabsPanel value="code" className="">
        <TokenBlock
          tokens={usage}
          title="page.tsx"
          className=""
          height={`calc(${STAGE} - ${BAR})`}
        />
      </TabsPanel>
    </Tabs>
  );
}

/**
 * The component, inside the frame, holding a portal target if it takes one.
 *
 * Base UI resolves a portal against the top-level `document.body` rather than
 * the document its trigger renders in, so a modal opened in a framed preview
 * would still land on the page and cover the controls driving it. The schema
 * decides whether to pass `container`: on a component with no popup it would
 * reach the DOM as an unknown attribute.
 */
function Mounted({
  Component,
  props,
  portals,
  children,
}: {
  Component: ComponentType<DemoProps>;
  props: DemoProps;
  portals: boolean;
  children?: ReactNode;
}) {
  const container = usePreviewContainer();

  return (
    <Component {...props} {...(portals ? { container } : {})}>
      {children}
    </Component>
  );
}
