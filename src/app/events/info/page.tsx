import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PilgrimageDays } from "@/components/ui/pilgrimage-days";
import {
  annualPilgrimageDays,
  pilgrimageInfo,
  specialEvents,
  pilgrimageGroup,
  hallsDirectory,
  activityReviews,
} from "@/data/events";

export const metadata: Metadata = {
  title: "活動資訊 - 靈鷲山朝聖之旅",
  description:
    "靈鷲山「觀音三會」大願之路——誕辰日、成道日、出家日，一年三次回到心靈聖山，至心禮敬觀音菩薩。集合地點：無生道場地藏廣場前。含各區會朝山資訊與活動回顧。",
};

export default function EventsInfoPage() {
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
              ACTIVITY INFORMATION
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 tracking-wide">
              活動資訊
            </h1>
            <div className="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
          </div>

          {/* ===== 一、觀音三會 ===== */}
          <section className="mb-20">
            {/* 區塊標題 */}
            <div className="text-center mb-9">
              <p className="font-serif text-xs tracking-[0.3em] text-amber-700/70 mb-3">
                GUANYIN THREE ASSEMBLIES
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 tracking-wide">
                觀音三會
              </h2>
              <p className="mt-3 font-serif text-base md:text-lg text-amber-800/80 tracking-[0.25em]">
                大願之路
              </p>
            </div>

            {/* 引言 */}
            <div className="text-center max-w-2xl mx-auto mb-11">
              <p
                className="text-base md:text-lg text-stone-700 leading-loose"
                style={{ letterSpacing: "0.03em" }}
              >
                一年三次，讓我們回到心靈聖山，
                <br className="sm:hidden" />
                至心虔誠禮敬觀音菩薩。
                <br />
                步步頂禮，澄澈自心，回到本來。
                <br />
                在山海間，相遇菩薩與自己。
              </p>

              <div className="my-8 mx-auto w-12 h-px bg-amber-600/40" />

              <p className="font-serif text-xl md:text-2xl font-bold text-amber-900 leading-relaxed tracking-wide">
                靈鷲山「觀音三會」大願之路
                <br className="sm:hidden" />
                <span className="hidden sm:inline">，</span>
                我們不見不散
              </p>
            </div>

            {/* 三個朝山日（含智慧狀態顯示） */}
            <PilgrimageDays days={annualPilgrimageDays} />

            {/* 日期訂定說明 */}
            <p className="mb-7 text-sm text-stone-600 leading-relaxed">
              ※ 三會日期依農曆觀音誕辰、成道、出家日訂定，並調整於週末舉行，方便十方信眾共同參與。
            </p>

            {/* 地點與報名方式 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-7 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 集合地點 */}
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-amber-800/70 mb-1">集合地點</p>
                    <p className="font-medium text-stone-800 leading-relaxed">
                      {pilgrimageInfo.location}
                    </p>
                  </div>
                </div>

                {/* 報名方式 */}
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-amber-800/70 mb-1">報名方式</p>
                    <p className="text-stone-800 leading-relaxed">
                      {pilgrimageInfo.registerVia}
                    </p>
                    <p className="text-stone-700 leading-relaxed">
                      或電洽{" "}
                      <a
                        href={`tel:${pilgrimageInfo.phone}`}
                        className="font-medium text-amber-700 underline underline-offset-2 transition-colors hover:text-amber-900"
                      >
                        {pilgrimageInfo.phone}
                      </a>{" "}
                      分機 {pilgrimageInfo.phoneExt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== 二、平日朝山，隨時可以開始 ===== */}
          <section className="mb-20">
            <div className="bg-white/65 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="text-center mb-10">
                <p className="font-serif text-base md:text-lg text-amber-800/80 tracking-[0.2em] mb-3">
                  與觀世音菩薩的約定
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-5 leading-snug">
                  不只三日，隨時可以朝山
                </h2>
                <p className="text-base md:text-lg text-stone-700 leading-loose max-w-2xl mx-auto" style={{ letterSpacing: "0.02em" }}>
                  發心，就是啟程。<br className="hidden sm:block" />
                  無論個人前來或團體共修，都歡迎事先與我們聯繫。
                </p>
              </div>

              {/* 個人 / 團體 兩種方式 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 個人前往 */}
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 p-7 border border-amber-200/60">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-amber-600 text-white shadow-md">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <h3 className="font-serif text-xl font-bold text-stone-800">個人前往</h3>
                  </div>
                  <p className="text-stone-700 leading-relaxed mb-3">
                    不需填寫申請表。
                  </p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    建議提前一天通報，讓交通組與安管組同仁知悉。朝山時請盡量靠右邊朝拜，以確保安全。
                  </p>
                </div>

                {/* 團體朝山 */}
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 p-7 border border-amber-200/60">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-amber-700 text-white shadow-md">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                    <h3 className="font-serif text-xl font-bold text-stone-800">團體朝山</h3>
                  </div>
                  <p className="text-stone-700 leading-relaxed mb-3">
                    20 人以上團體，請填寫參訪申請表。
                  </p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    以利知會道場相關部門，提供更完善的接待與服務。
                  </p>
                </div>
              </div>

              {/* 導向常見問題 */}
              <div className="mt-8 text-center">
                <Link
                  href="/faq"
                  className="group inline-flex items-center gap-1.5 font-medium text-amber-700 transition-all duration-300 hover:text-amber-900"
                >
                  查看朝山常見問題
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* ===== 教團統一呼籲（有活動時才顯示）===== */}
          {specialEvents.length > 0 && (
            <section className="mb-20">
              <SectionHeading title="教團朝山共修" en="Special Gathering" />
              <div className="space-y-6">
                {specialEvents.map((e) => (
                  <article
                    key={e.id}
                    className="group flex flex-col md:flex-row bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative w-full md:w-2/5 h-52 md:h-auto md:min-h-[15rem] overflow-hidden">
                      <Image
                        src={e.image}
                        alt={e.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                    <div className="flex-1 p-6 md:p-8">
                      <span className="inline-block px-3 py-1 mb-3 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                        {e.date}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-stone-800 mb-2">{e.title}</h3>
                      <p className="text-sm text-amber-800/80 mb-3">{e.location}</p>
                      <p className="text-base text-stone-700 leading-relaxed">{e.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ===== 三、朝山社群與各地講堂 ===== */}
          <section className="mb-20">
            <SectionHeading title="各地朝山社群" en="Regional Groups" />
            <p className="text-stone-700 leading-relaxed mb-7 max-w-3xl">
              朝山多由各地講堂與朝山社團自行號召集結。最新的出發日期與共乘資訊，歡迎加入下方社群關注。
            </p>

            {/* 朝山主揪社團 */}
            <a
              href={pilgrimageGroup.fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-5 rounded-2xl p-7 md:p-8 shadow-lg bg-gradient-to-r from-amber-600 to-amber-700 text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <span className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm tracking-wider">
                  朝山主揪社團
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-1.5">
                  {pilgrimageGroup.name}
                </h3>
                <p className="text-white/85 text-sm">{pilgrimageGroup.area}</p>
              </div>
              <span className="inline-flex flex-shrink-0 items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-white text-amber-800 shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                前往社團
              </span>
            </a>

            {/* 各地講堂聯絡方式（導向教團官網，本站不重複維護） */}
            <a
              href={hallsDirectory.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${hallsDirectory.name}（前往${hallsDirectory.siteName}，另開新視窗）`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl p-7 md:p-8 shadow-lg bg-white/60 backdrop-blur-sm border border-amber-200/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:bg-white/75"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-700">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-stone-800 mb-1.5">
                    {hallsDirectory.name}
                  </h3>
                  <p className="text-base text-stone-700 leading-relaxed">
                    {hallsDirectory.desc}
                  </p>
                  <p className="mt-2 text-sm text-stone-500">
                    連結將另開新視窗，方便您隨時切換回本站。
                  </p>
                </div>
              </div>
              <span className="inline-flex flex-shrink-0 items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-amber-600 text-white shadow-sm transition-all duration-300 group-hover:bg-amber-700 group-hover:translate-x-1">
                前往{hallsDirectory.siteName}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
          </section>

          {/* ===== 四、朝山活動回顧 ===== */}
          <section className="mb-16">
            <SectionHeading title="朝山活動回顧" en="Past Highlights" />
            <div className="space-y-6">
              {activityReviews.map((v) => (
                <article
                  key={v.id}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-shadow duration-500 hover:shadow-xl"
                >
                  {/* 收合時顯示的內容 */}
                  <div className="flex flex-col md:flex-row">
                    {/* 封面照片 */}
                    <div className="relative w-full md:w-2/5 h-56 md:h-auto md:min-h-[16rem] overflow-hidden bg-stone-900/5">
                      <Image
                        src={v.image}
                        alt={v.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      {/* 地點標籤 */}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-amber-700/85 text-white backdrop-blur-sm shadow-sm">
                        {v.location}
                      </span>
                      {/* 日期標籤 */}
                      <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                        {v.date}
                      </span>
                    </div>

                    {/* 文字區 */}
                    <div className="flex-1 p-6 md:p-8">
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-800 leading-snug mb-2">
                        {v.title}
                      </h3>
                      {v.subtitle && (
                        <p className="text-sm text-amber-800/80 mb-4">{v.subtitle}</p>
                      )}
                      <p
                        className="text-base text-stone-700 leading-loose"
                        style={{ letterSpacing: "0.02em" }}
                      >
                        {v.summary}
                      </p>
                    </div>
                  </div>

                  {/* 展開全文（HTML 原生 details，不需 JavaScript） */}
                  <details className="group border-t border-amber-200/60">
                    <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-6 py-4 font-medium text-amber-700 transition-colors duration-300 hover:bg-amber-50/60 hover:text-amber-900 [&::-webkit-details-marker]:hidden">
                      {/* 三角形符號，展開時旋轉 */}
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-300 group-open:rotate-90"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M3 1.5L9 6l-6 4.5V1.5z" />
                      </svg>
                      <span className="group-open:hidden">閱讀全文</span>
                      <span className="hidden group-open:inline">收合全文</span>
                    </summary>

                    {/* 全文內容 */}
                    <div className="px-6 md:px-10 pb-9 pt-2">
                      <div className="mx-auto max-w-3xl">
                        {v.body.map((section) => (
                          <div key={section.heading ?? section.paragraphs[0].slice(0, 12)} className="mb-7 last:mb-0">
                            {section.heading && (
                              <h4 className="font-serif text-xl font-bold text-amber-900 mb-4 mt-2">
                                {section.heading}
                              </h4>
                            )}
                            {section.paragraphs.map((p) => (
                              <p
                                key={p.slice(0, 16)}
                                className="mb-4 last:mb-0 text-base text-stone-700 leading-loose"
                                style={{ letterSpacing: "0.02em" }}
                              >
                                {p}
                              </p>
                            ))}
                          </div>
                        ))}

                        {/* 原文連結 */}
                        {v.sourceUrl && (
                          <div className="mt-9 pt-6 border-t border-amber-200/60 text-center">
                            <a
                              href={v.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${v.title}（前往靈鷲山官網原文，另開新視窗）`}
                              className="group/link inline-flex items-center gap-2 font-medium text-amber-700 transition-colors duration-300 hover:text-amber-900"
                            >
                              前往靈鷲山官網閱讀原文
                              <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                            <p className="mt-2 text-sm text-stone-500">連結將另開新視窗</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          </section>

          {/* 聯繫提示 */}
          <div className="text-center">
            <div className="mx-auto w-12 h-px bg-amber-600/40 mb-6" />
            <p className="text-stone-600 mb-5">團體朝山申請或其他疑問，歡迎與我們聯繫</p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded-full font-medium bg-amber-600 text-white shadow-md transition-all duration-300 hover:bg-amber-700 hover:shadow-lg hover:-translate-y-0.5"
            >
              聯絡我們
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
