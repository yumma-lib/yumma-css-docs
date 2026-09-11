"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { Tabs } from "@base-ui/react/tabs";
import { ArrowLeft, ArrowRight, Check, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Indicator = "count" | "progress" | "dots";
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

/** Keyed on Base UI's own transition attributes, which is what it waits for. */
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

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i-md",
  outset: "bs-o-sm",
};

const CONTROL_BASE =
  "d-f ai-c jc-c w-8 h-8 bw-1 tp-c tdu-150 ttf-io us-none fv:oo-2 fv:oc-indigo-5";

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
  dismissible?: boolean;
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
  dismissible = false,
  shape = "rounded",
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
  const allTasksDone = !step.tasks || doneCount >= step.tasks.length;

  const hasAnyTasks = steps.some((s) => (s.tasks?.length ?? 0) > 0);

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
    "bg-white d-if ai-c g-2 px-3 py-2 bc-silver-2 c-slate-10 bw-1 fw-500 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:oo-2 fv:oc-indigo-5",
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
      {step.tasks && step.tasks.length > 0 && (
        <div className="d-f fd-c g-2 w-100% pt-2 ta-l">
          {step.tasks.map((task) => {
            const isChecked = checked[page]?.has(task.id) ?? false;
            return (
              <Button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`d-f ai-c g-2 px-3 py-2 w-100% br-lg bw-0 fs-sm ta-l us-none c-p fv:oo-2 fv:oc-indigo-5 ${
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
          {dismissible && (
            <AlertDialog.Close
              render={
                <Button className="d-f p-a l-3 t-3 ai-c jc-c w-7 h-7 p-0 c-slate-6 bw-0 br-9999 h:bg-silver-1/50 h:c-slate-7 fv:oo-2 fv:oc-indigo-5" />
              }
              aria-label="Skip"
            >
              <Xmark aria-hidden className="w-4 h-4" />
            </AlertDialog.Close>
          )}

          {indicator !== "dots" && (
            <div className="d-f ai-c jc-sb px-8 pt-5">
              <span className="c-slate-5 fs-xs">
                {indicator === "count" ? `${page + 1} / ${steps.length}` : ""}
              </span>
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
            <div
              className={`d-f o-h fd-c ai-c ta-c ${hasAnyTasks ? "" : "jc-c h-48"}`}
            >
              {animated ? (
                <AnimatePresence
                  mode={hasAnyTasks ? "popLayout" : "wait"}
                  custom={direction}
                >
                  <motion.div
                    key={page}
                    custom={direction}
                    layout={hasAnyTasks || undefined}
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
                className={`d-f ai-c jc-c w-8 h-8 bw-0 br-lg us-none fv:oo--1 fv:oc-indigo-5 ${
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
                        `d-f ai-c jc-c w-4 h-4 br-9999 bw-0 us-none c-p fv:oo--1 fv:oc-indigo-5 ${
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
                  className={`d-f ai-c jc-c w-8 h-8 bw-0 br-lg us-none fv:oo--1 fv:oc-indigo-5 ${
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
      {/* Base UI hides the popup as soon as `getAnimations()` finds nothing,
          and Motion's animation never registers there - so the exit played on
          an element that was already `display:none`. CSS transitions do
          register. The inner `AnimatePresence` further down is a different
          thing: it moves between steps while the popup stays open. */}
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
