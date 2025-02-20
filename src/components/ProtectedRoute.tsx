'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to the login page
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
