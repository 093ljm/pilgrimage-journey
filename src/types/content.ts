export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export interface StoryItem {
  id: string;
  slug: string;
  name: string;
  role: string;
  title: string;
  summary: string;
  images: string[];
  videoUrl: string;
  videoFile: string;
  body: ArticleSection[];
  isPublished: boolean;
  displayOrder: number;
}

export interface TeachingItem {
  id: string;
  title: string;
  author: string;
  paragraphs: string[];
  highlight: string;
  isPublished: boolean;
  displayOrder: number;
}
