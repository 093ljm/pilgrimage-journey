import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPublishedStories,
  getPublishedStory,
  getYouTubeEmbedUrl,
  storyImages,
} from "@/lib/life-stories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublishedStories().map((story) => ({ slug: story.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getPublishedStory(slug);
  if (!story) return { title: "找不到生命故事 - 靈鷲山朝聖之旅" };
  return { title: `${story.title} - 生命故事`, description: story.summary };
}

export default async function LifeStoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await getPublishedStory(slug);
  if (!story) notFound();
  const images = storyImages(story);
  const videoUrl = story.videoUrl;
  const youtubeEmbed = getYouTubeEmbedUrl(videoUrl);

  // 文章夠長時把第二張照片插在段落之間；太短則放在內文之後，避免照片被略過
  const inlineImageIndex = story.body.length >= 3 ? 1 : -1;

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500" />
      <article className="container mx-auto max-w-5xl px-4 pb-20 pt-28">
        <Link href="/events/stories" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-amber-800 hover:text-amber-950">← 返回生命故事</Link>
        <header className="mb-10 rounded-3xl bg-white/65 p-7 shadow-lg backdrop-blur-sm md:p-12">
          <p className="mb-3 text-sm tracking-[0.2em] text-amber-700">{story.name} · {story.role}</p>
          <h1 className="font-serif text-3xl font-bold leading-tight text-stone-800 md:text-5xl">{story.title}</h1>
          <p className="mt-6 text-lg leading-loose text-stone-700">{story.summary}</p>
        </header>

        {images[0] && <img src={images[0]} alt={`${story.name}生命故事主照片`} className="mb-10 aspect-[16/9] w-full rounded-3xl object-cover shadow-xl" />}

        <div className="rounded-3xl bg-white/70 px-6 py-9 shadow-lg backdrop-blur-sm md:px-14 md:py-14">
          <div className="mx-auto max-w-3xl">
            {story.body.map((section, sectionIndex) => (
              <section key={`${story.id}-${sectionIndex}`} className="mb-9 last:mb-0">
                {section.heading && <h2 className="mb-4 font-serif text-2xl font-bold text-amber-900 md:text-3xl">{section.heading}</h2>}
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${sectionIndex}-${paragraphIndex}`} className="mb-5 text-base leading-loose text-stone-700 last:mb-0 md:text-lg" style={{ letterSpacing: "0.02em" }}>{paragraph}</p>
                ))}
                {sectionIndex === inlineImageIndex && images[1] && <img src={images[1]} alt={`${story.name}生命故事內文照片`} loading="lazy" className="my-9 aspect-[4/3] w-full rounded-2xl object-cover shadow-md" />}
              </section>
            ))}
            {inlineImageIndex === -1 && images[1] && <img src={images[1]} alt={`${story.name}生命故事內文照片`} loading="lazy" className="mt-9 aspect-[4/3] w-full rounded-2xl object-cover shadow-md" />}
          </div>
        </div>

        {(youtubeEmbed || story.videoFile || videoUrl) && (
          <section className="mt-10 overflow-hidden rounded-3xl bg-stone-900 shadow-xl">
            {youtubeEmbed ? (
              <div className="relative aspect-video">
                <iframe src={youtubeEmbed} title={`${story.title}影片`} loading="lazy" className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            ) : story.videoFile ? (
              <video controls preload="metadata" playsInline poster={images[0]} className="max-h-[75vh] w-full bg-black"><source src={story.videoFile} type="video/mp4" />您的瀏覽器不支援影片播放。</video>
            ) : (
              <div className="p-10 text-center"><a href={videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-amber-500 px-7 py-3 font-medium text-stone-950 hover:bg-amber-400">在新分頁觀看影片</a></div>
            )}
          </section>
        )}
      </article>
    </main>
  );
}
