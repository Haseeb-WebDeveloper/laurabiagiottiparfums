"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"


export const getTheme = (isDark: boolean) => {
    const { setTheme } = useTheme()

    useEffect(() => {
        setTheme(isDark ? "dark" : "light")
    }, [isDark])

  if (isDark) {
    return "dark";
  }
  return "light";
};

