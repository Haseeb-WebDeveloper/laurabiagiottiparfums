"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

interface NavbarAppearanceState {
  transparent: boolean;
  fixed: boolean; // kept for backward compatibility
  position?: "fixed" | "absolute" | "static";
}

interface NavbarAppearanceContextValue extends NavbarAppearanceState {
  setAppearance: (next: Partial<NavbarAppearanceState>) => void;
  resetAppearance: () => void;
}

const defaultState: NavbarAppearanceState = {
  transparent: false,
  fixed: true,
  position: "fixed",
};

const NavbarAppearanceContext = createContext<NavbarAppearanceContextValue | null>(
  null
);

export function NavbarAppearanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<NavbarAppearanceState>(defaultState);

  const value = useMemo<NavbarAppearanceContextValue>(() => ({
    transparent: state.transparent,
    fixed: state.fixed,
    position: state.position,
    setAppearance: (next) =>
      setState((prev) => ({ ...prev, ...next })),
    resetAppearance: () => setState(defaultState),
  }), [state]);

  return (
    <NavbarAppearanceContext.Provider value={value}>
      {children}
    </NavbarAppearanceContext.Provider>
  );
}

export function useNavbarAppearance() {
  const ctx = useContext(NavbarAppearanceContext);
  if (!ctx) {
    throw new Error("useNavbarAppearance must be used within NavbarAppearanceProvider");
  }
  return ctx;
}


