"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ============================================================
// 影片播放區
// ------------------------------------------------------------
// ★ 為什麼要寫這麼多，不直接放一個 iframe？
//
//   1. 一進頁面就載入 YouTube 播放器，手機流量與速度都吃虧
//      → 先顯示封面圖，點下去才載入。
//
//   2. YouTube 影片的擁有者可以關閉「允許嵌入」。
//      關閉時，直接放 iframe 只會看到一片黑，信眾會以為網站壞了
//      → 這裡用 YouTube 官方播放器 API，攔截錯誤代碼 101／150，
//        改成一段看得懂的說明加上前往 YouTube 的按鈕。
//
//   3. 若連 YouTube 播放器程式都載不進來（網路被擋），
//      自動退回最單純的 iframe，不會整塊消失。
//
//   ※ 想讓影片能在本站內播放，要請影片擁有者到 YouTube 工作室
//     開啟「允許嵌入」，這是 YouTube 端的設定，網站無法代為變更。
// ============================================================

interface YouTubePlayer {
  destroy: () => void;
  playVideo: () => void;
}

interface YouTubePlayerConstructor {
  new (
    element: HTMLElement,
    options: {
      videoId: string;
      width?: string;
      height?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onError?: (event: { data: number }) => void;
      };
    },
  ): YouTubePlayer;
}

declare global {
  interface Window {
    YT?: { Player?: YouTubePlayerConstructor };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const API_SCRIPT_ID = "youtube-iframe-api";

function loadYouTubeApi(): Promise<YouTubePlayerConstructor> {
  if (window.YT?.Player) return Promise.resolve(window.YT.Player);

  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(
      () => reject(new Error("YouTube 播放器載入逾時")),
      8000,
    );

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      window.clearTimeout(timer);

      if (window.YT?.Player) {
        resolve(window.YT.Player);
      } else {
        reject(new Error("YouTube 播放器無法初始化"));
      }
    };

    if (!document.getElementById(API_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = API_SCRIPT_ID;
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        window.clearTimeout(timer);
        reject(new Error("YouTube 播放器無法連線"));
      };
      document.head.appendChild(script);
    }
  });
}

type PlayerState = "cover" | "loading" | "playing" | "blocked" | "fallback";

// YouTube 播放器的錯誤代碼，轉成信眾看得懂的說明
function describeError(code: number): { title: string; detail: string } {
  if (code === 101 || code === 150) {
    return {
      title: "這支影片未開放在其他網站播放",
      detail:
        "影片擁有者已將播放範圍限定在 YouTube，請前往 YouTube 觀看完整內容。",
    };
  }

  if (code === 100) {
    return {
      title: "找不到這支影片",
      detail: "影片可能已被移除，或已改為私人影片。",
    };
  }

  return {
    title: "影片目前無法播放",
    detail: "請稍後再試，或直接前往 YouTube 觀看。",
  };
}

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [state, setState] = useState<PlayerState>("cover");
  const [errorCode, setErrorCode] = useState(0);

  // maxresdefault 畫質最好，但不是每支影片都有，載不到就退回 hqdefault
  const [thumbnail, setThumbnail] = useState(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  );

  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const isStarted = state !== "cover";

  // 播放器由 YouTube 自己注入 DOM，React 不管這塊，
  // 所以清空時也要自己來，避免與 React 的畫面更新打架。
  const clearHost = useCallback(() => {
    playerRef.current?.destroy();
    playerRef.current = null;

    if (hostRef.current) {
      hostRef.current.innerHTML = "";
    }
  }, []);

  useEffect(() => {
    if (state !== "loading") return;

    let cancelled = false;

    loadYouTubeApi()
      .then((Player) => {
        if (cancelled || !hostRef.current) return;

        const target = document.createElement("div");
        hostRef.current.appendChild(target);

        playerRef.current = new Player(target, {
          videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: () => {
              if (cancelled) return;

              setState("playing");

              // 瀏覽器有時會擋掉自動播放，這裡再推一次
              playerRef.current?.playVideo();
            },
            onError: (event) => {
              if (cancelled) return;

              clearHost();
              setErrorCode(event.data);
              setState("blocked");
            },
          },
        });
      })
      .catch(() => {
        // 播放器程式載不進來時，退回最單純的 iframe
        if (!cancelled) {
          setState("fallback");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [state, videoId, clearHost]);

  useEffect(() => clearHost, [clearHost]);

  return (
    <div className="overflow-hidden rounded-3xl bg-stone-900 shadow-xl">
      <div className="relative aspect-video">
        {/* YouTube 官方播放器注入處 */}
        <div
          ref={hostRef}
          aria-hidden={!isStarted}
          className={`absolute inset-0 [&>div]:h-full [&>div]:w-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full ${
            state === "loading" || state === "playing" ? "" : "hidden"
          }`}
        />

        {/* 播放器程式載不進來時的備援 */}
        {state === "fallback" && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {/* 載入中 */}
        {state === "loading" && (
          <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-sm tracking-[0.2em] text-amber-100/90">
            影片載入中…
          </span>
        )}

        {/* 影片無法在站內播放時的說明 */}
        {state === "blocked" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-stone-900 px-6 text-center">
            <p className="font-serif text-lg text-amber-100 md:text-xl">
              {describeError(errorCode).title}
            </p>

            <p className="max-w-md text-sm leading-relaxed text-stone-400">
              {describeError(errorCode).detail}
            </p>

            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3 font-medium text-stone-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400"
            >
              前往 YouTube 觀看
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}

        {/* 封面（尚未點擊播放） */}
        {state === "cover" && (
          <button
            type="button"
            onClick={() => {
              setErrorCode(0);
              setState("loading");
            }}
            aria-label={`播放影片：${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-amber-400"
          >
            <img
              src={thumbnail}
              alt=""
              aria-hidden="true"
              loading="lazy"
              onError={() =>
                setThumbnail(
                  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                )
              }
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* 讓播放鍵在任何封面上都清楚可見 */}
            <span className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/15 to-stone-950/25 transition-opacity duration-500 group-hover:opacity-90" />

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

      {/* 備援連結固定在最下方，內嵌若被擋下，影片一樣看得到 */}
      <div className="flex flex-col items-center gap-2 border-t border-white/10 px-5 py-4 text-center text-sm text-stone-300 sm:px-7">
        <span>※ 若影片無法播放，請點下方連結觀看。</span>

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
