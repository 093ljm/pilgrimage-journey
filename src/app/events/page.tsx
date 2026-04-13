import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "最新活動 - 靈鷲山朝聖之旅",
  description: "靈鷲山朝山最新活動資訊與公告",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center pt-28">
      {/* 背景層 */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-amber-50 to-amber-100" />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            最新活動
          </h1>
          <p className="text-xl text-stone-600 mb-8">
            此頁面內容建設中...
          </p>
          <p className="text-stone-500">
            敬請期待靈鷲山最新活動資訊
          </p>
        </div>
      </div>
    </main>
  );
}
