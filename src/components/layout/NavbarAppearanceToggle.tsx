"use client";

import { useEffect } from "react";
import { useNavbarAppearance } from "./navbar-appearance-context";

export default function NavbarAppearanceToggle({
  transparent = true,
  fixed = false,
  position,
}: {
  transparent?: boolean;
  fixed?: boolean;
  position?: "fixed" | "absolute" | "static";
}) {
  const { setAppearance, resetAppearance } = useNavbarAppearance();

  useEffect(() => {
    setAppearance({ transparent, fixed, position });
    return () => resetAppearance();
  }, [transparent, fixed, position, setAppearance, resetAppearance]);

  return null;
}


