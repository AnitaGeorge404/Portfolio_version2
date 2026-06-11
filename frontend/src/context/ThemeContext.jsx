import React, { createContext, useState, useEffect, useCallback } from "react";
import { themeTokens, getThemeCSSVariables } from "@/config/themeTokens";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("archive");
  const [isLoaded, setIsLoaded] = useState(false);

  // Apply theme to document root
  const applyTheme = useCallback((themeName) => {
    if (!themeTokens[themeName]) {
      themeName = "archive";
    }

    // Apply CSS variables to root element
    const variables = getThemeCSSVariables(themeName);
    Object.entries(variables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    // Set data attribute for theme-specific selectors
    document.documentElement.setAttribute("data-theme", themeName);
  }, []);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const initialTheme = savedTheme && themeTokens[savedTheme] ? savedTheme : "archive";
    
    setCurrentTheme(initialTheme);
    applyTheme(initialTheme);
    setIsLoaded(true);
  }, [applyTheme]);

  // Handle theme change
  const changeTheme = useCallback((themeName) => {
    if (!themeTokens[themeName]) {
      return;
    }

    setCurrentTheme(themeName);
    localStorage.setItem("portfolio-theme", themeName);
    applyTheme(themeName);

    // Emit custom event for components that need to react to theme changes
    window.dispatchEvent(new CustomEvent("themeChange", { detail: { theme: themeName } }));
  }, [applyTheme]);

  const value = {
    currentTheme,
    setTheme: changeTheme,
    theme: themeTokens[currentTheme],
    isLoaded,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to use theme context
 */
export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
