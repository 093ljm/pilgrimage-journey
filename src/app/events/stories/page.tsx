import type { Metadata } from "next";
import Image from "next/image";
import { stories } from "@/data/stories";

export const metadata: Metadata = {
  title: "生命故事 - 靈鷲山朝聖之旅",
  description:
    "朝聖者的真實見證，在山海之間的生命轉化與感動。聽朝山力士筱喻師姐分享 27 年來的朝山之路。",
};

export default function LifeStoriesPage() {
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
              LIFE STORIES
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 tracking-wide">
              生命故事
            </h1>
            <div className="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
            <p className="mt-6 text-base md:text-lg text-stone-600 max-w-xl mx-auto leading-relaxed">
              每一位朝山者，都帶著自己的故事而來。
              <br className="hidden sm:block" />
              這些真實的見證，是山海之間最動人的風景。
            </p>
          </div>

          {/* 故事列表 */}
          <div className="space-y-10">
            {stories.map((story) => (
              <article
                key={story.id}
                className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-shadow duration-500 hover:shadow-xl"
              >
                {/* 媒體區：影片優先，沒有影片才顯示照片 */}
                <div className="relative w-full bg-stone-900">
                  {story.youtubeUrl ? (
                    <div className="relative w-full aspect-video">
                      <iframe
                        src={story.youtubeUrl}
                        title={story.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : story.videoFile ? (
                    <video
                      controls
                      preload="metadata"
                      playsInline
                      poster={story.image || undefined}
                      className="w-full max-h-[70vh] bg-black"
                    >
                      <source src={story.videoFile} type="video/mp4" />
                      您的瀏覽器不支援影片播放，請改用其他瀏覽器。
                    </video>
                  ) : story.image ? (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                      />
                    </div>
                  ) : null}
                </div>

                {/* 文字區 */}
                <div className="p-6 md:p-10">
                  {/* 見證者資訊 */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-serif text-lg font-bold shadow-md">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-serif text-lg font-bold text-stone-800">{story.name}</p>
                      <p className="text-sm text-amber-800/75">{story.role}</p>
                    </div>
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800 mb-5 leading-snug">
                    {story.title}
                  </h2>

                  <p
                    className="text-base md:text-lg text-stone-700 leading-loose"
                    style={{ letterSpacing: "0.02em" }}
                  >
                    {story.summary}
                  </p>
                </div>

                {/* 展開全文（HTML 原生 details，不需 JavaScript） */}
                {story.body.length > 0 && (
                  <details className="group border-t border-amber-200/60">
                    <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-6 py-4 font-medium text-amber-700 transition-colors duration-300 hover:bg-amber-50/60 hover:text-amber-900 [&::-webkit-details-marker]:hidden">
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-300 group-open:rotate-90"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M3 1.5L9 6l-6 4.5V1.5z" />
                      </svg>
                      <span className="group-open:hidden">閱讀完整訪談</span>
                      <span className="hidden group-open:inline">收合訪談</span>
                    </summary>

                    <div className="px-6 md:px-10 pb-10 pt-2">
                      <div className="mx-auto max-w-3xl">
                        {story.body.map((section) => (
                          <div
                            key={section.heading ?? section.paragraphs[0].slice(0, 12)}
                            className="mb-8 last:mb-0"
                          >
                            {section.heading && (
                              <h3 className="font-serif text-xl md:text-2xl font-bold text-amber-900 mb-4 mt-2">
                                {section.heading}
                              </h3>
                            )}
                            {section.paragraphs.map((p) => (
                              <p
                                key={p.slice(0, 16)}
                                className="mb-4 last:mb-0 text-base md:text-lg text-stone-700 leading-loose"
                                style={{ letterSpacing: "0.02em" }}
                              >
                                {p}
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                )}
              </article>
            ))}
          </div>

          {/* 分享提示 */}
          <div className="mt-16 text-center">
            <div className="mx-auto w-12 h-px bg-amber-600/40 mb-6" />
            <p className="text-stone-600 leading-relaxed">
              您也有屬於自己的朝山故事嗎？
              <br className="sm:hidden" />
              歡迎與我們分享，讓更多人因您的故事而踏上旅程。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
