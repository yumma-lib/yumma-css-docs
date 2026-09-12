"use client";

import { Menu } from "@base-ui/react/menu";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { NPM, Pnpm } from "@/components/icons/icons";
import { Check, Download } from "@/icons";

const MANAGERS = {
  pnpm: { command: (id: string) => `pnpm dlx yummaui add ${id}`, Mark: Pnpm },
  npm: { command: (id: string) => `npx yummaui add ${id}`, Mark: NPM },
} as const;

type Manager = keyof typeof MANAGERS;

/** Copies a `yummaui add` command; menu picks the package manager. */
export default function Install({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<Manager | null>(null);

  const copy = async (manager: Manager) => {
    try {
      await navigator.clipboard.writeText(MANAGERS[manager].command(id));
    } catch {
      return;
    }
    setCopied(manager);
    setTimeout(() => setCopied(null), 2000);
  };

  const popup = (
    <Menu.Popup className="p-1 oy-auto w-fc max-w-32 max-h-40 bc-border bg-surface bw-1">
      {(Object.keys(MANAGERS) as Manager[]).map((manager) => (
        <Menu.Item
          key={manager}
          onClick={() => copy(manager)}
          className={(state) =>
            `d-f ai-c g-2 px-2 py-1 ff-m fs-xs c-p us-none ${
              state.highlighted ? "bg-border c-accent" : "c-accent-dim"
            }`
          }
        >
          {(() => {
            const { Mark } = MANAGERS[manager];
            return <Mark className="fs-0 w-4 h-4" />;
          })()}
          {manager}
        </Menu.Item>
      ))}
    </Menu.Popup>
  );

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      {/* A square the size of the pagination arrows beside it, so the corner
          reads as one group of page actions rather than a button and a pair.
          An icon alone does not say "install", hence the title as well as the
          label: the tooltip is the word. */}
      <Menu.Trigger
        className="d-f ai-c jc-c fs-0 w-8 h-8 bc-border bg-surface a:bg-surface-7 c-accent bw-1 c-p fv:oc-white fv:oo-2"
        aria-label="Install command"
        title="Install"
      >
        {copied ? (
          <Check className="w-4 h-4" aria-hidden />
        ) : (
          <Download className="w-4 h-4" aria-hidden />
        )}
      </Menu.Trigger>
      <AnimatePresence>
        {open && (
          <Menu.Portal>
            <Menu.Positioner
              side="bottom"
              align="end"
              sideOffset={4}
              collisionAvoidance={{ side: "none", fallbackAxisSide: "none" }}
              className="zi-50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {popup}
              </motion.div>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  );
}
