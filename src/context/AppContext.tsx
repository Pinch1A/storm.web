import React, { createContext, useState, useContext, ReactNode } from "react";
import { PossibleResultType, ProvinceItemType } from "@/types";
import { FormFields } from "@/schemas/calcForm.schema";

interface AppContextType {
  postalCode: ProvinceItemType | null;
  setPostalCode: (code: ProvinceItemType | null) => void;
  formData: FormFields | null;
  setFormData: (data: FormFields) => void;
  possibleResults: PossibleResultType[];
  setPossibleResults: (results: PossibleResultType[]) => void;
  selectedResults: PossibleResultType[];
  setSelectedResults: (results: PossibleResultType[]) => void;
  showSelectedResults: boolean;
  setShowSelectedResults: (show: boolean) => void;
  pickedOffer: PossibleResultType | null;
  setPickedOffer: (offer: PossibleResultType | null) => void;
  addPossibleResult: (result: PossibleResultType) => void;
  addSelectedResult: (result: PossibleResultType) => void;
  clearResults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [postalCode, setPostalCode] = useState<ProvinceItemType | null>(null);
  const [formData, setFormData] = useState<FormFields | null>(
    {
      amount: "",
      ltv: "",
      years: "",
      reddito: {
        amount: "", // Default value for reddito.amount
        type: "Monthly", // Default value for reddito.type
      },
      financialDebts: {
        amount: "", // Default value for financialDebts.amount
        type: "Monthly", // Default value for financialDebts.type
      },
    }
  );
  const [possibleResults, setPossibleResults] = useState<PossibleResultType[]>([]);
  const [selectedResults, setSelectedResults] = useState<PossibleResultType[]>([]);
  const [pickedOffer, setPickedOffer] = useState<PossibleResultType | null>(null);
  const [showSelectedResults, setShowSelectedResults] = useState(false);

  const addPossibleResult = (newResult: PossibleResultType) => {
    setPossibleResults((prevResults) =>
      [...prevResults, newResult].sort((a, b) => {
        const feeA = a.proposal?.[0]?.fee ?? Infinity;
        const feeB = b.proposal?.[0]?.fee ?? Infinity;
        return feeA - feeB;
      })
    );
  };

  const addSelectedResult = (newResult: PossibleResultType) => {
    setSelectedResults((prevResults) =>
      [...prevResults, newResult].sort((a, b) => {
        const feeA = a.proposal?.[0]?.fee ?? Infinity;
        const feeB = b.proposal?.[0]?.fee ?? Infinity;
        return feeA - feeB;
      })
    );
  };

  const clearResults = () => {
    setPossibleResults([]);
    setSelectedResults([]);
    setPickedOffer(null);
  };

  return (
    <AppContext.Provider
      value={{
        postalCode,
        setPostalCode,
        formData,
        setFormData,
        possibleResults,
        setPossibleResults,
        selectedResults,
        setSelectedResults,
        showSelectedResults,
        setShowSelectedResults,
        pickedOffer,
        setPickedOffer,
        addPossibleResult,
        addSelectedResult,
        clearResults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
