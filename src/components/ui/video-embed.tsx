"use client";

import { useState } from "react";

// ============================================================
// 影片播放區
// ------------------------------------------------------------
// ★ 為什麼不直接放 iframe？
//   1. 少數網路環境（公司、學校、部分電信 DNS）會擋掉 YouTube 內嵌，
//      直接放 iframe 會變成一整塊空白，信眾以為網站壞了。
//   2. 一進頁面就載入 YouTube 播放器，手機流量與載入速度都吃虧。
//
//   所以先顯示影片封面圖，點下去才載入播放器；
//   同時「在 YouTube 觀看」連結永遠都在，內嵌失敗也一定看得到影片。
// ============================================================

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  // maxresdefault 畫質最好，但不是每支影片都有，載不到就退回 hqdefault
  const [thumbnail, setThumbnail] = useState(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  );

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="overflow-hidden rounded-3xl bg-stone-900 shadow-xl">
      <div className="relative aspect-video">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`播放影片：${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-amber-400"
          >
            {/* 影片封面 */}
            <img
              src={thumbnail}
              alt=""
              aria-hidden="true"
              loading="lazy"
              onError={() =>
                setThumbnail(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)
              }
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* 讓播放鍵在任何封面上都清楚可見 */}
            <span className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/15 to-stone-950/25 transition-opacity duration-500 group-hover:opacity-90" />

            {/* 播放鍵 */}
            <span className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-500/95 shadow-[0_8px_30px_rgba(0,0,0,.45)] ring-1 ring-white/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400 md:h-20 md:w-20">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="ml-1 h-8 w-8 text-stone-950 md:h-9 md:w-9"
              >
                <path d="M8 5.5v13l11-6.5-11-6.5z" />
              </svg>
            </span>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-stone-950/55 px-4 py-1.5 text-sm tracking-[0.15em] text-amber-50 backdrop-blur-sm">
              點擊播放影片
            </span>
          </button>
        )}
      </div>

      {/* 備援：即使內嵌被網路環境擋下，這條連結一定能看到影片 */}
      <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 px-5 py-3.5 text-sm text-stone-300 sm:flex-row sm:px-7">
        <span>※ 若影片無法播放，請改用右方連結觀看。</span>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 font-medium text-amber-300 transition-colors hover:text-amber-200"
        >
          在 YouTube 觀看
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
