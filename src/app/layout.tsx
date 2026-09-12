import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import JsonLd from "@/components/json-ld";

const description =
  "Fixed scales for spacing, colors, type and radius. No arbitrary values to drift.";

export const metadata: Metadata = {
  title: {
    default: "Yumma CSS - Get faster at CSS while you use it",
    template: "%s · Yumma CSS",
  },
  description,
  keywords: [
    "utility css",
    "css framework",
    "derived class names",
    "css-native",
    "utility classes",
  ],
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL("https://yummacss.com"),
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yumma CSS - Get faster at CSS while you use it",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yumma CSS - Get faster at CSS while you use it",
    description,
    images: ["/og.png"],
  },
  other: {
    llms: "/llms.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="cs-d sb-s spt-20 s::bg-accent-dim/10"
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body className="bg-page">
        <NuqsAdapter>{children}</NuqsAdapter>
        <Analytics />
        <SpeedInsights />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Yumma CSS",
            url: "https://yummacss.com",
            description,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Yumma CSS",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            description,
            url: "https://yummacss.com",
          }}
        />
      </body>
    </html>
  );
}
