"use client";

import { useEffect, useState } from "react";

/**
 * Cold-start fallback only. Delayed so brief loads do not flash a spinner;
 * hold-previous pagination should avoid this path after the first frame.
 */
export default function PreviewSpinner({
  delayMs = 200,
}: {
  delayMs?: number;
}) {
  const [visible, setVisible] = useState(delayMs <= 0);

  useEffect(() => {
    if (delayMs <= 0) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const id = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);

  return (
    <div
      role="status"
      aria-label="Loading preview"
      className={`preview-spinner w-5 h-5 ${visible ? "v-v" : "v-h"}`}
    />
  );
}
