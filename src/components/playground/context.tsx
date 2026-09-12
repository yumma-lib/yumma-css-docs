"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getRegistryMeta, type RegistryMeta } from "@/registry";
import { type DemoProps, exampleIcon, seedValues } from "@/utils/demo";
import { fromQuery, toQuery } from "@/utils/playground-url";
import { prefetchRegistry } from "@/utils/prefetch-registry";
import { isInert } from "@/utils/props";

/** Playground state shared between stage (MDX) and rail (layout column). */
interface Playground {
  id: string;
  meta: RegistryMeta | null;
  values: DemoProps;
  setValue: (name: string, value: unknown) => void;
}

const PlaygroundContext = createContext<Playground | null>(null);

/** Null on a page that has no playground, which the rail treats as its cue. */
export function usePlayground(): Playground | null {
  return useContext(PlaygroundContext);
}

interface Seed {
  meta: RegistryMeta | null;
  values: DemoProps;
}

const EMPTY: Seed = { meta: null, values: {} };

export function PlaygroundProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const [seed, setSeed] = useState<Seed>(EMPTY);

  // The query this page was opened with, captured once during the first render.
  // Reading it in the effect instead would lose it: an effect runs twice in
  // development, and the second pass would see an address bar the first pass
  // had already rewritten.
  const opened = useRef<{ id: string; query: string } | null>(null);
  if (opened.current === null && typeof window !== "undefined") {
    opened.current = { id, query: window.location.search };
  }

  useEffect(() => {
    const importMeta = getRegistryMeta(id);
    if (!importMeta) {
      setSeed(EMPTY);
      return;
    }

    // A query captured under another component's id belongs to that one.
    const query = opened.current?.id === id ? opened.current.query : "";

    // Drop the outgoing schema; the stage keeps its last visual frame.
    setSeed(EMPTY);
    prefetchRegistry(id);

    let live = true;
    importMeta().then((module) => {
      if (!live) return;
      const meta = module.default;
      setSeed({
        meta,
        values: fromQuery(meta, query, seedValues(meta), exampleIcon),
      });
    });

    return () => {
      live = false;
    };
  }, [id]);

  // `replaceState` rather than a router push: a control is not a navigation,
  // and the back button belongs to the pages someone visited.
  useEffect(() => {
    if (!seed.meta) return;
    const query = toQuery(seed.meta, seed.values, seedValues(seed.meta));
    window.history.replaceState(
      null,
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );
  }, [seed.meta, seed.values]);

  const setValue = useCallback((name: string, value: unknown) => {
    setSeed((current) => {
      const values = { ...current.values, [name]: value };

      // `iconPosition` moves an icon. Rather than do nothing until one is switched
      // on, picking a side puts the icon there, so the control does what it
      // says. The schema names the dependency.
      const prop = current.meta?.props.find((entry) => entry.name === name);
      const needs = prop?.dependsOn
        ? current.meta?.props.find((entry) => entry.name === prop.dependsOn)
        : undefined;

      if (needs?.exampleIcon && !current.values[needs.name]) {
        values[needs.name] = exampleIcon(needs.exampleIcon);
      }

      // A prop that just became inert gives up its value. Left on, it reads as
      // switched on and doing nothing, which is the thing the flag exists to
      // stop. Booleans go off; everything else returns to its default.
      const all = current.meta?.props ?? [];
      for (const entry of all) {
        if (entry.name === name) continue;
        if (!isInert(entry, values, all)) continue;
        if (entry.type === "boolean") values[entry.name] = false;
        else if (entry.default !== undefined)
          values[entry.name] = entry.default;
      }

      return { ...current, values };
    });
  }, []);

  const playground = useMemo(
    () => ({ id, meta: seed.meta, values: seed.values, setValue }),
    [id, seed.meta, seed.values, setValue],
  );

  return <PlaygroundContext value={playground}>{children}</PlaygroundContext>;
}
