"use client";

import { allUis } from "content-collections";
import { usePathname } from "next/navigation";
import { PlaygroundProvider } from "@/components/playground/context";
import PlaygroundRail from "@/components/playground/rail";
import Sidebar from "@/components/ui/sidebar";
import TableOfContents from "@/components/ui/toc";
import { registryMeta } from "@/registry";

/** UI layout grid; third column is playground rail or TOC per route. */
export default function UIShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slug = (pathname || "")
    .replace(/^\/ui\/components\//, "")
    .replace(/^\/ui\//, "")
    .replace(/\/$/, "");
  const page = allUis.find((ui) => ui._meta.path === slug);
  const playground =
    page?.playground && Object.hasOwn(registryMeta, slug) ? slug : null;

  const grid = (
    <div className="d-g gtc-1 g-8 @lg:gtc-12">
      <Sidebar variant="ui" />

      <div
        className={`d-f fd-c pt-12 @lg:gc-s-6 ${
          playground ? "playground-column" : ""
        }`}
      >
        <article className="d-f fd-c f-1 min-h-0">{children}</article>
      </div>

      {playground ? <PlaygroundRail /> : <TableOfContents />}
    </div>
  );

  if (!playground) return grid;

  return <PlaygroundProvider id={playground}>{grid}</PlaygroundProvider>;
}
