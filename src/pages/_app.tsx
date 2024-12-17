import '../styles/globals.css'; // Your global styles
import { AuthProvider } from '../context/AuthContext';
import { Providers } from '../context/Providers'; // Combines AppProvider and ResultsProvider
import type { AppProps } from "next/app";
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </AuthProvider>
  );
}
