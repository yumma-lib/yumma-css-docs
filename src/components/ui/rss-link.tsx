import Link from "next/link";
import { RssFeed } from "@/icons";

export default function RssLink() {
  return (
    <Link
      href="/blog/rss.xml"
      className="d-if ai-c g-2 w-fc c-white/70 fs-sm td-none h:c-white fv:oc-white fv:ow-2"
    >
      <RssFeed className="w-4 h-4" />
      RSS feed
    </Link>
  );
}
