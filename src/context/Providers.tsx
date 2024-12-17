import { AppProvider } from "@/context/AppContext";
import { ResultsProvider } from "@/context/ResultsContext";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => (
  <AppProvider>
    <ResultsProvider>{children}</ResultsProvider>
  </AppProvider>
);
