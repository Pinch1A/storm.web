import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ProvinceItemType, FormFields } from "@/types";
import storageUtil from "@/utils/storageUtil";

interface AppContextType {
  postalCode: ProvinceItemType | null;
  setPostalCode: (code: ProvinceItemType | null) => void;
  formData: FormFields;
  setFormData: (data: FormFields) => void;
  clearAppData: () => void;
  isLoading: boolean;
  isDataStale: boolean;
  checkDataStale: () => void;
  setIsDataStale: (isDataStale: boolean) => void;
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
  const [isDataStale, setIsDataStale] = useState(false);
  const [formData, setFormData] = useState<FormFields>({
    amount: "",
    ltv: "",
    years: "",
    reddito: { amount: "", type: "Monthly" },
    financialDebts: { amount: "", type: "Monthly" },
  });

  const checkDataStale = () => {
    const lastFetched = storageUtil.getTimestamp("dataTimestamp");
    const isStale = !lastFetched || Date.now() - lastFetched > 3600 * 1000;

    if (isStale) {
      setIsDataStale(true);
    }
  }

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

  useEffect(() => {
    console.log('>> isDataStale changed to: ', isDataStale);
  }, [isDataStale])

  useEffect(() => {
    checkDataStale();
  }, []);

  return (
    <AppContext.Provider value={{
      postalCode,
      setPostalCode,
      formData,
      setFormData,
      clearAppData,
      isLoading,
      isDataStale,
      checkDataStale,
      setIsDataStale
    }}>
      {children}
    </AppContext.Provider>
  );
};
