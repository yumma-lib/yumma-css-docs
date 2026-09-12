"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { useState } from "react";
import { Folder, NavArrowDown, NavArrowRight, Page } from "@/icons";

interface Entry {
  name: string;
  /**
   * Defaults to a file. Set for directories, with or without children.
   */
  folder?: boolean;
  /**
   * Draws attention to the entry the surrounding prose is about.
   */
  highlight?: boolean;
  /**
   * Collapsed on first render. Expanded by default.
   */
  collapsed?: boolean;
  children?: Entry[];
}

interface Props {
  data: Entry[];
}

const ICON = "fs-0 w-4 h-4";

function Label({ entry, isFolder }: { entry: Entry; isFolder: boolean }) {
  return (
    <>
      {isFolder ? (
        <Folder className={`${ICON} c-white/40`} />
      ) : (
        <Page className={`${ICON} c-white/40`} />
      )}
      <span className="fs-sm ff-m">{entry.name}</span>
    </>
  );
}

function Node({ entry }: { entry: Entry }) {
  const hasChildren = Boolean(entry.children?.length);

  const [open, setOpen] = useState(!entry.collapsed);
  const isFolder = entry.folder || hasChildren;
  const tone = entry.highlight ? "c-accent" : "c-white/80";

  if (!hasChildren) {
    return (
      // Spacer keeps leaf icons aligned with the folder rows above them.
      <span className={`d-f ai-c g-2 py-1 ${tone}`}>
        <span aria-hidden="true" className="d-b fs-0 w-4" />
        <Label entry={entry} isFolder={isFolder} />
      </span>
    );
  }

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger
        className={`d-f ai-c g-2 w-100% py-1 bg-transparent bw-0 ta-l c-p tdu-150 ttf-io h:c-white fv:c-accent ${tone}`}
      >
        {open ? (
          <NavArrowDown className={`${ICON} c-white/40`} />
        ) : (
          <NavArrowRight className={`${ICON} c-white/40`} />
        )}
        <Label entry={entry} isFolder={isFolder} />
      </Collapsible.Trigger>

      {/* Indent only. A left border here lands directly under the caret &
          reads as a line growing out of the icon. */}
      <Collapsible.Panel className="ml-2 pl-4">
        {entry.children?.map((child) => (
          <Node key={child.name} entry={child} />
        ))}
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

export default function FileTree({ data }: Props) {
  return (
    <div className="my-6 p-4 bg-surface">
      {data.map((entry) => (
        <Node key={entry.name} entry={entry} />
      ))}
    </div>
  );
}
