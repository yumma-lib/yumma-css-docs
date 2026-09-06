import { Button } from "@base-ui/react/button";
import { Search } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import Field from "./field";

export default function FieldButton() {
  return (
    <Field
      label="Search tasks"
      placeholder="Search tasks..."
      iconPosition="trailing"
      iconInteractive
      icon={
        <Button
          aria-label="Search"
          className="d-f ai-c jc-c w-8 h-8 bg-silver-1 c-slate-6 bw-0 br-lg us-none c-p h:bg-silver-2 h:c-slate-10 fv:oo-2 fv:oc-indigo-5"
          render={(props) => (
            <motion.button
              type="button"
              {...(props as HTMLMotionProps<"button">)}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          )}
        >
          <Search className="w-4 h-4" />
        </Button>
      }
    />
  );
}
