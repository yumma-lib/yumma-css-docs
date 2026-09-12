"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageEdit } from "@/icons";

export default function EditPage() {
  const pathname = usePathname();
  let contentPath = pathname.replace(/\/$/, "");
  if (
    contentPath.startsWith("/ui/components/") &&
    contentPath !== "/ui/components"
  ) {
    contentPath = `/ui/${contentPath.replace(/^\/ui\/components\//, "")}`;
  }
  // `main`, not `release`. The production branch was renamed; the old ref only
  // still resolves because GitHub 302-redirects a renamed branch.
  const url = `https://github.com/yummacss/docs/blob/main/src/content${contentPath}.mdx`;

  return (
    <Link
      href={url}
      className="d-if ai-c g-2 w-fc c-white/70 fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <PageEdit className="w-4 h-4" />
      Edit page
    </Link>
  );
}
