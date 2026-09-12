"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Page } from "@/icons";

export default function ViewMarkdown() {
  const pathname = usePathname();
  let mdPath = pathname.replace(/\/$/, "");

  if (mdPath.startsWith("/ui/components/") && mdPath !== "/ui/components") {
    const slug = mdPath.replace(/^\/ui\/components\//, "");
    mdPath = `/ui/components/${slug}.md`;
  } else if (mdPath.startsWith("/docs/") && mdPath !== "/docs") {
    const slug = mdPath.replace(/^\/docs\//, "");
    mdPath = `/docs/${slug}.md`;
  } else {
    return null;
  }

  return (
    <Link
      href={mdPath}
      className="d-if ai-c g-2 w-fc c-white/70 fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <Page className="w-4 h-4" />
      View markdown
    </Link>
  );
}
