"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { Tabs } from "@base-ui/react/tabs";
import { ArrowLeft, ArrowRight, Check, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Indicator = "count" | "progress" | "dots" | "checklist";
type IconPosition = "leading" | "trailing";
type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br-xxl",
  square: "",
  squircle: "br-3xl cs-s",
};

const CONTROL_SHAPES: Record<Shape, string> = {
  rounded: "br-lg",
  square: "",
  squircle: "br-xxl cs-s",
};

/** Base UI waits on `getAnimations()`, which never sees Motion. See NOTES.md. */
const ONBOARDING_MOTION = `
  .yui-onboarding-pop {
    transition: opacity 200ms ease-out, scale 200ms ease-out;
  }
  .yui-onboarding-pop[data-starting-style],
  .yui-onboarding-pop[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
  .yui-onboarding-fade {
    transition: opacity 200ms ease-out;
  }
  .yui-onboarding-fade[data-starting-style],
  .yui-onboarding-fade[data-ending-style] {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-onboarding-pop,
    .yui-onboarding-fade { transition: none; }
  }
`;

const CLOSE_SHAPES: Record<Shape, string> = {
  rounded: "br-9999",
  square: "",
  squircle: "br-lg cs-s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const CONTROL_BASE =
  "d-f ai-c jc-c w-8 h-8 bw-1 tp-c tdu-150 ttf-io us-none fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3";

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
};

export interface OnboardingTask {
  id: string;
  label: string;
}

export interface OnboardingStep {
  icon: ReactNode;
  title: string;
  description: string;
  tasks?: OnboardingTask[];
}

export interface OnboardingProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else - inside a frame,
   * or inside a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  trigger: ReactNode;
  triggerIcon?: ReactNode;
  iconPosition?: IconPosition;
  steps: OnboardingStep[];
  indicator?: Indicator;
  showClose?: boolean;
  /** Does nothing while `animated` is not set. */
  animatedResize?: boolean;
  shape?: Shape;
  shadow?: Shadow;
  animated?: boolean;
  className?: string;
}

