"use client";

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <LoadingSpinner />
        <p className="text-foreground/70 text-sm">Loading...</p>
      </motion.div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="relative h-12 w-12">
      <motion.div
        className="absolute inset-0 rounded-full border-t-2 border-primary"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute inset-1 rounded-full border-t-2 border-primary/60"
        animate={{ rotate: -180 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
} 