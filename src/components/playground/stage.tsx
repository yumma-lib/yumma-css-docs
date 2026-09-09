"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { usePlayground } from "@/components/playground/context";
import PreviewFrame, { usePreviewContainer } from "@/components/preview-frame";
import PreviewSpinner from "@/components/preview-spinner";
import TokenBlock from "@/components/ui/token-block";
import { getRegistryTarget, type RegistryMeta } from "@/registry";
import {
  type DemoProps,
  EXAMPLE_CHILDREN,
  resolveIcons,
  seedValues,
} from "@/utils/demo";
import {
  getCachedRegistryComponent,
  loadRegistryComponent,
} from "@/utils/prefetch-registry";
import { buildUsage } from "@/utils/snippet";

const PREVIEW_SHELL = "d-f p-r ox-auto ai-c jc-c p-10 min-h-64 bg-white";

/** Tall enough that a modal opening inside the frame is not clipped by it. */
const STAGE = 384;

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
        <div data-preview className={PREVIEW_SHELL}>
          <PreviewSpinner />
        </div>
        <div className="bc-border btw-1 bg-surface min-h-28" aria-hidden />
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

  return (
    <div className="mb-8 bc-border bw-1">
      <PreviewFrame minHeight={STAGE}>
        <Mounted
          Component={Component}
          props={resolveIcons(set) as DemoProps}
          portals={meta.props.some((prop) => prop.name === "container")}
        >
          {EXAMPLE_CHILDREN[frame.id] ?? meta.children}
        </Mounted>
      </PreviewFrame>
      <TokenBlock
        tokens={usage}
        title="page.tsx"
        installId={getRegistryTarget(frame.id).install}
      />
    </div>
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