export default function OnboardingBase({
  trigger,
  triggerIcon,
  iconPosition = "leading",
  steps,
  indicator = "count",
  showClose = false,
  animatedResize = true,
  shape = "square",
  shadow = "none",
  animated = true,
  className,
  container,
}: OnboardingProps) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [checked, setChecked] = useState<Record<number, Set<string>>>({});

  const step = steps[page];
  const isFirst = page === 0;
  const isLast = page === steps.length - 1;
  const doneCount = checked[page]?.size ?? 0;

  // Tasks belong to the checklist indicator. A step can carry them under any
  // other indicator and they stay out of the way, gate and all.
  const showTasks = indicator === "checklist";
  const tasks = showTasks ? step.tasks : undefined;
  const allTasksDone = !tasks || doneCount >= tasks.length;

  // `layout` animates with transforms, which move nothing around them, so the
  // popup jumped while the slide eased inside it. A measured height is the
  // only kind the popup follows.
  const resizes = animated && animatedResize;
  const watcher = useRef<ResizeObserver | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  const contentRef = useCallback(
    (node: HTMLDivElement | null) => {
      watcher.current?.disconnect();
      if (!node || !resizes) {
        setContentHeight(null);
        return;
      }
      const measure = () => setContentHeight(node.offsetHeight);
      measure();
      watcher.current = new ResizeObserver(measure);
      watcher.current.observe(node);
    },
    [resizes],
  );

  const go = (next: number) => {
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  const toggleTask = (taskId: string) => {
    setChecked((prev) => {
      const next = new Set(prev[page] ?? []);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return { ...prev, [page]: next };
    });
  };

  const triggerClasses = merge(
    "bg-white d-if ai-c g-2 px-3 py-2 bc-silver-2 c-slate-10 bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3",
    CONTROL_SHAPES[shape],
    className,
  );

  const popupClasses = [
    "o-h p-r w-96 bg-white bc-silver-2 c-slate-10 bw-1",
    POPUP_SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const backClasses = [
    CONTROL_BASE,
    CONTROL_SHAPES[shape],
    "bg-white bc-silver-2 c-slate-10 h:bg-silver-1/50",
  ].join(" ");

  const forwardClasses = [
    CONTROL_BASE,
    CONTROL_SHAPES[shape],
    allTasksDone
      ? "bg-indigo h:bg-indigo-8 bc-indigo-7 c-white"
      : "bg-silver-1 bc-silver-2 c-slate-4",
  ].join(" ");

  const slide = (
    <div className="d-f fd-c ai-c g-3">
      <div className="d-ib p-r">
        <div className="p-a l--3 h-12 w-12 bg-white/70 bc-silver-2 bw-1 br-xl ro--3 tty-1" />
        <div className="p-a r--3 h-12 w-12 bg-white/70 bc-silver-2 bw-1 br-xl ro-3 tty-1" />
        <div className="d-f p-r ai-c jc-c h-14 w-14 bg-white bc-silver-2 bw-1 br-xl">
          {step.icon}
        </div>
      </div>
      <span className="c-slate-10 fs-md fw-500">{step.title}</span>
      <p className="m-0 c-slate-6 fs-sm lh-4">{step.description}</p>
      {tasks && tasks.length > 0 && (
        <div className="d-f fd-c g-2 w-100% pt-2 ta-l">
          {tasks.map((task) => {
            const isChecked = checked[page]?.has(task.id) ?? false;
            return (
              <Button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`d-f ai-c g-2 px-3 py-2 w-100% br-lg bw-0 fs-sm ta-l us-none c-p fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3 ${
                  isChecked ? "bg-green-1/30" : "bg-silver-1/50"
                }`}
              >
                <div
                  className={`d-f ai-c jc-c w-4 h-4 br-sm bw-1 fs-0 ${
                    isChecked
                      ? "bg-green bc-green-5 c-white bw-0"
                      : "bc-silver-3"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3" />}
                </div>
                <span className={isChecked ? "c-green-7" : "c-slate-10"}>
                  {task.label}
                </span>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );

  const closeButton = (position: string) => (
    <AlertDialog.Close
      render={
        <Button
          className={`d-f ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 ${CLOSE_SHAPES[shape]} h:bg-silver-1/50 h:c-slate-7 fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3 ${position}`}
        />
      }
      aria-label="Skip"
    >
      <Xmark aria-hidden className="w-4 h-4" />
    </AlertDialog.Close>
  );

  const popup = (
    <AlertDialog.Portal container={container} keepMounted>
      <AlertDialog.Backdrop
        className={`p-f i-0 min-h-dvh bg-black/5 bf-b-xs ${animated ? "yui-onboarding-fade" : ""}`}
      />
      <AlertDialog.Viewport className="d-f p-f i-0 ai-c jc-c">
        <AlertDialog.Popup
          className={`${popupClasses} ${animated ? "yui-onboarding-pop" : ""}`}
          style={{ maxWidth: "90vw" }}
        >
          {showClose && indicator === "dots" && closeButton("p-a l-3 t-3")}

          {indicator !== "dots" && (
            <div className="d-f ai-c jc-sb px-8 pt-5">
              {/* The skip button rides in the header rather than over it. Sat
                  absolute, it landed on top of the "1 / 3". */}
              <div className="d-f ai-c g-2">
                {showClose && closeButton("")}
                {indicator === "count" && (
                  <span className="c-slate-5 fs-xs">
                    {page + 1} / {steps.length}
                  </span>
                )}
                {indicator === "checklist" && (
                  <span className="c-slate-5 fs-xs">
                    {/* A step with nothing to tick reports the tour instead. */}
                    {tasks?.length
                      ? `${doneCount} / ${tasks.length} done`
                      : `${page + 1} / ${steps.length}`}
                  </span>
                )}
              </div>
              <div className="d-f g-2">
                {!isFirst && (
                  <Button onClick={() => go(page - 1)} className={backClasses}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                {isLast ? (
                  <AlertDialog.Close
                    render={<Button className={forwardClasses} />}
                  >
                    <Check className="w-4 h-4" />
                  </AlertDialog.Close>
                ) : (
                  <Button
                    onClick={() => go(page + 1)}
                    disabled={!allTasksDone}
                    className={forwardClasses}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="px-8 pt-4 pb-10">
            {/* `layout` belongs to the box that changes height, not the slide
                inside it: on the slide it eased the content while the popup
                jumped. `popLayout` takes the outgoing slide out of flow so the
                height this animates to is the incoming one. */}
            <motion.div
              initial={false}
              animate={
                resizes && contentHeight !== null
                  ? { height: contentHeight }
                  : { height: "auto" }
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="d-f p-r o-h fd-c jc-c"
            >
              <div ref={contentRef} className="d-f fd-c ai-c w-100% ta-c">
                {animated ? (
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={page}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="d-f fd-c ai-c g-3"
                    >
                      {slide}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  slide
                )}
              </div>
            </motion.div>
          </div>

          {indicator === "progress" && (
            <div className="d-f jc-c pb-6">
              <div className="p-r o-h w-32 h-1 bg-silver-2 br-9999">
                <motion.div
                  className="p-a l-0 t-0 h-100% bg-indigo br-9999"
                  initial={false}
                  animate={{
                    width: `${((page + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {indicator === "dots" && (
            <div className="d-f ai-c jc-c g-4 pb-8">
              <Button
                onClick={() => go(page - 1)}
                disabled={isFirst}
                className={`d-f ai-c jc-c w-8 h-8 bw-0 br-lg us-none fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3 ${
                  isFirst
                    ? "c-slate-3"
                    : "c-slate-6 h:bg-silver-1 h:c-slate-10 c-p"
                }`}
                aria-label="Previous"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Tabs.Root
                value={String(page)}
                onValueChange={(v) => go(Number(v))}
              >
                <Tabs.List className="d-f g-2 jc-c">
                  {steps.map((_, index) => (
                    <Tabs.Tab
                      key={String(index)}
                      value={String(index)}
                      className={(state) =>
                        `d-f ai-c jc-c w-4 h-4 br-9999 bw-0 us-none c-p fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3 ${
                          state.active ? "bg-indigo" : "bg-silver-2"
                        }`
                      }
                    />
                  ))}
                </Tabs.List>
              </Tabs.Root>
              {isLast ? (
                <AlertDialog.Close
                  render={<Button className={forwardClasses} />}
                >
                  <Check className="w-4 h-4" />
                </AlertDialog.Close>
              ) : (
                <Button
                  onClick={() => go(page + 1)}
                  disabled={!allTasksDone}
                  className={`d-f ai-c jc-c w-8 h-8 bw-0 br-lg us-none fv:os-s fv:ow-3 fv:oo-0 fv:oc-indigo-2/60 fv:bc-indigo-3 ${
                    allTasksDone
                      ? "c-slate-6 h:bg-silver-1 h:c-slate-10 c-p"
                      : "c-slate-3"
                  }`}
                  aria-label="Next"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </AlertDialog.Popup>
      </AlertDialog.Viewport>
    </AlertDialog.Portal>
  );

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setPage(0);
          setDirection(0);
          setChecked({});
        }
      }}
    >
      <style href="yumma-ui-onboarding-motion" precedence="default">
        {ONBOARDING_MOTION}
      </style>

      <AlertDialog.Trigger render={<Button className={triggerClasses} />}>
        {triggerIcon && iconPosition === "leading" && triggerIcon}
        <span>{trigger}</span>
        {triggerIcon && iconPosition === "trailing" && triggerIcon}
      </AlertDialog.Trigger>

      {popup}
    </AlertDialog.Root>
  );
}
