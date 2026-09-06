import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildMap, format, render } from "../scripts/generate-merge-map.mjs";
import { ym } from "../src/registry/ui/ym";
import { rootDir } from "./helpers";

describe("ym", () => {
  // The three conflicts measured in the built CSS, where the later class in the
  // attribute loses to whichever sits later in the stylesheet.
  it("lets the last class win", () => {
    expect(ym("c-white c-accent")).toBe("c-accent");
    expect(ym("bg-indigo bg-red-5")).toBe("bg-red-5");
    expect(ym("px-8 p-4")).toBe("p-4");
  });

  // The case an overlap test gets wrong: px says nothing about the block axis.
  it("keeps a class the later one does not fully cover", () => {
    expect(ym("p-4 px-8")).toBe("p-4 px-8");
    expect(ym("m-2 mx-4")).toBe("m-2 mx-4");
    // mx and my together cover every side, so m-2 really is redundant.
    expect(ym("m-2 mx-4 my-6")).toBe("mx-4 my-6");
  });

  // `c` is color and cursor, `p` padding and position. Separator sets
  // `c-slate-10` and `c-p` on one element, so a prefix-only map breaks it.
  it("tells apart utilities that share a prefix", () => {
    expect(ym("c-slate-10 c-p")).toBe("c-slate-10 c-p");
    expect(ym("p-4 p-a")).toBe("p-4 p-a");
    expect(ym("c-white c-p c-accent")).toBe("c-p c-accent");
  });

  it("keeps variants apart", () => {
    expect(ym("h:c-white c-accent")).toBe("h:c-white c-accent");
    expect(ym("h:c-white h:c-accent")).toBe("h:c-accent");
    expect(ym("sm:px-4 px-8")).toBe("sm:px-4 px-8");
  });

  it("passes through anything it does not recognise", () => {
    expect(ym("not-a-class c-accent")).toBe("not-a-class c-accent");
    expect(ym("admonition-body invisible")).toBe("admonition-body invisible");
  });

  it("takes the arguments a className prop arrives in", () => {
    expect(ym("d-f ai-c", false, undefined, "c-accent")).toBe(
      "d-f ai-c c-accent",
    );
    expect(ym("", null)).toBe("");
    expect(ym("  d-f   ai-c  ")).toBe("d-f ai-c");
  });

  it("leaves a class list with no conflicts alone", () => {
    const classes = "d-f ai-c jc-c g-2 p-4 br-lg bw-1 fs-sm fw-500";
    expect(ym(classes)).toBe(classes);
  });

  it("has a merge-map that is current with core", () => {
    const onDisk = readFileSync(
      join(rootDir, "src/registry/ui/merge-map.ts"),
      "utf-8",
    );
    expect(onDisk.trim()).toBe(format(render(buildMap())).trim());
  });
});
