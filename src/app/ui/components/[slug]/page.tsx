import { allUis } from "content-collections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import Pagination from "@/components/ui/pagination";
import { getUINavigation } from "@/utils/pagination";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ui = allUis.find((u) => u._meta.path === slug);
  const url = `https://yummacss.com/ui/components/${slug}`;

  return {
    title: ui?.title || "Yumma UI",
    description: ui?.description || "",
    alternates: { canonical: url },
    openGraph: {
      title: ui?.title,
      description: ui?.description,
      url,
      images: [
        {
          url: "/ui-og.png",
          width: 1200,
          height: 630,
          alt: ui?.title || "Yumma UI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ui?.title,
      description: ui?.description,
      images: ["/ui-og.png"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ui = allUis.find((u) => u._meta.path === slug);
  // `dynamicParams = false` means an unknown slug 404s before reaching here, so
  // this never fires - but a `!` would throw a render error rather than a 404
  // the day that stops being true.
  if (!ui) notFound();
  const MDXContent = ui.mdx;
  const navigation = getUINavigation(slug);

  return (
    <div className="mb-16">
      {ui && (
        <div className="my-8" data-meta>
          <div className="d-f ai-c jc-sb mb-2">
            <h1 className="min-w-0 c-white fs-4xl fw-400 ow-bw">{ui.title}</h1>
            <div className="d-f fs-0 ai-c g-2">
              {/* Install lives in the stage's tab bar now: here it competed
                  with the title for the widest line on the page. */}
              <Pagination
                previous={navigation.previous}
                next={navigation.next}
                basePath="/ui/components"
              />
            </div>
          </div>
          {ui.description && (
            <p className="c-white/70 fs-lg">{ui.description}</p>
          )}
          {/* Below the description: installing is the one thing a reader does
              here that is not looking. Prose pages under this route share the
              layout & have nothing to install. */}
          {ui.playground && (
            <div className="mt-3">
              <Install id={getRegistryTarget(slug).install} />
            </div>
          )}
        </div>
      )}
      <MDXContent />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://yummacss.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "UI Components",
              item: "https://yummacss.com/ui",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: ui?.title || slug,
              item: `https://yummacss.com/ui/components/${slug}`,
            },
          ],
        }}
      />
    </div>
  );
}

export function generateStaticParams() {
  return allUis
    .filter((ui) => ui._meta.path !== "components")
    .map((ui) => ({ slug: ui._meta.path }));
}

export const dynamicParams = false;
