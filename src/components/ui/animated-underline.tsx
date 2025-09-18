"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedUnderlineProps = {
  isActive: boolean;
  className?: string;
  activeWidth?: string | number;
  inactiveWidth?: string | number;
  activeHeight?: number;
  inactiveHeight?: number;
  activeOpacity?: number;
  inactiveOpacity?: number;
  transitionDuration?: number;
  expandDuration?: number;
  shrinkDuration?: number;
};

export default function AnimatedUnderline({
  isActive,
  className,
  activeWidth = "100%",
  inactiveWidth = 0,
  activeHeight = 1,
  inactiveHeight = 2,
  activeOpacity = 1,
  inactiveOpacity = 0,
  transitionDuration = 0.4,
  expandDuration,
  shrinkDuration = 0.2,
}: AnimatedUnderlineProps) {
  const widthDuration = isActive
    ? expandDuration ?? transitionDuration
    : shrinkDuration;

  return (
    <motion.div
      initial={{ width: 0, height: inactiveHeight, opacity: inactiveOpacity }}
      animate={
        isActive
          ? {
              width: activeWidth,
              height: activeHeight,
              opacity: activeOpacity,
              transition: {
                width: { duration: widthDuration, ease: "easeInOut" },
                height: { delay: 0.3, duration: 0.2 },
              },
            }
          : {
              width: inactiveWidth,
              height: inactiveHeight,
              opacity: inactiveOpacity,
              transition: { duration: shrinkDuration },
            }
      }
      className={cn(
        "absolute z-[200] -bottom-[4px] left-0 bg-foreground",
        className
      )}
    />
  );
}


