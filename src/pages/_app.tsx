import '../styles/globals.css';
import { Providers } from '../context/Providers';
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { UserProvider, useUser } from "../context/UserContext";

import Layout from '@/components/Layout';
import { useEffect } from 'react';
import { User } from 'next-auth';
function SyncUserWithSession() {
  const { data: session } = useSession();
  const { setUser } = useUser();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user); // Sync session user with UserContext
    }
  }, [session, setUser]);

  return null;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Providers>
      <SessionProvider session={session}>
        <UserProvider>
          <Layout>
            <SyncUserWithSession />
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </SessionProvider>
    </Providers >
  );
}
