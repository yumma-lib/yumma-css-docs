"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

/**
 * A preview in its own document.
 *
 * A component rendered straight into this page shares its document, which is
 * how a modal's backdrop came to cover the controls that drive it: Base UI
 * portals to `document.body` and marks the rest inert, and "the rest" was the
 * whole site. Inside a frame, `body` is the frame's body, so the backdrop
 * covers the preview and nothing else.
 *
 * It also stops the docs' own styling reaching the component. That reset used
 * to be a screenful of `[data-preview]`, `[role="dialog"]`, `[class*="-popup"]`
 * selectors in `globals.css`, all of it there because portalled elements land
 * outside the preview container & inherit from the page instead. A frame has
 * no outside.
 *
 * One React tree throughout: the children are portalled in, so context, state
 * and event handlers cross the boundary exactly as they would in place.
 */

/**
 * Everything the component needs, and nothing the docs chrome brings.
 *
 * `html` and `body` are pinned to the frame's height so the content can be
 * centred in it. The measured element is the root below, never the body:
 * measuring a body that fills its frame and then sizing the frame from that
 * measurement is a loop, and the frames grew to 1400px before this was split.
 */
const RESET = `
  html, body { height: 100%; }
  html { color-scheme: light; }
  body {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif;
  }
  /* Full width, and centring its own child rather than leaning on the body:
     a component asking for 100% of its container needs a container with a
     width. A separator got 0 of a shrink-to-fit root and drew nothing. */
  #root {
    box-sizing: border-box;
    width: 100%;
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* Height is the same story but only safe on a frame that has one of its own.
     An auto-height frame is sized *from* this element, so handing a percentage
     back would be the loop described above. */
  #root[data-fill] { height: 100%; }
`;

/**
 * The page's CSS as text, read once and shared by every frame.
 *
 * Cloning the `<link>` elements was the obvious way & it makes each frame
 * re-request the stylesheet and every font file behind it. Same-origin sheets
 * can be read instead, so a frame costs one parse and no network at all. The
 * fonts are never fetched: nothing inside a frame asks for them.
 */
let sheet: string | null = null;

function pageStyles(): string {
  if (sheet !== null) return sheet;

  const parts: string[] = [];
  for (const style of document.styleSheets) {
    try {
      for (const rule of style.cssRules) parts.push(rule.cssText);
    } catch {
      // Cross-origin, so its rules cannot be read. Nothing the components use
      // is served that way, and a missing rule is better than a thrown frame.
    }
  }

  sheet = parts.join("\n");
  return sheet;
}

/**
 * The frame's root, for a component that portals.
 *
 * Base UI resolves a portal against the top-level `document.body`, not the
 * document its trigger happens to be in, so a modal opened inside a frame
 * still lands on the page & still covers the controls driving it. Its Portal
 * parts take a `container`, and this is how the preview finds one to pass.
 */
const ContainerContext = createContext<HTMLElement | null>(null);

export function usePreviewContainer() {
  return useContext(ContainerContext);
}

interface Props {
  children: ReactNode;
  /**
   * Room for the component before its own height is known, and the floor it
   * keeps afterwards. A CSS length rather than a number so the stage can ask
   * for whatever the viewport leaves it.
   */
  minHeight?: number | string;
  /**
   * Take the height a flex parent gives instead of growing to the content.
   * A percentage would have to resolve against a flex item, so the frame
   * becomes a flex child of its own holder rather than asking for `100%`.
   */
  fill?: boolean;
  className?: string;
}

export default function PreviewFrame({
  children,
  minHeight = 240,
  fill = false,
  className = "",
}: Props) {
  const holder = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  // A page can carry seven previews. Building seven documents before the
  // reader has scrolled to the second one is the cost this avoids.
  const [near, setNear] = useState(false);
  const [body, setBody] = useState<HTMLElement | null>(null);
  // What the content measures. The floor is applied as `min-height` in CSS,
  // which is what lets it be a `calc()` the browser resolves rather than a
  // number this component would have to work out for itself.
  const [measured, setMeasured] = useState(0);

  useEffect(() => {
    const element = holder.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    const element = frame.current;
    if (!element) return;

    const attach = () => {
      const target = element.contentDocument;
      if (!target?.body) return;
      if (target.getElementById("root")) return;

      const page = target.createElement("style");
      page.textContent = pageStyles();
      const base = target.createElement("style");
      base.textContent = RESET;
      target.head.append(page, base);

      const root = target.createElement("div");
      root.id = "root";
      if (fill) root.dataset.fill = "";
      target.body.append(root);

      setBody(root);
    };

    // Same-origin `about:blank` is usually ready on mount, but Safari resolves
    // it a tick later, so both paths are covered.
    attach();
    element.addEventListener("load", attach);
    return () => element.removeEventListener("load", attach);
  }, [near, fill]);

  useEffect(() => {
    if (!body || fill) return;

    const measure = () => setMeasured(Math.ceil(body.scrollHeight));

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(body);
    return () => observer.disconnect();
  }, [body, fill]);

  return (
    <div
      ref={holder}
      className={`${fill ? "d-f fd-c" : ""} ${className}`}
      style={{ minHeight }}
    >
      {near && (
        <iframe
          ref={frame}
          title="Component preview"
          // No `src`: the document is built here rather than fetched, which is
          // what keeps a frame cheaper than a page.
          className={`d-b w-100% bw-0 ${fill ? "f-1 min-h-0" : ""}`}
          style={fill ? undefined : { height: measured, minHeight }}
        />
      )}
      {/* Outside the element, not between its tags: the portal renders into
          the frame's body, and an `<iframe>` with React children would put
          them in the host document instead. */}
      {body &&
        createPortal(
          <ContainerContext value={body}>{children}</ContainerContext>,
          body,
        )}
    </div>
  );
}
