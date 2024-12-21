// pages/index.tsx

import Head from 'next/head';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>MyApp - Home</title>
        <meta name="description" content="Welcome to MyApp!" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to MyApp!</h1>
        <p className="text-lg mb-6 text-center text-gray-700">
          This is the home page of your Next.js application integrated with Auth0 for authentication.
        </p>
        <div className="flex space-x-4">
          <Link href="/province">
            {/* <a className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"> */}
            View Province
            {/* </a> */}
          </Link>
          <Link href="/calculator">
            {/* <a className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"> */}
            Go to Calculator
            {/* </a> */}
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;
