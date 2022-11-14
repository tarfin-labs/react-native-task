import React from "react";

import { useThemeContext } from "./hooks";

describe("ThemeProvider Hooks", () => {
  it("useContext should return theme options", () => {
    const themeOptions = {
      theme: {
        colors: {
          primary: "#333B65",
          secondary: "#FFC90B",
          light: "#FFFFFF",
        },
      },
    };
    jest.spyOn(React, "useContext").mockImplementation(() => themeOptions);

    const result = useThemeContext();

    expect(themeOptions).toBe(result);
  });
});
