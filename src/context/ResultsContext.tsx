import React, { createContext, useState, useContext, ReactNode } from "react";
import { PossibleResultType } from "@/types";

interface ResultsContextType {
  possibleResults: PossibleResultType[];
  setPossibleResults: (results: PossibleResultType[]) => void;
  selectedResults: PossibleResultType[];
  setSelectedResults: (results: PossibleResultType[]) => void;
  addPossibleResult: (result: PossibleResultType) => void;
  addSelectedResult: (result: PossibleResultType) => void;
  clearResults: () => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const useResultsContext = () => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error("useResultsContext must be used within a ResultsProvider");
  }
  return context;
};

export const ResultsProvider = ({ children }: { children: ReactNode }) => {
  const [possibleResults, setPossibleResults] = useState<PossibleResultType[]>([]);
  const [selectedResults, setSelectedResults] = useState<PossibleResultType[]>([]);

  const addPossibleResult = (newResult: PossibleResultType) => {
    setPossibleResults((prevResults) => [...prevResults, newResult]);
  };

  const addSelectedResult = (newResult: PossibleResultType) => {
    setSelectedResults((prevResults) => [...prevResults, newResult]);
  };

  const clearResults = () => {
    setPossibleResults([]);
    setSelectedResults([]);
  };

  return (
    <ResultsContext.Provider
      value={{
        possibleResults,
        setPossibleResults,
        selectedResults,
        setSelectedResults,
        addPossibleResult,
        addSelectedResult,
        clearResults,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};
