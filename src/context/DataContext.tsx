import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTimestamp } from '@/utils/storageUtil';

// const DATA_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
const DATA_EXPIRY_TIME = 60 * 1000; // 1 minute in milliseconds

interface DataContextType {
  isDataOutdated: boolean;
  setDataAsUpdated: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDataOutdated, setIsDataOutdated] = useState(false);

  useEffect(() => {
    const checkDataExpiration = async () => {
      const lastUpdatedTimestamp = await getTimestamp();
      const currentTime = Date.now();

      if (lastUpdatedTimestamp) {
        setIsDataOutdated(currentTime - lastUpdatedTimestamp > DATA_EXPIRY_TIME);
      } else {
        setIsDataOutdated(true);
      }
    };

    checkDataExpiration();

    const interval = setInterval(checkDataExpiration, 60 * 1000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const setDataAsUpdated = () => {
    setIsDataOutdated(false);
  };

  return (
    <DataContext.Provider value={{ isDataOutdated, setDataAsUpdated }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
