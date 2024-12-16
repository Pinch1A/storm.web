import '../styles/globals.css'; // Your global styles
import { AuthProvider } from '../context/AuthContext';
import { AppProvider } from '../context/AppContext';
import { DataProvider } from '../context/DataContext';
import type { AppProps } from "next/app";
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <DataProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DataProvider>
      </AppProvider>
    </AuthProvider>
  );
}
