import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "朝山網站內容管理",
  robots: { index: false, follow: false },
};

export default function ContentAdminPage() {
  return (
    <main>
      <noscript>內容管理後台需要啟用 JavaScript。</noscript>
      <Script
        src="https://unpkg.com/decap-cms@3.8.3/dist/decap-cms.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
