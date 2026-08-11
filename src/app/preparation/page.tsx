import type { Metadata } from "next";
import Link from "next/link";
import {
  clothingItems,
  carryItems,
  beforeYouGo,
  ritualSteps,
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

          {/* 分隔裝飾 */}
          <Divider />

          {/* ===== 四、當天的節奏 ===== */}
          <section className="mb-16">
            <SectionHeading num="四" title="當天的節奏" en="The Rhythm of the Day" />

            <p className="text-base md:text-lg text-stone-700 leading-loose mb-7" style={{ letterSpacing: "0.02em" }}>
              靈鷲山朝山儀軌分為三段——前行、正行、結行。
            </p>

            <div className="relative">
              {/* 縱向連接線（桌面版隱藏，手機版顯示） */}
              <div className="absolute left-[1.35rem] top-6 bottom-6 w-px bg-gradient-to-b from-amber-400/60 via-amber-500/40 to-transparent sm:hidden" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {ritualSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="relative flex sm:block gap-5 sm:gap-0"
                  >
                    {/* 序號圓點 */}
                    <span className="relative z-10 flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-serif text-lg font-bold shadow-md sm:mb-4">
                      {index + 1}
                    </span>

                    <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                      <p className="font-serif text-xs tracking-[0.25em] text-amber-700/70 uppercase mb-1">
                        {step.en}
                      </p>
                      <h3 className="font-serif text-xl font-bold text-amber-900 mb-4">
                        {step.stage}
                      </h3>
                      <ul className="space-y-2.5">
                        {step.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-2 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                            <span className="text-base text-stone-700 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 導向朝山路線與行儀 */}
            <div className="mt-7 text-center">
              <Link
                href="/routes"
                className="group inline-flex items-center gap-1.5 font-medium text-amber-700 transition-all duration-300 hover:text-amber-900"
              >
                查看完整朝山路線與行儀
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
