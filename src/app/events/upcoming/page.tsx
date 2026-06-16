import type { Metadata } from "next";
import Image from "next/image";
import {
  upcomingActivities,
  regionalActivities,
  activityReviews,
} from "@/data/events";

export const metadata: Metadata = {
  title: "近期活動 - 靈鷲山朝聖之旅",
  description: "靈鷲山朝山近期活動、區會活動日期與活動回顧",
};

export default function UpcomingEventsPage() {
  return (
    <main className="min-h-screen relative">
      {/* 背景層 */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise1'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise1)' opacity='0.5' /%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* 主要內容 */}
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* 頁面標題 */}
          <div className="text-center mb-16">
            <p className="font-serif text-sm tracking-[0.3em] text-amber-700/80 mb-3">
              UPCOMING EVENTS
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 tracking-wide">
              近期活動
            </h1>
            <div className="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
          </div>

          {/* ===== 一、近期朝山活動 ===== */}
          <section className="mb-20">
            <SectionHeading title="近期朝山活動" en="Activities" />
            <div className="space-y-6">
              {upcomingActivities.map((a) => (
                <article
                  key={a.id}
                  className="group flex flex-col md:flex-row bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* 活動圖片 */}
                  <div className="relative w-full md:w-2/5 h-52 md:h-auto md:min-h-[15rem] overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  {/* 活動內容 */}
                  <div className="flex-1 p-6 md:p-8">
                    <span className="inline-block px-3 py-1 mb-3 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                      {a.date}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-stone-800 mb-2">
                      {a.title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-sm text-amber-800/80 mb-3">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {a.location}
                    </p>
                    <p className="text-base text-stone-700 leading-relaxed" style={{ letterSpacing: "0.02em" }}>
                      {a.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ===== 二、區會朝山活動日期 ===== */}
          <section className="mb-20">
            <SectionHeading title="區會朝山活動日期" en="Regional Schedule" />
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <ul className="divide-y divide-amber-200/70">
                {regionalActivities.map((r) => (
                  <li
                    key={r.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="font-serif text-lg font-bold text-stone-800 sm:w-32">
                      {r.region}
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-800 sm:flex-1">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {r.date}
                    </span>
                    <span className="text-stone-600 text-sm sm:text-right">{r.location}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ===== 三、朝山活動回顧 ===== */}
          <section className="mb-16">
            <SectionHeading title="朝山活動回顧" en="Past Highlights" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {activityReviews.map((v) => (
                <article
                  key={v.id}
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                      {v.date}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-stone-700 leading-relaxed">{v.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 報名提示 */}
          <div className="text-center">
            <p className="text-stone-600 mb-5">報名與詳細資訊，歡迎與我們聯繫</p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded-full font-medium bg-amber-600 text-white shadow-md transition-all duration-300 hover:bg-amber-700 hover:shadow-lg hover:-translate-y-0.5"
            >
              立即報名
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

// 區塊小標題元件
function SectionHeading({ title, en }: { title: string; en: string }) {
  return (
    <div className="flex items-end gap-3 mb-7">
      <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-amber-500 to-amber-700" />
      <div>
        <p className="font-serif text-xs tracking-[0.25em] text-amber-700/70 uppercase">{en}</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-800 leading-tight">
          {title}
        </h2>
      </div>
    </div>
  );
}
