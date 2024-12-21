// components/Layout.tsx

import { useEffect, useState, type FC, type ReactNode } from "react";
import { OutdatedBanner } from "@/components/OutdatedBanner";
import storageUtil from "@/utils/storageUtil";
import { fetchAndSaveData } from "@/services/fetchAndSaveData";
import Navbar from "@/components/Navbar";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const APP_NAME = "Storm.Credit";
  const [isLoading, setIsLoading] = useState(false);
  const [isDataStale, setIsDataStale] = useState(false);

  useEffect(() => {
    // Check if data timestamp is stale (1 hour)
    const lastFetched = storageUtil.getTimestamp("dataTimestamp");
    const isStale = !lastFetched || Date.now() - lastFetched > 3600 * 1000;

    if (isStale) {
      setIsDataStale(true);
    }
  }, []);

  const handleUpdateData = async () => {
    // Refetch province as it's the main data
    await fetchAndSaveData("province");

    // Fetch other dependent data
    await fetchAndSaveData("product");
    await fetchAndSaveData("sussistenza");

    setIsDataStale(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {isDataStale && (
        <OutdatedBanner
          onUpdate={handleUpdateData}
          isLoading={isLoading}
        />
      )}
      <main className="flex-1 flex items-center justify-center bg-gray-50 h-full">
        {children}
      </main>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
