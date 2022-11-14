import React from "react";

import ThemeContext from "./ThemeProvider";
import { ThemeOptions } from "./themeOptions.interface";

export const useThemeContext = (): ThemeOptions =>
  React.useContext(ThemeContext);
