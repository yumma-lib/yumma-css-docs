"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "@/icons";

/**
 * Linked as a file rather than an anchor.
 *
 * Keep a Changelog headings read `## [3.0.0] - 2025-04-14`, so the GitHub
 * fragment carries the release date too & cannot be derived from the version
 * alone. Linking the file lands the reader on a document already ordered by
 * release.
 */
const CHANGELOG_URL =
  "https://github.com/yummacss/yummacss/blob/main/CHANGELOG.md";

export default function ChangelogLink() {
  const pathname = usePathname();

  if (!pathname?.startsWith("/blog")) {
    return null;
  }

  return (
    <Link
      href={CHANGELOG_URL}
      target="_blank"
      rel="noreferrer"
      className="d-if ai-c g-2 w-fc c-white/70 fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <Github className="w-4 h-4" />
      View the changelog
    </Link>
  );
}
