import {
  BellNotification,
  Bold,
  Bookmark,
  Check,
  Folder,
  HalfMoon,
  Italic,
  Mail,
  Page,
  PagePlus,
  PageSearch,
  Plus,
  Search,
  SparksSolid,
  Star,
  StatUp,
  SunLight,
  Trash,
  TriangleFlag,
  Underline,
  User,
  UserPlus,
  Wrench,
} from "iconoir-react";
import type { ComponentType, ReactNode } from "react";
import type { RegistryMeta } from "@/registry";
import Avatar from "@/registry/ui/avatar";
import Button from "@/registry/ui/button";
import Checkbox from "@/registry/ui/checkbox";
import Toggle from "@/registry/ui/toggle";
import { iconMarker } from "@/utils/snippet";

export type DemoProps = Record<string, unknown>;

/**
 * Icons a schema may name via `exampleIcon`, so a component whose only visible
 * content is an icon does not demo itself as an empty box.
 *
 * Curated rather than a dynamic `icons[name]` lookup: indexing the package by a
 * runtime string would defeat tree-shaking & pull every iconoir glyph into the
 * client bundle. Adding one here is a two-line change; making it dynamic is a
 * megabyte.
 */
export const EXAMPLE_ICONS: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  BellNotification,
  Bold,
  Bookmark,
  Check,
  Folder,
  TriangleFlag,
  HalfMoon,
  Italic,
  Underline,
  Mail,
  Page,
  PagePlus,
  Plus,
  PageSearch,
  Search,
  SparksSolid,
  Star,
  StatUp,
  SunLight,
  Trash,
  User,
  UserPlus,
  Wrench,
};

/**
 * The glyph a schema names, at the size a slot inside a component wants.
 *
 * Shared with the playground, where a checkbox puts this same element into the
 * slot or takes it out again: the control for a `ReactNode` is not which glyph
 * but whether there is one.
 */
export function exampleIcon(name: string) {
  const Icon = EXAMPLE_ICONS[name];
  return Icon ? <Icon className="w-5 h-5" /> : undefined;
}

/**
 * What a representative instance of a component looks like, from its own
 * schema.
 *
 * A prop-driven component rendered with no props at all is an empty shell:
 * `<Button />` has no label, `<Avatar />` has no image. These are the raw
 * values, which is what the snippet is built from. Pass them through
 * `resolveIcons` before rendering.
 */
export function seedValues(meta: RegistryMeta): DemoProps {
  const values: DemoProps = {};

  for (const prop of meta.props) {
    // An explicit `null` example is a slot the demo starts empty. Without it
    // an optional icon would be on before anyone asked for one, and the
    // snippet would open with a glyph the component does not default to.
    if (prop.example === null) continue;

    if (prop.exampleIcon) {
      const icon = exampleIcon(prop.exampleIcon);
      if (icon) {
        values[prop.name] = icon;
        continue;
      }
    }
    const value = prop.example ?? prop.default;
    if (value !== undefined) values[prop.name] = value;
  }

  return values;
}

/**
 * Turns every `{ "$icon": "Star" }` marker nested in a value into the glyph it
 * names, so an icon inside an array of items - a tour step, a menu entry - is
 * not stuck being the one thing JSON cannot hold.
 *
 * The raw value is kept for the snippet, which spells the same marker as
 * `<Star />`, so this walk only ever feeds the rendered preview.
 */
export function resolveIcons(value: unknown): unknown {
  const marker = iconMarker(value);
  if (marker) {
    const Icon = EXAMPLE_ICONS[marker.name];
    return Icon ? <Icon className={marker.size ?? "w-6 h-6"} /> : undefined;
  }
  if (Array.isArray(value)) return value.map(resolveIcons);
  if (typeof value === "object" && value !== null) {
    // A React element is an object too, and recursing into its internals would
    // shred it.
    if ("$$typeof" in value) return value;
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveIcons(item)]),
    );
  }
  return value;
}

/**
 * The components a `childrenExample` entry can name. Curated for the same
 * reason as EXAMPLE_ICONS: a runtime lookup over the whole registry would pull
 * every component into the client bundle.
 */
const CHILD_COMPONENTS: Record<string, ComponentType<DemoProps>> = {
  Avatar,
  Button,
  Checkbox,
  Toggle,
};

/**
 * Renders the children a schema declares. The snippet prints the same
 * declaration, so the code block and the preview cannot disagree.
 */
export function exampleChildren(meta: RegistryMeta): ReactNode {
  if (!meta.childrenExample) return meta.children;

  return meta.childrenExample.map((child, index) => {
    if (child.text !== undefined) {
      // A `<span>`, not a bare string: two bare strings in a flex column are
      // one anonymous flex item, and the snippet spells the span too.
      // biome-ignore lint/suspicious/noArrayIndexKey: position is the identity here
      return <span key={index}>{child.text}</span>;
    }
    const Child = child.component ? CHILD_COMPONENTS[child.component] : null;
    if (!Child) return null;
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: position is the identity here
      <Child key={index} {...(resolveIcons(child.props ?? {}) as DemoProps)}>
        {child.children}
      </Child>
    );
  });
}
