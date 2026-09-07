import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedStories, storyImages } from "@/lib/life-stories";

export const metadata: Metadata = {
  title: "生命故事 - 靈鷲山朝聖之旅",
  description: "朝聖者的真實見證，在山海之間讀見生命的轉化、放下與感動。",
};

export default async function LifeStoriesPage() {
  const stories = await getPublishedStories();

  return (
    <main className="relative min-h-screen">
      <PaperBackground />
      <div className="container mx-auto px-4 pb-20 pt-28">
        <div className="mx-auto max-w-6xl">
          <header className="mb-14 text-center md:mb-16">
            <p className="mb-3 font-serif text-sm tracking-[0.3em] text-amber-700/80">
              LIFE STORIES
            </p>
            <h1 className="font-serif text-4xl font-bold tracking-wide text-stone-800 md:text-5xl lg:text-6xl">
              生命故事
            </h1>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-loose text-stone-600 md:text-lg">
              每一位朝山者，都帶著自己的故事而來。十段生命旅程將陸續在此相遇，記錄山海之間真實的轉化與感動。
            </p>
          </header>

          {stories.length ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              {stories.map((story, index) => {
                const cover = storyImages(story)[0];

                return (
                  <article
                    key={story.id}
                    className="group flex min-h-full flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/65 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-amber-100 to-amber-300">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={`${story.name}生命故事照片`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle at 30% 25%, white 0, transparent 32%), linear-gradient(145deg, transparent 48%, rgba(146,64,14,.15) 49%, transparent 50%)",
                            }}
                          />
                          <span className="relative font-serif text-6xl text-amber-800/25">
                            {story.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="absolute left-5 top-5 rounded-full bg-stone-900/55 px-3 py-1 text-xs tracking-[0.18em] text-white backdrop-blur-sm">
                        STORY {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7 md:p-8">
                      <div className="mb-5 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 font-serif font-bold text-white">
                          {story.name.charAt(0)}
                        </span>
                        <div>
                          <p className="font-serif font-bold text-stone-800">
                            {story.name}
                          </p>
                          <p className="text-xs leading-relaxed text-amber-800/75">
                            {story.role}
                          </p>
                        </div>
                      </div>
                      <h2 className="mb-4 font-serif text-2xl font-bold leading-snug text-stone-800 md:text-3xl">
                        {story.title}
                      </h2>
                      <p className="mb-7 line-clamp-4 text-base leading-loose text-stone-700">
                        {story.summary}
                      </p>
                      <Link
                        href={`/events/stories/${story.slug}`}
                        className="mt-auto inline-flex items-center gap-2 self-start font-medium text-amber-700 transition-colors hover:text-amber-900"
                      >
                        閱讀生命故事
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl bg-white/60 p-12 text-center shadow-lg backdrop-blur-sm">
              <p className="font-serif text-2xl text-amber-900">故事正在路上</p>
              <p className="mt-3 text-stone-600">
                新的生命見證整理完成後，將陸續與您相遇。
              </p>
            </div>
          )}

          <footer className="mt-16 text-center text-stone-600">
            <div className="mx-auto mb-6 h-px w-12 bg-amber-600/40" />
            <p>
              您也有屬於自己的朝山故事嗎？歡迎與我們分享，讓更多人因您的故事而踏上旅程。
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

function PaperBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
