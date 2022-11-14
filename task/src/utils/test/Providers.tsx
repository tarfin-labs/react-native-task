import React from "react";

import { ThemeProvider } from "../../contexts/ThemeProvider/ThemeProvider";
const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

export default Providers;
