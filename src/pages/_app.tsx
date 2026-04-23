// import type { AppProps } from "next/app";
// import Navbar from "@/components/layouts/Navbar";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Navbar />
      
//       <Component {...pageProps} />

//       <footer className="bg-gray-900 text-white text-center py-4">
//         footer
//       </footer>
//     </>
//   );
// }

//import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/appshell";
import Navbar from "@/components/layouts/Navbar";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";


const Analytics = dynamic(() => import('@/components/analytics/analytics'), { ssr: false });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Analytics />
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
  );
};