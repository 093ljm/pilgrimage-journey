import type { Metadata } from "next";
import Link from "next/link";
import { Note } from "@/components/ui/note";
import {
  clothingItems,
  carryItems,
  arrivalOptions,
  mapLinks,
  beforeYouGo,
} from "@/data/preparation";

export const metadata: Metadata = {
  title: "行前準備 - 靈鷲山朝聖之旅",
  description:
    "靈鷲山朝山行前準備指引：穿著建議、隨身物品、出發前須知與當天朝山儀軌節奏。量力而為、安全第一，讓這趟路走得安穩。",
};

export default function PreparationPage() {
  const essentials = carryItems.filter((i) => i.essential);
  const optionals = carryItems.filter((i) => !i.essential);

  return (
    <main className="min-h-screen relative">
      {/* 背景層 */}
      <div className="fixed inset-0 -z-10">
        {/* 基礎漸變背景 */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)",
          }}
        />

        {/* 紙張紋理 1 */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise1'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise1)' opacity='0.5' /%3E%3C/svg%3E")`,
          }}
        />

        {/* 紙張紋理 2 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence baseFrequency='1.5' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)' opacity='0.3' /%3E%3C/svg%3E")`,
          }}
        />

        {/* 顆粒紋理 */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* 主要內容 */}
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* 頁面標題 */}
          <div className="text-center mb-16">
            <p className="font-serif text-sm tracking-[0.3em] text-amber-700/80 mb-3">
              BEFORE YOU GO
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 tracking-wide">
              行前準備
            </h1>
            <div className="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
            <p className="mt-6 text-base md:text-lg text-stone-600 max-w-xl mx-auto leading-loose">
              朝山不需要複雜的準備，
              <br className="sm:hidden" />
              但一點點用心，
              <br className="hidden sm:block" />
              能讓這趟路走得更安穩。
            </p>
          </div>

          {/* ===== 一、身的準備 ===== */}
          <section className="mb-16">
            <SectionHeading num="一" title="身的準備" en="What to Wear" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {clothingItems.map((c) => (
                <div
                  key={c.id}
                  className={`flex items-start gap-4 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                    c.kind === "avoid"
                      ? "bg-stone-100/70 border border-stone-300/60"
                      : "bg-white/60"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${
                      c.kind === "avoid"
                        ? "bg-stone-300/60 text-stone-600"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {c.kind === "avoid" ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-800 mb-1.5">
                      {c.label}
                    </h3>
                    <p className="text-base text-stone-700 leading-relaxed" style={{ letterSpacing: "0.02em" }}>
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 隨身物品 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-7 md:p-9 shadow-lg">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-amber-900 mb-6">
                隨身物品
              </h3>

              {/* 必備 */}
              <p className="text-sm tracking-[0.2em] text-amber-800/70 mb-3">必備</p>
              <div className="flex flex-wrap gap-3 mb-7">
                {essentials.map((i) => (
                  <div
                    key={i.id}
                    className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 pl-4 pr-5 py-2.5 text-white shadow-sm"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/25">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">{i.name}</span>
                    <span className="text-sm text-white/75">{i.note}</span>
                  </div>
                ))}
              </div>

              {/* 建議攜帶 */}
              <p className="text-sm tracking-[0.2em] text-amber-800/70 mb-3">建議攜帶</p>
              <div className="flex flex-wrap gap-3">
                {optionals.map((i) => (
                  <div
                    key={i.id}
                    className="flex items-center gap-2.5 rounded-full bg-amber-50/80 border border-amber-200/70 pl-4 pr-5 py-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="font-medium text-stone-800">{i.name}</span>
                    <span className="text-sm text-stone-600">{i.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 分隔裝飾 */}
          <Divider />

          {/* ===== 二、心的準備 ===== */}
          <section className="mb-16">
            <SectionHeading num="二" title="心的準備" en="Inner Preparation" />

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg">
              <div className="space-y-7">
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-amber-900 mb-2.5">
                    量力而為，沒有時間壓力
                  </h3>
                  <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: "0.02em" }}>
                    初次參加建議選擇較短、較平緩的路線，循序漸進。過程中可以隨時休息，聆聽自己身體的聲音——安全第一，永遠比走完更重要。
                  </p>
                </div>

                <div className="w-full h-px bg-amber-600/15" />

                <div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-amber-900 mb-2.5">
                    年長或身體狀況特殊
                  </h3>
                  <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: "0.02em" }}>
                    建議參加前先諮詢醫師意見。現場會有護法志工從旁協助，不必獨自勉強。
                  </p>
                </div>

                <div className="w-full h-px bg-amber-600/15" />

                <div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-amber-900 mb-2.5">
                    不需要佛教基礎
                  </h3>
                  <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: "0.02em" }}>
                    朝山歡迎所有有心學習的朋友。保持開放和恭敬的心，就是最好的準備。許多人正是透過朝山，開始接觸佛法。
                  </p>
                </div>

                <div className="w-full h-px bg-amber-600/15" />

                <div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-amber-900 mb-2.5">
                    專注當下
                  </h3>
                  <p className="text-base md:text-lg text-stone-700 leading-loose" style={{ letterSpacing: "0.02em" }}>
                    不用太在意腳步是否整齊，重要的是專心持誦佛號，觀照自己的心。行進時持誦聖號，跪拜時持誦懺悔偈——
                    <span className="whitespace-nowrap">「往昔所造諸惡業，</span>
                    <span className="whitespace-nowrap">今在佛前求懺悔」</span>。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 分隔裝飾 */}
          <Divider />

          {/* ===== 三、出發前須知 ===== */}
          <section className="mb-16">
            <SectionHeading num="三" title="出發前須知" en="Good to Know" />

            {/* 抵達方式 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-7 md:p-9 shadow-lg mb-5">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-6">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-amber-900">
                  抵達方式
                </h3>
                <p className="text-sm text-stone-600">
                  抵達方式不同，朝山的起點也不同
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {arrivalOptions.map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-col rounded-2xl bg-amber-50/70 border border-amber-200/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm mb-4">
                      <ArrivalIcon type={a.icon} />
                    </span>
                    <h4 className="font-serif text-lg font-bold text-stone-800 mb-2.5">
                      {a.mode}
                    </h4>
                    <span className="self-start inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-amber-300/70 pl-2.5 pr-3.5 py-1 mb-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span className="text-sm font-medium text-amber-800">
                        起點 · {a.start}
                      </span>
                    </span>
                    <p className="text-base text-stone-700 leading-relaxed" style={{ letterSpacing: "0.02em" }}>
                      {a.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* 導航連結（純連結，不嵌入地圖） */}
              <div className="mt-8 pt-7 border-t border-amber-200/70">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.4" />
                    </svg>
                  </span>
                  <h4 className="font-serif text-lg md:text-xl font-bold text-amber-900">
                    導航
                  </h4>
                  <span className="flex-1 h-px bg-gradient-to-r from-amber-500/35 to-transparent" />
                  <span className="hidden sm:inline text-sm text-stone-500">
                    於新分頁開啟 Google 地圖
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {mapLinks.map((m) => (
                    <a
                      key={m.id}
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 rounded-xl bg-white/85 border border-amber-200/80 px-4 py-3.5 shadow-sm transition-all duration-300 hover:bg-white hover:border-amber-400/80 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span className="mt-0.5 flex items-center justify-center w-7 h-7 flex-shrink-0 rounded-full bg-amber-100 text-amber-700 transition-colors duration-300 group-hover:bg-amber-600 group-hover:text-white">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
                          <circle cx="12" cy="10" r="2.4" />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          <span className="font-medium text-stone-800">
                            {m.label}
                          </span>
                          <svg
                            className="w-3 h-3 flex-shrink-0 text-amber-600/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                          </svg>
                        </span>
                        <span className="block mt-0.5 text-sm text-stone-500 leading-snug">
                          {m.note}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>

                <Note className="mt-4">
                  地藏廣場位在入山道路途中的紅色鐵皮屋，導航設定「靈鷲山無生道場」沿途即會經過。
                </Note>
              </div>

              <Note className="mt-2">
                停車空間有限，請勿臨停於濱海公路路肩；現場一律依交通組指引停放。
              </Note>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {beforeYouGo.map((b, index) => (
                <div
                  key={b.id}
                  className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-7 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="absolute top-6 right-7 font-serif text-4xl font-bold text-amber-600/15 leading-none select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-800 mb-3">
                    {b.title}
                  </h3>
                  <p className="text-base text-stone-700 leading-loose" style={{ letterSpacing: "0.02em" }}>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 結語 */}
          <div className="bg-gradient-to-br from-amber-50/90 to-amber-100/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-amber-200/60 text-center">
            <p className="font-serif text-xl md:text-2xl font-bold text-amber-900 leading-relaxed tracking-wide mb-4">
              準備好的，其實只是一顆願意的心
            </p>
            <p className="text-base md:text-lg text-stone-700 leading-loose max-w-xl mx-auto" style={{ letterSpacing: "0.02em" }}>
              其餘的，山會告訴你。
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/events/info"
                className="w-full sm:w-auto px-8 py-3 rounded-full font-medium bg-amber-600 text-white shadow-md transition-all duration-300 hover:bg-amber-700 hover:shadow-lg hover:-translate-y-0.5"
              >
                查看活動資訊
              </Link>
              <Link
                href="/faq"
                className="w-full sm:w-auto px-8 py-3 rounded-full font-medium bg-white/80 text-amber-800 border border-amber-300/70 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
              >
                常見問題
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// 區塊標題元件
function SectionHeading({ num, title, en }: { num: string; title: string; en: string }) {
  return (
    <div className="flex items-end gap-3 mb-7">
      <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-amber-500 to-amber-700" />
      <div>
        <p className="font-serif text-xs tracking-[0.25em] text-amber-700/70 uppercase">{en}</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-800 leading-tight">
          {num}、{title}
        </h2>
      </div>
    </div>
  );
}

// 分隔裝飾
function Divider() {
  return (
    <div className="flex justify-center my-14">
      <div className="w-16 h-16 rounded-full border-2 border-amber-600/30 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-amber-600/50 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-amber-600/70" />
        </div>
      </div>
    </div>
  );
}

// 抵達方式圖示
function ArrivalIcon({ type }: { type: "car" | "shuttle" | "train" }) {
  const common = {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "car") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4.5 13.5l1.6-4.2A2 2 0 0 1 8 8h8a2 2 0 0 1 1.9 1.3l1.6 4.2" />
        <path d="M4 13.5h16a1 1 0 0 1 1 1V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2.5a1 1 0 0 1 1-1z" />
        <path d="M6.5 18v1.5M17.5 18v1.5" />
        <path d="M6.5 15.7h1M16.5 15.7h1" />
      </svg>
    );
  }

  if (type === "shuttle") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6.5z" />
        <path d="M4 11h16" />
        <path d="M7 17v2M17 17v2" />
        <path d="M7.5 14h1M15.5 14h1" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden="true">
      <path d="M6.5 5.5A1.5 1.5 0 0 1 8 4h8a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 16 17H8a1.5 1.5 0 0 1-1.5-1.5v-10z" />
      <path d="M6.5 10.5h11" />
      <path d="M9.5 13.8h.01M14.5 13.8h.01" />
      <path d="M9 17l-2 3M15 17l2 3" />
    </svg>
  );
}
