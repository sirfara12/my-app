import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const Analytics = () => {
  const router = useRouter();

  useEffect(() => {
    if (!gaId) return;

    const handleRouteChange = (url: string) => {
      if (typeof window.gtag !== "function") return;
      window.gtag("config", gaId, {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
};

export default Analytics;