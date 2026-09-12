"use client";

import { useQueryStates } from "nuqs";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getRegistryMeta, type RegistryMeta } from "@/registry";
import { type DemoProps, exampleIcon, seedValues } from "@/utils/demo";
import { applyQuery, keyMapFor, queryFor } from "@/utils/playground-url";
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

  useEffect(() => {
    const importMeta = getRegistryMeta(id);
    if (!importMeta) {
      setSeed(EMPTY);
      return;
    }

    // Drop the outgoing schema; the stage keeps its last visual frame.
    setSeed(EMPTY);
    prefetchRegistry(id);

    let live = true;
    importMeta().then((module) => {
      if (!live) return;
      setSeed({ meta: module.default, values: seedValues(module.default) });
    });

    return () => {
      live = false;
    };
  }, [id]);

  // One parser per controllable prop, each defaulting to the schema's own seed.
  // nuqs drops a parameter that matches its default, which is what keeps an
  // untouched page on a clean address.
  const keyMap = useMemo(
    () => (seed.meta ? keyMapFor(seed.meta, seed.values) : {}),
    [seed.meta, seed.values],
  );

  const [query, setQuery] = useQueryStates(keyMap, {
    history: "replace",
    clearOnDefault: true,
    shallow: true,
  });

  const values = useMemo(
    () =>
      seed.meta
        ? applyQuery(seed.meta, query, seed.values, exampleIcon)
        : seed.values,
    [seed.meta, seed.values, query],
  );

  const setValue = useCallback(
    (name: string, value: unknown) => {
      const meta = seed.meta;
      if (!meta) return;

      const next = { ...values, [name]: value };

      // `iconPosition` moves an icon. Rather than do nothing until one is
      // switched on, picking a side puts the icon there, so the control does
      // what it says. The schema names the dependency.
      const prop = meta.props.find((entry) => entry.name === name);
      const needs = prop?.dependsOn
        ? meta.props.find((entry) => entry.name === prop.dependsOn)
        : undefined;

      if (needs?.exampleIcon && !values[needs.name]) {
        next[needs.name] = exampleIcon(needs.exampleIcon);
      }

      // A prop that just became inert gives up its value. Left on, it reads as
      // switched on and doing nothing, which is the thing the flag exists to
      // stop. Booleans go off; everything else returns to its default.
      for (const entry of meta.props) {
        if (entry.name === name) continue;
        if (!isInert(entry, next, meta.props)) continue;
        if (entry.type === "boolean") next[entry.name] = false;
        else if (entry.default !== undefined) next[entry.name] = entry.default;
      }

      setQuery(queryFor(meta, next));
    },
    [seed.meta, values, setQuery],
  );

  const playground = useMemo(
    () => ({ id, meta: seed.meta, values, setValue }),
    [id, seed.meta, values, setValue],
  );

  return <PlaygroundContext value={playground}>{children}</PlaygroundContext>;
}
