import type { Metadata } from "next";
import { DecapAdmin } from "@/components/admin/decap-admin";

export const metadata: Metadata = {
  title: "內容管理操作示範",
  robots: { index: false, follow: false },
};

export default function ContentAdminDemoPage() {
  return (
    <main>
      <noscript>操作示範需要啟用 JavaScript。</noscript>
      <DecapAdmin demo />
    </main>
  );
}
