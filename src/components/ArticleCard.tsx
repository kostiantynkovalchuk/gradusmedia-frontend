import { Link } from "wouter";
import { motion } from "framer-motion";
import type { Article } from "@shared/schema";
import { getArticleImageUrl } from "@/lib/queryClient";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800&q=80";

interface ArticleCardProps {
  article: Article;
  height?: number;
  priority?: boolean;
  className?: string;
  hideExcerpt?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

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

function getExcerpt(article: Article): string {
  if (article.excerpt) return article.excerpt;
  if (article.content) {
    const text = article.content.replace(/<[^>]*>/g, '');
    return text.length > 160 ? text.slice(0, 160).trim() + "..." : text;
  }
  return "";
}

function getCategoryLabel(category: string | null | undefined): string {
  if (!category) return "Новини";
  const categoryMap: Record<string, string> = {
    "news": "Новини",
    "reviews": "Огляди",
    "trends": "Тренди",
  };
  return categoryMap[category.toLowerCase()] || category;
}

export function ArticleCard({ article, height = 400, priority = false, className = "", hideExcerpt = false }: ArticleCardProps) {
  const sizeClass = height >= 500 ? "large" : height >= 400 ? "medium" : "small";
  const excerpt = getExcerpt(article);

  return (
    <motion.article
      variants={itemVariants}
      className={`article-card ${className}`}
      data-size={sizeClass}
      style={{ height: `${height}px` }}
      data-testid={`article-card-${article.id}`}
    >
      <Link 
        href={`/article/${article.id}`} 
        className="card-link"
        data-testid={`link-article-${article.id}`}
      >
        <div className="image-container">
          <img
            src={article.imageUrl || getArticleImageUrl(article.id)}
            alt={article.title}
            loading={priority ? "eager" : "lazy"}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== PLACEHOLDER_IMAGE) {
                target.src = PLACEHOLDER_IMAGE;
              }
            }}
          />
          <span
            className="category-badge"
            data-testid={`badge-category-${article.id}`}
          >
            {getCategoryLabel(article.category)}
          </span>
        </div>

        <div className="card-content">
          <h3 
            className="headline"
            data-testid={`title-${article.id}`}
          >
            {article.title}
          </h3>
          
          {!hideExcerpt && excerpt && (
            <p
              className="excerpt"
              data-testid={`excerpt-${article.id}`}
            >
              {excerpt}
            </p>
          )}
          
          <div className="meta">
            {article.publishedAt && (
              <time dateTime={new Date(article.publishedAt).toISOString()}>
                {formatDate(article.publishedAt)}
              </time>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function ArticleCardSkeleton({ height = 400 }: { height?: number }) {
  return (
    <div 
      className="article-card skeleton"
      style={{ height: `${height}px` }}
      data-testid="article-card-skeleton"
    >
      <div className="image-container" />
      <div className="card-content">
        <div className="skeleton-headline" />
        <div className="skeleton-excerpt" />
        <div className="skeleton-meta" />
      </div>
    </div>
  );
}
