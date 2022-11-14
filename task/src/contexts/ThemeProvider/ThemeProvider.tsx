import React, { createContext } from "react";

import { ThemeOptions } from "./themeOptions.interface";
import { ThemeOptionsData } from "./themeOptionsData";

const ThemeContext = createContext<ThemeOptions>(ThemeOptionsData);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={ThemeOptionsData}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
