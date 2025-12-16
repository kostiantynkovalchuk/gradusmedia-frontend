import { z } from "zod";

export interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  publishedAt: string;
  readTime: number;
  excerpt?: string;
  author?: string;
  tags?: string[];
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  hasMore: boolean;
}

export interface ArticleDetailResponse {
  article: Article;
  relatedArticles: Article[];
}

export interface SearchResponse {
  articles: Article[];
  total: number;
  query: string;
}

export const articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string(),
  category: z.string(),
  publishedAt: z.string(),
  readTime: z.number(),
  excerpt: z.string().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type ArticleSchema = z.infer<typeof articleSchema>;
