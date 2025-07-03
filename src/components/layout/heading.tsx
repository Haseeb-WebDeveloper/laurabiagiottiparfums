"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  italic?: boolean;
}

export default function Heading({ title, className, as = "h1", italic = false }: HeadingProps) {
  // Split the title into words
  const words = title.split(" ").map((word, index) => ({
    word,
    id: `${word}-${index}`
  }));

  // Container animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, // Smoother stagger between words
        delayChildren: 0.03 * i, // Slightly faster initial delay
      },
    }),
  };

  // Word animation
  const wordAnimation = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20, // Increased damping for smoother motion
        stiffness: 180, // Reduced stiffness for gentler movement
        duration: 0.9, // Added duration for more controlled animation
        ease: "easeOut" // Smooth easing
      },
    },
    hidden: {
      opacity: 0,
      y: 30, // Reduced distance for smoother entry
      rotate: 5, // Reduced rotation for subtler effect
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 180,
        duration: 0.6,
        ease: "easeIn"
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-wrap", className)}
    >
      <div className="flex flex-wrap">
        {words.map(({ word, id }, index) => (
          <motion.span
            variants={wordAnimation}
            key={id}
            className={cn(
              "inline-block",
              "mr-[0.2em]",
              italic && index === words.length - 1 && "italic"
            )}
            style={{
              transformOrigin: "bottom",
              display: "inline-block",
              willChange: "transform", // Optimize performance
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </Component>
  );
}