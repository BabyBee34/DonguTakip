import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { selectSettings } from "../store/selectors";
import type { ThemeMode } from "../types/app";
import { darkTheme, lightTheme, ThemeTokens } from "./tokens";

type ThemeContextValue = {
  theme: ThemeTokens;
  mode: ThemeMode;
};

const ThemeContext = createContext<ThemeContextValue>({ theme: lightTheme, mode: "light" });

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const settings = useAppSelector(selectSettings);
  const mode: ThemeMode = settings?.theme ?? "light";

  const tokens = mode === "dark" ? darkTheme : lightTheme;

  const value = useMemo<ThemeContextValue>(() => ({ theme: tokens, mode }), [tokens, mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext).theme;
export const useThemeMode = () => useContext(ThemeContext).mode;
