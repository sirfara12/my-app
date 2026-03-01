import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/layouts/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      
      <Component {...pageProps} />

      <footer className="bg-gray-900 text-white text-center py-4">
        footer
      </footer>
    </>
  );
}