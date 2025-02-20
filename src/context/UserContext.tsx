import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface UserContextType {
  user: SessionUser | null;
  setUser: (user: SessionUser) => void;
  loading: boolean;
}

interface SessionUser {
  id?: string;
  email?: string;
  name?: string;
  accessToken?: string;
  [key: string]: any; // Allow additional properties
}

interface CustomSession extends Session {
  user: SessionUser;
  accessToken?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: sessionData, status } = useSession();
  const session = sessionData as CustomSession | null; // Ensure correct type
  const [user, setUser] = useState<SessionUser | null>(session?.user || null);
  const [loading, setLoading] = useState(true);

  // Fetch additional user info from Keycloak's userinfo endpoint
  const fetchAdditionalUserInfo = async (accessToken: string) => {
    console.log("Fetching additional user info from:", accessToken);
    const EXTRA_USER_INFO_URL = `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect/userinfo`;
    console.log("Fetching additional user info from:", EXTRA_USER_INFO_URL);

    try {
      const response = await axios.get(EXTRA_USER_INFO_URL, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      console.log("Fetched user info from Keycloak:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching additional user info:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      if (status === "loading") return; // Wait until session is fully loaded

      if (session?.user && session.accessToken) {
        setLoading(true);

        console.log("Fetching additional user info from:", session.accessToken);
        try {
          const additionalUserInfo = await fetchAdditionalUserInfo(session.accessToken);
          if (additionalUserInfo) {
            setUser({ ...session.user, ...additionalUserInfo });
          } else {
            setUser(session.user); // Use only session user if additional info fails
          }
        } catch (error) {
          console.error("Failed to load additional user info:", error);
          setUser(session.user); // Fall back to session user
        }
      } else {
        setUser(null); // Reset user if no session
      }

      setLoading(false);
    };

    loadUserInfo();
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom Hook to use the UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
