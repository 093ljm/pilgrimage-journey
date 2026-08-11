import { redirect } from "next/navigation";

export default function EventsPage() {
  // 「最新活動」為下拉選單，預設導向活動資訊
  redirect("/events/info");
}
