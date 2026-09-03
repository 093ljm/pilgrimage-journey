import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ArticleSection, StoryItem, TeachingItem } from "@/types/content";
import type { PilgrimageDay } from "@/data/events";

const contentRoot = path.join(process.cwd(), "content");

function readMarkdownFiles(folder: string) {
  const directory = path.join(contentRoot, folder);
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const source = fs.readFileSync(path.join(directory, file), "utf8");
      const parsed = matter(source);
      return { file, data: parsed.data, content: parsed.content.trim() };
    });
}

function splitParagraphs(value: string): string[] {
  return value.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
}

function parseStoryBody(content: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  let current: ArticleSection = { paragraphs: [] };

  for (const block of splitParagraphs(content)) {
    const heading = block.match(/^##\s+(.+)$/);
    if (heading) {
      if (current.heading || current.paragraphs.length) sections.push(current);
      current = { heading: heading[1].trim(), paragraphs: [] };
    } else {
      current.paragraphs.push(block.replace(/\n+/g, " "));
    }
  }
  if (current.heading || current.paragraphs.length) sections.push(current);
  return sections;
}

export function getStories(): StoryItem[] {
  return readMarkdownFiles("life-stories")
    .map(({ file, data, content }) => ({
      id: String(data.id || path.basename(file, ".md")),
      slug: String(data.slug || path.basename(file, ".md")),
      name: String(data.name || ""),
      role: String(data.role || ""),
      title: String(data.title || ""),
      summary: String(data.summary || ""),
      images: [data.coverImage, data.contentImage].filter(Boolean).map(String).slice(0, 2),
      videoUrl: String(data.videoUrl || ""),
      videoFile: String(data.videoFile || ""),
      body: parseStoryBody(content),
      isPublished: data.published !== false,
      displayOrder: Number(data.displayOrder || 10),
    }))
    .filter((story) => story.isPublished && story.title)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, 10);
}

export function getStory(slug: string): StoryItem | null {
  return getStories().find((story) => story.slug === slug) ?? null;
}

export function getTeachings(): TeachingItem[] {
  return readMarkdownFiles("teachings")
    .map(({ file, data, content }) => ({
      id: String(data.id || path.basename(file, ".md")),
      title: String(data.title || ""),
      author: String(data.author || data.title || ""),
      paragraphs: splitParagraphs(content).map((paragraph) => paragraph.replace(/\n+/g, " ")),
      highlight: String(data.highlight || ""),
      isPublished: data.published !== false,
      displayOrder: Number(data.displayOrder || 10),
    }))
    .filter((teaching) => teaching.isPublished && teaching.title)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export interface GuanyinAssembliesSettings {
  annualPilgrimageDays: PilgrimageDay[];
  location: string;
  registerVia: string;
  phone: string;
  phoneExt: string;
}

export function getGuanyinAssembliesSettings(): GuanyinAssembliesSettings {
  const file = path.join(contentRoot, "settings", "guanyin-three-assemblies.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as GuanyinAssembliesSettings;
  return data;
}
