import { signIn } from "next-auth/react";
import Head from "next/head";

const LoginPage = () => {

  // Optionally, if realm is missing, you might want to redirect or show an error.
  // useEffect(() => {
  //   if (!realm) {
  //     // You could redirect to a default page or show a message.
  //     console.warn("No realm found in URL. Please ensure the URL is in the format /[realm]/login");
  //   }
  // }, [realm]);

  const handleSignIn = async (realm: string) => {
    // if (!realm || typeof realm !== "string") {
    //   alert("Realm is not provided in the URL");
    //   return;
    // }
    // Redirect to /api/auth/signin?callbackUrl=/login?realm=... (or similar)
    // Here we pass the realm in the query string so our API route can build the issuer dynamically.
    console.log("handleSignIn", realm);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded shadow">
          <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
          <p className="mb-4 text-center">You are signing in for realm: <span className="font-semibold">master</span></p>
          <button
            onClick={() => handleSignIn("master")}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
          >
            Sign in with Keycloak
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
