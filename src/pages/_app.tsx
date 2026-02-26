import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/layouts/Navbar";
import AppShell from "@/components/layouts/appshell";
import "@/styles/globals.css"; 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      
      
      <Component {...pageProps} />

      <div>
        footer
      </div>
    </main>
  );
}
