// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { StorageManager } from '@/utils/storage/dataManager';
// // const DATA_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
// const DATA_EXPIRY_TIME = 60 * 1000; // 1 minute in milliseconds

// interface DataContextType {
//   isDataOutdated: boolean;
//   setDataAsUpdated: () => void;
// }

// const DataContext = createContext<DataContextType | undefined>(undefined);

// export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isDataOutdated, setIsDataOutdated] = useState(false);

//   useEffect(() => {
//     // TODO: check if the data is outdated
//     const checkDataExpiration = async () => {
//       const isDataExpired = await StorageManager.provinces.isDataExpired();
//       setIsDataOutdated(isDataExpired);
//     };

//     checkDataExpiration();

//     const interval = setInterval(checkDataExpiration, 60 * 1000); // Check every minute
//     return () => clearInterval(interval);
//   }, []);

//   const setDataAsUpdated = () => {
//     setIsDataOutdated(false);
//   };

//   return (
//     <DataContext.Provider value={{ isDataOutdated, setDataAsUpdated }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useDataContext = () => {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error('useDataContext must be used within a DataProvider');
//   }
//   return context;
// };
