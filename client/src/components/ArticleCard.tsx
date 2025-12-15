import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@shared/schema";

interface ArticleCardProps {
  article: Article;
  size?: "small" | "medium" | "large" | "featured";
  className?: string;
}

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ArticleCard({ article, size = "medium", className = "" }: ArticleCardProps) {
  const isLarge = size === "large" || size === "featured";
  
  return (
    <Link href={`/article/${article.slug}`} data-testid={`link-article-${article.slug}`}>
      <article 
        className={`group relative overflow-hidden rounded-lg bg-gradient-to-br from-bg-darker to-bg-dark cursor-pointer article-card-glow border border-transparent hover:border-amber-primary/30 ${className}`}
        data-size={size}
        data-testid={`article-card-${article.slug}`}
      >
        <div className="relative h-[60%] overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 gradient-overlay" />
          <Badge 
            className="absolute top-3 left-3 bg-amber-primary/90 text-bg-dark font-semibold text-body-xs uppercase tracking-wide border-0 hover:bg-amber-primary"
            data-testid={`badge-category-${article.slug}`}
          >
            {article.category}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 p-5 h-[40%]">
          <h3 
            className={`text-text-primary font-semibold line-clamp-2 ${
              isLarge ? "text-h4 md:text-h3" : "text-h4"
            }`}
            data-testid={`title-${article.slug}`}
          >
            {article.title}
          </h3>

          {isLarge && (
            <p 
              className="text-text-secondary text-body-sm line-clamp-2"
              data-testid={`excerpt-${article.slug}`}
            >
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center gap-2 mt-auto text-text-tertiary text-body-xs">
            <time dateTime={new Date(article.publishedAt).toISOString()}>
              {formatDate(article.publishedAt)}
            </time>
            <span className="text-text-tertiary/50">•</span>
            <span>{article.readTime} хв читання</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function ArticleCardSkeleton({ size = "medium" }: { size?: string }) {
  return (
    <div 
      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-bg-darker to-bg-dark animate-pulse"
      data-testid="article-card-skeleton"
    >
      <div className="h-[60%] bg-muted" />
      <div className="flex flex-col gap-3 p-5 h-[40%]">
        <div className="h-4 bg-muted rounded w-20" />
        <div className="h-5 bg-muted rounded w-full" />
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="flex gap-2 mt-auto">
          <div className="h-3 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-16" />
        </div>
      </div>
    </div>
  );
}
