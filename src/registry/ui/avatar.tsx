import { Avatar } from "@base-ui/react/avatar";
import { CheckCircle, User } from "iconoir-react";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "circle" | "square" | "squircle";
type Status = "none" | "online" | "offline" | "busy";
type Tint = "lime" | "cyan" | "indigo";

const ROOT = "d-if o-h ai-c jc-c va-m us-none";

const TINTS: Record<Tint, { bg: string; fg: string }> = {
  lime: { bg: "bg-lime-2 bc-lime-3", fg: "c-lime" },
  cyan: { bg: "bg-cyan-2 bc-cyan-3", fg: "c-cyan" },
  indigo: { bg: "bg-indigo-2 bc-indigo-3", fg: "c-indigo" },
};

const SIZES: Record<Size, string> = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-14 h-14",
};

const INITIAL_SIZES: Record<Size, string> = {
  sm: "fs-xs",
  md: "fs-md",
  lg: "fs-lg",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-7 h-7",
};

const BADGE_SIZES: Record<Size, string> = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-4 h-4",
};

const SHAPES: Record<Shape, string> = {
  circle: "br-9999",
  square: "br-0",
  // Unused: the squircle's radius depends on the size, so it is built inline.
  squircle: "cs-s",
};

/**
 * A squircle's radius has to scale with the avatar.
 *
 * A flat `1rem` was a third of the large avatar and exactly **half** of the
 * small one - and a radius at half the side is a circle, whatever
 * `corner-shape` says. Which is why `squircle` looked like `circle` wherever
 * avatars are small, the stack included. These hold roughly a quarter of the
 * side at every size.
 */
const SQUIRCLE_RADII: Record<Size, string> = {
  sm: "br-lg",
  md: "br-xl",
  lg: "br-xxl",
};

const STATUSES: Record<Exclude<Status, "none">, string> = {
  online: "bg-green-6",
  offline: "bg-slate-4",
  busy: "bg-red-6",
};

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: Size;
  shape?: Shape;
  status?: Status;
  verified?: boolean;
  fallback?: ReactNode;
  tint?: Tint;
  children?: ReactNode;
  className?: string;
}

export default function AvatarBase({
  src,
  name,
  size = "md",
  shape = "circle",
  status = "none",
  verified = false,
  fallback,
  tint,
  children,
  className,
}: AvatarProps) {
  const classes = merge(
    ROOT,
    SIZES[size],
    // One argument, not two: a separate radius would reach `merge` alongside
    // `br-9999` and `br-0` and silently drop one of them, which the
    // composition test catches even though the two cannot co-occur at runtime.
    shape === "squircle" ? `cs-s ${SQUIRCLE_RADII[size]}` : SHAPES[shape],
    tint ? `${TINTS[tint].bg} bw-1` : "bg-silver-1 bc-white bw-1",
    className,
  );

  const fallbackClasses = [
    "d-f ai-c jc-c w-100% h-100% fw-500",
    INITIAL_SIZES[size],
    tint ? TINTS[tint].fg : "c-slate-9",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // `w-fc`: the wrapper is a flex item in a column parent, where stretch made
    // it full width and took the corner badges with it.
    <span className="d-if p-r w-fc va-m">
      <Avatar.Root className={classes}>
        {src && (
          <Avatar.Image
            src={src}
            alt={name ?? ""}
            className="of-c w-100% h-100%"
          />
        )}
        <Avatar.Fallback className={fallbackClasses}>
          {fallback ??
            (name ? initials(name) : <User className={ICON_SIZES[size]} />)}
        </Avatar.Fallback>
      </Avatar.Root>

      {status !== "none" && (
        <span
          role="img"
          aria-label={status}
          className={`p-a b-0 r-0 bc-white br-9999 bw-2 ${BADGE_SIZES[size]} ${STATUSES[status]}`}
        />
      )}

      {verified && (
        <span
          role="img"
          aria-label="Verified"
          className={`d-f p-a t-0 r-0 ai-c jc-c bg-white bc-white br-9999 bw-1 ${BADGE_SIZES[size]}`}
        >
          <CheckCircle className="w-100% h-100% c-indigo" />
        </span>
      )}

      {children}
    </span>
  );
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
