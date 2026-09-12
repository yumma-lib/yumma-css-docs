"use client";

import { Button } from "@base-ui/react";
import { Dialog } from "@base-ui/react/dialog";
import { Input } from "@base-ui/react/input";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ComponentSolid,
  LogOut,
  LongArrowDownLeftSolid,
  NavArrowDown,
  NavArrowUp,
  OpenBook,
  Search,
} from "@/icons";
import { getBorderColor } from "@/utils/colors";
import {
  CATEGORY_LABELS,
  filterSearchResults,
  groupByCategory,
  type SearchItem,
} from "@/utils/search-data";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredResults = useMemo(() => filterSearchResults(query), [query]);
  const groupedResults = useMemo(
    () => groupByCategory(filteredResults),
    [filteredResults],
  );
  const flatResults = useMemo(() => {
    const ordered: SearchItem[] = [];
    for (const category of Object.keys(CATEGORY_LABELS)) {
      const items = groupedResults[category];
      if (items) {
        ordered.push(...items);
      }
    }
    return ordered;
  }, [groupedResults]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setCopiedColor(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, flatResults.length - 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter": {
          e.preventDefault();
          const selected = flatResults[selectedIndex];
          if (selected) {
            if (selected.category === "colors" && selected.color) {
              navigator.clipboard.writeText(selected.color.toUpperCase());
              setCopiedColor(selected.title);
              setTimeout(() => setCopiedColor(null), 1500);
            } else {
              router.push(selected.path);
              onClose();
            }
          }
          break;
        }
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [flatResults, selectedIndex, router, onClose],
  );

  useEffect(() => {
    if (listRef.current && flatResults.length > 0) {
      const items = listRef.current.querySelectorAll("[data-search-item]");
      const selected = items[selectedIndex] as HTMLElement | undefined;
      selected?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, flatResults.length]);

  const handleItemClick = (item: SearchItem, index: number) => {
    if (item.category === "colors" && item.color) {
      navigator.clipboard.writeText(item.color.toUpperCase());
      setCopiedColor(item.title);
      setTimeout(() => setCopiedColor(null), 1500);
    } else {
      router.push(item.path);
      onClose();
    }
    setSelectedIndex(index);
  };

  const getCategoryIcon = (category: string) => {
    if (category === "docs") {
      return <OpenBook className="w-4 h-4 c-white/50" />;
    }
    if (category === "handbook") {
      return <OpenBook className="w-4 h-4 c-white/50" />;
    }
    return <ComponentSolid className="w-4 h-4 c-white/50" />;
  };

  let globalIndex = -1;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AnimatePresence>
        {open && (
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
            <div className="d-f p-f zi-10 t-0 l-0 r-0 b-0 ai-fs jc-c pt-12 pe-none @md:ai-c @md:pt-0">
              <Dialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                }
                className="o-h w-100% max-w-xs bc-border bg-page bw-1 pe-auto"
                style={{
                  maxHeight: "70vh",
                }}
                onKeyDown={handleKeyDown}
              >
                <div className="d-f ai-c g-3 px-4 py-3 bc-border bbw-1">
                  <Search className="w-5 h-5 c-white" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search documentation…"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    autoFocus
                    className="f-1 bg-transparent c-white os-none fs-md"
                  />
                </div>

                <div
                  ref={listRef}
                  className="oy-auto ob-c px-2 py-2"
                  style={{ maxHeight: "calc(70vh - 120px)" }}
                >
                  {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
                    const items = groupedResults[category];
                    if (!items || items.length === 0) return null;

                    return (
                      <div key={category} className="mb-2">
                        <div className="px-2 py-1 c-white fs-xs tt-u ls-3">
                          {label}
                        </div>
                        {items.map((item) => {
                          globalIndex++;
                          const currentIndex = globalIndex;
                          const isSelected = selectedIndex === currentIndex;
                          const isColorCopied = copiedColor === item.title;

                          return (
                            <Button
                              key={`${item.path}-${item.title}`}
                              data-search-item
                              type="button"
                              onClick={() =>
                                handleItemClick(item, currentIndex)
                              }
                              onMouseEnter={() =>
                                setSelectedIndex(currentIndex)
                              }
                              className={`d-f b-0 ai-c g-3 w-100% px-3 py-2 ta-l c-p ${
                                isSelected ? "bg-border" : "bg-transparent"
                              }`}
                            >
                              {item.category === "colors" && item.color ? (
                                <div
                                  className="fs-0 w-4 h-4"
                                  style={{
                                    backgroundColor: item.color,
                                    border: getBorderColor(item.color),
                                  }}
                                />
                              ) : (
                                getCategoryIcon(item.category)
                              )}

                              <div className="f-1 min-w-0">
                                <div className="o-h c-white fs-md tw-n to-e ws-nw">
                                  {item.title}
                                </div>
                                {item.description && (
                                  <div className="o-h c-white/50 fs-xs tw-n to-e ws-nw">
                                    {item.category === "colors" && isColorCopied
                                      ? "Copied!"
                                      : item.description}
                                  </div>
                                )}
                              </div>

                              {isSelected && (
                                <LongArrowDownLeftSolid className="fs-0 w-4 h-4 c-white/50" />
                              )}
                            </Button>
                          );
                        })}
                      </div>
                    );
                  })}

                  {flatResults.length === 0 && (
                    <div className="px-4 py-8 c-white/50 ta-c fs-md">
                      No results found for "{query}"
                    </div>
                  )}
                </div>

                <div className="d-f ai-c jc-sb px-4 py-2 bc-border c-white/40 btw-1 fs-xs">
                  <div className="d-f ai-c g-4">
                    <span className="d-f ai-c g-1">
                      <kbd className="d-f ai-c p-1 bc-border bg-transparent bw-1">
                        <NavArrowUp className="w-4 h-4" />
                      </kbd>
                      <kbd className="d-f ai-c p-1 bc-border bg-transparent bw-1">
                        <NavArrowDown className="w-4 h-4" />
                      </kbd>
                      <span className="ml-1 fs-md">to navigate</span>
                    </span>
                    <span className="d-f ai-c g-1">
                      <kbd className="d-f ai-c p-1 bc-border bg-transparent bw-1">
                        <LongArrowDownLeftSolid className="w-4 h-4" />
                      </kbd>
                      <span className="ml-1 fs-md">to select</span>
                    </span>
                  </div>
                  <span className="d-f ai-c g-1">
                    <kbd className="d-f ai-c p-1 bc-border bg-transparent bw-1">
                      <LogOut className="w-4 h-4" />
                    </kbd>
                    <span className="ml-1 fs-md">to close</span>
                  </span>
                </div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
