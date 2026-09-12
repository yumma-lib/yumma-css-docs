import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import { NavArrowRight } from "@/icons";

const title = "Yumma CSS - Get faster at CSS while you use it";
const description =
  "Fixed scales for spacing, colors, type and radius. No arbitrary values to drift.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function Home() {
  return (
    <div className="p-r min-h-dvh c-white">
      <Navbar variant="transparent" />

      <div
        className="d-f p-r ai-fe w-100% mx-auto px-6 pb-16 @md:pb-0"
        style={{
          minHeight: "calc(100dvh - 120px)",
          maxWidth: "clamp(40rem, 80vw, 96rem)",
        }}
      >
        <div className="w-100% max-w-288">
          <div className="d-g g-12 ai-fe @lg:gtc-2">
            <div>
              <Link
                href="/ui/installation"
                className="d-if ai-c g-2 px-3 py-1 mb-6 bc-border bg-surface c-white/70 bw-1 fs-sm us-none h:c-white fv:oc-white fv:ow-2"
              >
                Yumma UI is here
                <NavArrowRight className="w-4 h-4" />
              </Link>

              <h1 className="mb-6 fs-4xl fw-400 lh-2 ff-e @md:fs-5xl @lg:fs-6xl">
                Get faster at CSS while you use it.
              </h1>
              <p className="mb-8 c-white/70 fs-md lh-5 @md:fs-lg">
                Fixed scales for spacing, colors, type and radius. No arbitrary
                values to drift.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <Link
                  href="/docs/installation"
                  className="px-6 py-3 bg-white c-black fs-md fw-600 us-none"
                >
                  Get started
                </Link>
                <a
                  href="https://play.yummacss.com"
                  className="px-6 py-3 c-white fw-600 fs-md us-none fv:oc-white fv:ow-2"
                >
                  Try now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
