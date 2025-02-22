import { useUser } from "@/context/UserContext";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
const LoginPage = () => {
  const { user } = useUser();
  const router = useRouter();
  // Optionally, if realm is missing, you might want to redirect or show an error.
  // useEffect(() => {
  //   if (!realm) {
  //     // You could redirect to a default page or show a message.
  //     console.warn("No realm found in URL. Please ensure the URL is in the format /[realm]/login");
  //   }
  // }, [realm]);

  useEffect(() => {
    if (user) {
      router.push("/province");
    }
  }, [user]);

  const handleSignIn = async (realm: string) => {
    // if (!realm || typeof realm !== "string") {
    //   alert("Realm is not provided in the URL");
    //   return;
    // }
    // Redirect to /api/auth/signin?callbackUrl=/login?realm=... (or similar)
    // Here we pass the realm in the query string so our API route can build the issuer dynamically.
    await signIn("keycloak", {
      realm: realm,
      callbackUrl: `/login?realm=master`,
    });
  };

  return (
    <>
      <Head>
        <title>Login </title>
      </Head>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-6">Accesso Necessario</h1>
        <p className="mb-4 text-center">Per accedere, devi essere registrato come cliente di Storm.Credit</p>
        <button
          onClick={() => handleSignIn("master")}
          className="px-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Accedi
        </button>
      </div>
    </>
  );
};

export default LoginPage;
