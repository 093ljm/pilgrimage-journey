"use client";

import { usePathname } from "next/navigation";
import { FloatingNav } from "@/components/ui/floating-nav";

// 內容管理後台需要整頁操作空間，因此不顯示前台導覽列。
export function SiteChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <FloatingNav />;
}
