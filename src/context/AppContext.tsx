import React, { createContext, useState, useContext, ReactNode } from "react";
import { ProvinceItemType, FormFields } from "@/types";

interface AppContextType {
  postalCode: ProvinceItemType | null;
  setPostalCode: (code: ProvinceItemType | null) => void;
  formData: FormFields;
  setFormData: (data: FormFields) => void;
  clearAppData: () => void;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormFields>({
    amount: "",
    ltv: "",
    years: "",
    reddito: { amount: "", type: "Monthly" },
    financialDebts: { amount: "", type: "Monthly" },
  });

  const clearAppData = () => {
    setIsLoading(true);
    setPostalCode(null);
    setFormData({
      amount: "",
      ltv: "",
      years: "",
      reddito: { amount: "", type: "Monthly" },
      financialDebts: { amount: "", type: "Monthly" },
    });
    setIsLoading(false);
  };

  return (
    <AppContext.Provider value={{
      postalCode,
      setPostalCode,
      formData,
      setFormData,
      clearAppData,
      isLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
};
