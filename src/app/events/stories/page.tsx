import type { Metadata } from "next";
import Image from "next/image";
import { stories } from "@/data/stories";

export const metadata: Metadata = {
  title: "生命故事 - 靈鷲山朝聖之旅",
  description: "朝聖者的真實見證，在山海之間的生命轉化與感動",
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
              每一位朝山者，都帶著自己的故事而來。<br className="hidden sm:block" />
              這些真實的見證，是山海之間最動人的風景。
            </p>
          </div>

          {/* 故事列表（交替左右佈局）*/}
          <div className="space-y-10">
            {stories.map((story, index) => (
              <article
                key={story.id}
                className={`group flex flex-col ${
                  index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* 媒體區：有影片則嵌入，否則顯示圖片 */}
                <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-[18rem] bg-stone-900/5">
                  {story.videoUrl ? (
                    <iframe
                      src={story.videoUrl}
                      title={story.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* 播放按鈕裝飾（暗示此處可放影片）*/}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40">
                          <svg className="w-7 h-7 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* 文字區 */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-serif text-lg font-bold shadow-md">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-serif text-lg font-bold text-stone-800">{story.name}</p>
                      <p className="text-sm text-amber-800/70">{story.role}</p>
                    </div>
                  </div>

                  <h2 className="font-serif text-xl md:text-2xl font-bold text-stone-800 mb-4">
                    「{story.title}」
                  </h2>

                  <p className="text-base text-stone-700 leading-loose" style={{ letterSpacing: "0.02em" }}>
                    {story.quote}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* 分享提示 */}
          <div className="mt-16 text-center">
            <div className="mx-auto w-12 h-px bg-amber-600/40 mb-6" />
            <p className="text-stone-600 leading-relaxed">
              您也有屬於自己的朝山故事嗎？<br className="sm:hidden" />
              歡迎與我們分享，讓更多人因您的故事而踏上旅程。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
