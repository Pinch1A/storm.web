// components/Layout.tsx

import { useState, type FC, type ReactNode } from "react";
import { OutdatedBanner } from "@/components/OutdatedBanner";
import { fetchAndSaveData } from "@/services/fetchAndSaveData";
import Navbar from "@/components/Navbar";
import { useUser } from "@/context/UserContext";
import { useAppContext } from "@/context/AppContext";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const APP_NAME = "Storm.Credit";
  const [isLoading, setIsLoading] = useState(false);
  const { isDataStale, setIsDataStale } = useAppContext();
  const { user } = useUser();

  // useEffect(() => {
  //   checkDataStale();
  // }, []);

  const handleUpdateData = async () => {
    // Refetch province as it's the main data
    setIsLoading(true);
    await fetchAndSaveData("province");

    // Fetch other dependent data
    await fetchAndSaveData("product");
    await fetchAndSaveData("sussistenza");

    setIsLoading(false);
    setIsDataStale(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {isDataStale && user && (
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
