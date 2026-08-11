"use client";

import { useEffect, useState } from "react";
import type { PilgrimageDay } from "@/data/events";

// 三個朝山日的季節色調（春櫻・夏光・秋楓）
const dayTone = [
  "from-rose-100/70 to-amber-50",
  "from-amber-100/80 to-yellow-50",
  "from-orange-100/70 to-amber-50",
];

export function PilgrimageDays({ days }: { days: PilgrimageDay[] }) {
  // 掛載後才做日期判斷，避免伺服器與瀏覽器時間不一致造成畫面閃爍
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const withStatus = days.map((d) => {
    const [y, m, dd] = d.date.split("/").map(Number);
    const dateObj = new Date(y, m - 1, dd);
    return { ...d, isPast: isMounted ? dateObj < today : false };
  });

  // 下一個即將到來的場次
  const nextIndex = isMounted ? withStatus.findIndex((d) => !d.isPast) : -1;
  // 三場全部結束
  const allPast = isMounted && withStatus.every((d) => d.isPast);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        {withStatus.map((d, i) => {
          const [year, month, day] = d.date.split("/");
          const isNext = i === nextIndex;

          return (
            <div
              key={d.id}
              className={`relative rounded-2xl p-7 text-center shadow-lg border bg-gradient-to-br transition-all duration-500 ${
                dayTone[i % dayTone.length]
              } ${
                d.isPast
                  ? "border-stone-300/50 opacity-55"
                  : "border-amber-200/60 hover:-translate-y-1 hover:shadow-xl"
              } ${isNext ? "ring-2 ring-amber-500/40" : ""}`}
            >
              {/* 狀態標記 */}
              {d.isPast ? (
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-500/15 text-stone-600">
                  已圓滿
                </span>
              ) : isNext ? (
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-600 text-white shadow-sm">
                  即將到來
                </span>
              ) : null}

              <p className="font-serif text-lg font-bold text-amber-900 mb-4 tracking-wide">
                {d.name}
              </p>
              <p className="font-serif text-5xl font-bold text-stone-800 leading-none">
                {month}
                <span className="mx-1.5 text-2xl text-stone-400">/</span>
                {day}
              </p>
              <p className="mt-4 text-sm tracking-[0.2em] text-stone-500">{year}</p>

              {/* 節氣意象 */}
              <div className="mt-6 pt-4 border-t border-amber-400/30">
                <p className="font-serif text-sm tracking-[0.15em] text-amber-800/85">
                  {d.season}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 三場皆已圓滿時的提示（避免顯示過期資訊誤導信眾） */}
      {allPast && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-300/60 bg-amber-50/70 p-5">
          <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-amber-100 text-amber-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p className="text-stone-700 leading-relaxed">
            本年度朝山日已圓滿，新年度日期籌備中，
            <br className="sm:hidden" />
            歡迎關注下方各地社群公告，或來電洽詢。
          </p>
        </div>
      )}
    </>
  );
}
