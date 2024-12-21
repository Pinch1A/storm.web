// pages/login/index.tsx

'use client';

import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login'); // Redirect to Auth0's hosted login
    } else if (user) {
      router.push('/'); // Redirect to home if already logged in
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {isLoading && <p>Loading...</p>}
      {!isLoading && !user && <p>Redirecting to login...</p>}
    </div>
  );
};

export default LoginPage;
