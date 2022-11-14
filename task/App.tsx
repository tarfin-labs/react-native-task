import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./src/Navigation";
import { ThemeProvider } from "./src/contexts/ThemeProvider/ThemeProvider";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
