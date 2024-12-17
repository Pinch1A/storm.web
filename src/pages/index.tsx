
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import router from "next/router";

export default function IndexPage() {

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.push("/province");
    }
    router.push("/login");
  }, [user]);

  return <div>IndexPage</div>;
}
