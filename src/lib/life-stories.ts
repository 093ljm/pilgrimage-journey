import type { StoryItem } from "@/types/content";
import { getStories, getStory } from "@/lib/content";

export function getPublishedStories(): StoryItem[] {
  return getStories();
}

export function getPublishedStory(slug: string): StoryItem | null {
  return getStory(slug);
}

// ============================================================
// YouTube 影片網址解析
// ------------------------------------------------------------
// ★ 管理員可能貼上各種形式的網址，全部都要能認得：
//     https://www.youtube.com/watch?v=ID
//     https://youtu.be/ID?si=xxxx        （手機／分享鈕）
//     https://www.youtube.com/shorts/ID  （短影音）
//     https://www.youtube.com/live/ID    （直播存檔）
//     https://www.youtube.com/embed/ID
//     https://m.youtube.com / music.youtube.com / youtube-nocookie.com
//   甚至只貼影片代號 ID 本身，也一樣接受。
// ============================================================

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

export function getYouTubeId(value: string): string | null {
  const raw = (value || "").trim();
  if (!raw) return null;
  if (VIDEO_ID.test(raw)) return raw;

  // 沒寫 https:// 也要能解析
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./i, "").replace(/^m\./i, "").toLowerCase();
  const isYouTube =
    host === "youtube.com" ||
    host === "music.youtube.com" ||
    host === "youtube-nocookie.com" ||
    host === "youtu.be";
  if (!isYouTube) return null;

  // 去掉頭尾斜線後切段，可同時容忍 /watch/ 這種多一撇的網址
  const parts = url.pathname.split("/").filter(Boolean);

  if (host === "youtu.be") {
    return VIDEO_ID.test(parts[0] ?? "") ? parts[0] : null;
  }

  const v = url.searchParams.get("v");
  if (v && VIDEO_ID.test(v)) return v;

  if (["embed", "shorts", "live", "v", "e"].includes(parts[0] ?? "")) {
    const id = parts[1] ?? "";
    return VIDEO_ID.test(id) ? id : null;
  }

  return null;
}

export function getYouTubeEmbedUrl(value: string): string | null {
  const id = getYouTubeId(value);
  // 用標準 youtube.com 網域，部分公司、學校與電信網路會擋 youtube-nocookie.com
  return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null;
}

export function getYouTubeWatchUrl(value: string): string | null {
  const id = getYouTubeId(value);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

// 檔名含中文或空白時，未編碼的路徑會讓伺服器與瀏覽器解析失敗，
// 這裡統一補上編碼；已編碼過的網址不會被重複編碼。
export function safeMediaPath(src: string): string {
  const value = (src || "").trim();
  if (!value) return value;
  try {
    return encodeURI(decodeURI(value));
  } catch {
    return value;
  }
}

export function storyImages(story: StoryItem): string[] {
  return story.images.slice(0, 2).map(safeMediaPath);
}
