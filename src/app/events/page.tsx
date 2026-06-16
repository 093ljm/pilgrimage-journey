import { redirect } from "next/navigation";

export default function EventsPage() {
  // 「最新活動」已改為下拉選單，預設導向近期活動
  redirect("/events/upcoming");
}
