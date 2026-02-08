import { z } from "zod";

export interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  image_url?: string;
  category: string;
  publishedAt: string;
  published_at?: string;
  readTime: number;
  excerpt?: string;
  author?: string;
  tags?: string[];
  platforms?: string[];
  source?: string;
  source_url?: string;
  sourceUrl?: string;
  imagePhotographer?: string;
  image_photographer?: string;
  imageCreditUrl?: string;
  image_credit_url?: string;
  imageCredit?: string;
  image_credit?: string;
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
  source: z.string().optional(),
  sourceUrl: z.string().optional(),
  imagePhotographer: z.string().optional(),
  imageCreditUrl: z.string().optional(),
  imageCredit: z.string().optional(),
});

export type ArticleSchema = z.infer<typeof articleSchema>;
