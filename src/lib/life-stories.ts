import type { StoryItem } from "@/types/content";
import { getStories, getStory } from "@/lib/content";

export function getPublishedStories(): StoryItem[] {
  return getStories();
}

export function getPublishedStory(slug: string): StoryItem | null {
  return getStory(slug);
}

export function getYouTubeEmbedUrl(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    let id = "";
    if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0];
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") id = url.searchParams.get("v") ?? "";
      if (url.pathname.startsWith("/embed/") || url.pathname.startsWith("/shorts/")) id = url.pathname.split("/")[2] ?? "";
    }
    return /^[A-Za-z0-9_-]{6,15}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export function storyImages(story: StoryItem): string[] {
  return story.images.slice(0, 2);
}
