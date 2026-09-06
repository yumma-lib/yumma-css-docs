"use client";

import { Toggle } from "@base-ui/react/toggle";
import { Eye, EyeClosed } from "iconoir-react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";
import Field from "./field";

export default function FieldPassword() {
  const [visible, setVisible] = useState(false);

  return (
    <Field
      label="Password"
      required
      type={visible ? "text" : "password"}
      placeholder="Enter password"
      description="Must be at least 8 characters"
      iconPosition="trailing"
      iconInteractive
      icon={
        <Toggle
          aria-label="Toggle password visibility"
          pressed={visible}
          onPressedChange={setVisible}
          className="d-f ai-c jc-c p-0 c-slate-6 us-none fv:oo-2 fv:oc-indigo-5"
          render={(props, state) => (
            <motion.button
              type="button"
              {...(props as HTMLMotionProps<"button">)}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {state.pressed ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeClosed className="w-4 h-4" />
              )}
            </motion.button>
          )}
        />
      }
    />
  );
}
