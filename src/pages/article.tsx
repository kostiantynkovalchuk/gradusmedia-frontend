import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Facebook, Linkedin, Twitter, Camera } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import type { Article, ArticlesResponse } from "@shared/schema";
import { getArticleImageUrl } from "@/lib/queryClient";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=1200&q=80";

function formatDate(date: Date | string | undefined | null): string {
  if (!date) return "";
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function getCategoryPath(category: string): string {
  const categoryMap: Record<string, string> = {
    "Новини": "/category/news",
    "Огляди": "/category/reviews",
    "Тренди": "/category/trends",
    "facebook": "/category/facebook",
    "linkedin": "/category/linkedin",
  };
  return categoryMap[category] || "/";
}

function getCategoryLabel(category: string): string {
  const labelMap: Record<string, string> = {
    "facebook": "Facebook",
    "linkedin": "LinkedIn",
  };
  return labelMap[category] || category;
}

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();

  const { data: article, isLoading: articleLoading, error } = useQuery<Article>({
    queryKey: [`/api/articles/${id}`],
    enabled: !!id,
  });

  const { data: allArticles } = useQuery<ArticlesResponse>({
    queryKey: ["/api/articles"],
  });

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" data-testid="error-state">
        <div className="text-center">
          <h2 className="text-text-primary text-h3 font-semibold mb-4">
            Стаття не знайдена
          </h2>
          <p className="text-text-secondary">
            Можливо, вона була видалена або переміщена.
          </p>
        </div>
      </div>
    );
  }

  if (articleLoading || !article) {
    return (
      <div className="pt-20" data-testid="article-loading">
        <ArticleSkeleton />
      </div>
    );
  }

  const relatedArticles = allArticles?.articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3) || [];

  const breadcrumbs = [
    { label: "Головна", href: "/" },
    { label: getCategoryLabel(article.category), href: getCategoryPath(article.category) },
    { label: article.title },
  ];

  return (
    <article className="pt-20" data-testid="page-article">
      <div className="max-w-[1200px] mx-auto px-6 pt-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="relative w-full h-[50vh] max-h-[600px] rounded-xl overflow-hidden mb-10">
          <img
            src={article.imageUrl || getArticleImageUrl(article.id)}
            alt={article.title}
            className="w-full h-full object-cover"
            data-testid="article-hero-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== PLACEHOLDER_IMAGE) {
                target.src = PLACEHOLDER_IMAGE;
              }
            }}
          />
          <Badge 
            className="absolute top-4 left-4 bg-amber-primary/90 text-bg-dark font-semibold text-body-xs uppercase tracking-wide border-0"
            data-testid="article-category-badge"
          >
            {getCategoryLabel(article.category)}
          </Badge>
        </div>

        {article.imagePhotographer && (
          <div className="max-w-[1200px] mx-auto mb-8 text-center" data-testid="image-attribution">
            <p className="text-text-tertiary text-body-xs italic flex items-center justify-center gap-1">
              <Camera className="w-3 h-3" />
              <span>Photo by</span>
              <a 
                href={article.imageCreditUrl || `https://unsplash.com/@${article.imagePhotographer.toLowerCase().replace(/\s+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-amber-primary hover:underline font-medium transition-colors"
                data-testid="photographer-link"
              >
                {article.imagePhotographer}
              </a>
              <span>on</span>
              <a 
                href="https://unsplash.com?utm_source=gradus_media&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-amber-primary hover:underline font-medium transition-colors"
                data-testid="unsplash-link"
              >
                Unsplash
              </a>
            </p>
          </div>
        )}

        <header className="max-w-[800px] mx-auto mb-10">
          <h1 
            className="text-text-primary text-2xl md:text-h1 font-bold leading-tight mb-6"
            data-testid="article-title"
          >
            {article.title}
          </h1>

          <div className="w-16 h-1 bg-amber-primary mb-6" />

          <div className="flex flex-wrap items-center gap-3 text-text-secondary text-body-sm">
            {article.publishedAt && (
              <time dateTime={new Date(article.publishedAt).toISOString()}>
                {formatDate(article.publishedAt)}
              </time>
            )}
            {article.author && (
              <>
                <span className="text-text-tertiary">•</span>
                <span>Автор: {article.author}</span>
              </>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="text-text-secondary hover:text-amber-primary"
                data-testid="share-facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-text-secondary hover:text-amber-primary"
                data-testid="share-twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-text-secondary hover:text-amber-primary"
                data-testid="share-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        <div 
          className="max-w-[800px] mx-auto prose prose-invert prose-lg prose-amber text-text-primary text-body-lg leading-relaxed [&_p]:mb-6 [&_h2]:text-h2 [&_h2]:text-text-primary [&_h2]:font-semibold [&_h2]:mt-12 [&_h2]:mb-6 [&_h3]:text-h3 [&_h3]:text-text-primary [&_h3]:font-semibold [&_h3]:mt-10 [&_h3]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-amber-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-text-secondary [&_blockquote]:my-8 [&_a]:text-amber-primary [&_a]:no-underline hover:[&_a]:underline [&_img]:rounded-lg [&_img]:my-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-2"
          data-testid="article-content"
        >
          <ReactMarkdown>
            {article.content}
          </ReactMarkdown>
        </div>

        {(article.source || article.sourceUrl) && (
          <div className="max-w-[800px] mx-auto mt-10 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-text-secondary text-body-sm">
              <span>Джерело:</span>
              {article.sourceUrl ? (
                <a 
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-primary hover:underline font-medium"
                  data-testid="article-source-link"
                >
                  {article.source || 'Посилання'}
                </a>
              ) : (
                <span className="font-medium" data-testid="article-source-text">{article.source}</span>
              )}
            </div>
          </div>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="max-w-[800px] mx-auto mt-10 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary"
                  className="text-body-xs"
                  data-testid={`tag-${tag}`}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <RelatedArticles 
          articles={relatedArticles} 
          isLoading={false}
        />
      </div>
    </article>
  );
}

function ArticleSkeleton() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-6">
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
      </div>

      <Skeleton className="w-full h-[50vh] max-h-[600px] rounded-xl mb-10" />

      <div className="max-w-[800px] mx-auto">
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-1 w-16 mb-6" />
        
        <div className="flex gap-3 mb-10">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-28" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
      </div>
    </div>
  );
}
