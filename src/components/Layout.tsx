import { useEffect, useState, type FC, type ReactNode } from "react";

import { OutdatedBanner } from "@/components/OutdatedBanner";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import storageUtil from "@/utils/storageUtil";
import { fetchAndSaveData } from "@/services/fetchAndSaveData";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {

  const APP_NAME = "Storm.Credit"
  const { user, logout } = useAuth();
  const router = useRouter();
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
      {isDataStale && (
        <OutdatedBanner
          onUpdate={handleUpdateData}
          // onIgnore={() => setDataAsUpdated()}
          isLoading={isLoading}
        />
      )}
      <header className="bg-gray-800 text-white">
        <div className="px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 px-3 h-5">
            <Badge variant="destructive" className="animate-pulse transform -rotate-12 text-xs ring-2 ring-red-500 ring-offset-2 ring-offset-gray-800">Beta</Badge>
            <h1 className="text-xl font-bold">{APP_NAME}
            </h1>
          </div>
          <div className="flex items-center space-x-4 px-3 h-5">
            {user ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Button onClick={() => router.push('/login')}>Login</Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center bg-gray-50 ">
        {children}
      </main>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
