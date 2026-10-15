import type { Metadata } from "next";
import { RegistrationsList } from "@/components/admin/registrations-list";

export const metadata: Metadata = {
  title: "朝山報名名單 - 內容管理",
  robots: { index: false, follow: false },
};

export default function RegistrationsAdminPage() {
  return <RegistrationsList />;
}
