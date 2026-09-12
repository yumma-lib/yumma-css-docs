"use client";

import { Button } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { lazy, type ReactNode, Suspense, useEffect, useState } from "react";
import { Github, Menu, Search, Xmark } from "@/icons";
import { YummaCSSDark } from "../icons/yummacss-dark";
import { SearchDialog } from "./search-dialog";

const MobileDialog = lazy(() => import("./mobile-dialog"));

const navbarVariants = cva("p-f ix-0 t-0 bbw-1", {
  variants: {
    variant: {
      default: "@lg:bf-b-md bc-border",
      transparent: "bc-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface NavbarProps extends VariantProps<typeof navbarVariants> {
  className?: string;
  links?: ReactNode;
  showMobileDrawer?: boolean;
}

export default function Navbar({
  variant,
  className,
  links,
  showMobileDrawer = false,
}: NavbarProps) {
  const pathname = usePathname();
  const isUI = pathname?.startsWith("/ui");
  const isLandingPage = pathname === "/";
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={clsx(
          navbarVariants({ variant }),
          className,
          "zi-10",
          isLandingPage ? "bg-transparent" : "bg-page",
        )}
      >
        <div className="mx-auto px-3 py-2 docs-container">
          <nav className="d-f ai-c jc-sb">
            <div className="d-f ai-c g-2">
              <Link href="/" className="fv:oc-white fv:ow-2">
                <YummaCSSDark className="d-b h-8 w-auto" />
              </Link>
            </div>

            <div className="d-f ai-c g-2 @sm:g-4">
              {links ? (
                links
              ) : (
                <div className="d-none ai-c g-8 @lg:d-f">
                  {[
                    { href: "/docs", label: "Docs", prefix: "/docs" },
                    { href: "/blog", label: "Blog", prefix: "/blog" },
                    {
                      href: "/ui/installation",
                      label: "Components",
                      prefix: "/ui",
                    },
                    {
                      href: "https://play.yummacss.com",
                      label: "Playground",
                      external: true,
                    },
                  ].map((link) => {
                    const isActive = link.prefix
                      ? pathname.startsWith(link.prefix)
                      : pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className={`fs-sm fv:oc-white fv:ow-2 ${
                          isActive
                            ? "c-accent td-u tds-d"
                            : "c-white/70 h:c-accent"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              )}

              <Button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="d-f ai-c jc-c g-2 h-8 px-3 bc-border bg-surface a:bg-surface-7 c-white bw-1 fs-sm bf-b-sm @lg:px-4 fv:oc-white fv:ow-2"
              >
                <Search className="w-4 h-4" />
                <kbd className="d-none c-white/70 fs-xs us-none @lg:d-b">
                  Ctrl + K
                </kbd>
              </Button>

              {showMobileDrawer && (
                <Button
                  type="button"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="d-f p-r ai-c jc-c h-8 px-3 bc-border bg-surface h:bg-surface-8 c-white bw-1 bf-b-sm @lg:d-none fv:oc-white fv:ow-2"
                  aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                >
                  <div className="d-f p-r ai-c jc-c w-4 h-4">
                    <Menu
                      className={`p-a w-4 h-4 ${isSidebarOpen ? "o-0" : "o-100"}`}
                    />
                    <Xmark
                      className={`p-a w-4 h-4 ${isSidebarOpen ? "o-100" : "o-0"}`}
                    />
                  </div>
                </Button>
              )}

              <div className="d-none ai-c g-4 ml-2 @md:d-f">
                <Link
                  href="https://github.com/yummacss/yummacss"
                  className="d-f ai-c g-1 c-white/70 fs-xs h:c-white fv:oc-white fv:ow-2"
                  target="_blank"
                >
                  <Github className="w-4 h-4 f-white/70" />
                  <span>GitHub</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {showMobileDrawer && (
        <Suspense fallback={null}>
          <MobileDialog
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            routeType={isUI ? "ui" : "docs"}
          />
        </Suspense>
      )}
    </>
  );
}
