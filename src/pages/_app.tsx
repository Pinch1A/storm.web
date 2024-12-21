import '../styles/globals.css';
import { Providers } from '../context/Providers';
import type { AppProps } from "next/app";
import Layout from '@/components/Layout';
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </Providers >
  );
}
