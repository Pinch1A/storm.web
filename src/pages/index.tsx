import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';

const HomePage = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/login');
  } else {
    router.push('/province');
  }

  return (
    <>
      <Head>
        <title>Storm.Credit - Home</title>
        <meta name="description" content="Welcome to Storm.Credit" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to Storm.Credit</h1>
        {
          user && (
            <>
              <p>
                Welcome {user.name}
              </p>
              <Link href={`${user.org}/calculator`}>
                Go to Calculator
              </Link>
            </>
          )
        }
      </main>
    </>
  );
};

export default HomePage;
