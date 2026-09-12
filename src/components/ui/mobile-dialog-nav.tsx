"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Xmark } from "@/icons";
import { YummaCSSDark } from "../icons/yummacss-dark";

interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

interface NavSection {
  title: string;
  _key?: string;
  items: NavItem[];
}

interface Props {
  sections: NavSection[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDialogNav({ sections, isOpen, onClose }: Props) {
  const pathname = usePathname();

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              }
              className="p-f zi-10 t-0 l-0 r-0 b-0 bg-black/60 bf-b-sm fgr-90"
            />

            <div className="d-f p-f zi-10 t-0 l-0 r-0 b-0 ai-s jc-fs pe-none @lg:d-none">
              <Dialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="o-h w-100% max-w-xs h-dvh bc-border bg-page brw-1 pe-auto"
              >
                <div className="d-f ai-c jc-sb px-3 py-2 bc-border bbw-1">
                  <div className="d-f ai-c g-2">
                    <Link href="/" className="fv:oc-white fv:ow-2">
                      <YummaCSSDark className="d-b h-8 w-auto" />
                    </Link>
                  </div>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="d-f ai-c jc-c h-8 px-3 bc-border bg-surface h:bg-surface-8 c-white bw-1 bf-b-sm fv:oc-white fv:ow-2"
                  >
                    <Xmark className="w-4 h-4" />
                  </Dialog.Close>
                </div>

                <div
                  className="d-f oy-auto ob-c fd-c g-8 px-4 py-4"
                  style={{ height: "calc(100dvh - 60px)" }}
                >
                  {sections.map((section) => {
                    const isTopNav = section.title === "__top-nav__";
                    const displayTitle = isTopNav
                      ? "Navigation"
                      : section.title;
                    const reactKey = section._key ?? section.title;

                    return (
                      <div key={reactKey} className="d-f fd-c g-3">
                        <h3 className="c-silver-8 fs-xs fw-600 ls-2 tt-u">
                          {displayTitle}
                        </h3>
                        <ul className="d-f fd-c g-1">
                          {section.items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                              <li key={item.href}>
                                <Dialog.Close
                                  nativeButton={false}
                                  render={
                                    <Link
                                      href={item.href}
                                      target={
                                        item.external ? "_blank" : undefined
                                      }
                                      rel={
                                        item.external
                                          ? "noopener noreferrer"
                                          : undefined
                                      }
                                    />
                                  }
                                  className={[
                                    "d-if ai-c g-3 w-100% py-2 px-3 fs-md us-none",
                                    "fv:oc-white fv:oo-2 fv:ow-2",
                                    isActive
                                      ? "c-white bg-border"
                                      : "c-white/70 h:c-white h:bg-white/5",
                                  ].join(" ")}
                                >
                                  {item.title}
                                </Dialog.Close>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
