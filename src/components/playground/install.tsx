"use client";

import { Menu } from "@base-ui/react/menu";
import { Check, NavArrowDown } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { NPM, Pnpm } from "@/components/icons/icons";

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
      <Menu.Trigger
        className="d-if ai-c g-1 w-fc max-w-32 bg-transparent bw-0 c-white/70 fs-sm td-none c-p h:c-white fv:oc-white fv:ow-2"
        aria-label="Install command"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" aria-hidden />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <span>Install</span>
            <NavArrowDown className="w-3 h-3" aria-hidden />
          </>
        )}
      </Menu.Trigger>
      <AnimatePresence>
        {open && (
          <Menu.Portal>
            <Menu.Positioner
              side="bottom"
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
