import { Link } from "wouter";
import { motion } from "framer-motion";
import type { Article } from "@shared/schema";

interface ArticleCardProps {
  article: Article;
  height?: number;
  priority?: boolean;
  className?: string;
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

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ArticleCard({ article, height = 400, priority = false, className = "" }: ArticleCardProps) {
  const sizeClass = height >= 500 ? "large" : height >= 400 ? "medium" : "small";

  return (
    <motion.article
      variants={itemVariants}
      className={`article-card ${className}`}
      data-size={sizeClass}
      style={{ height: `${height}px` }}
      data-testid={`article-card-${article.slug}`}
    >
      <Link 
        href={`/article/${article.slug}`} 
        className="card-link"
        data-testid={`link-article-${article.slug}`}
      >
        <div className="image-container">
          <img
            src={article.imageUrl}
            alt={article.title}
            loading={priority ? "eager" : "lazy"}
          />
          <span 
            className="category-badge"
            data-testid={`badge-category-${article.slug}`}
          >
            {article.category}
          </span>
        </div>

        <div className="card-content">
          <h3 
            className="headline"
            data-testid={`title-${article.slug}`}
          >
            {article.title}
          </h3>
          
          {article.excerpt && (
            <p 
              className="excerpt"
              data-testid={`excerpt-${article.slug}`}
            >
              {article.excerpt}
            </p>
          )}
          
          <div className="meta">
            <time dateTime={new Date(article.publishedAt).toISOString()}>
              {formatDate(article.publishedAt)}
            </time>
            <span className="meta-separator">•</span>
            <span>{article.readTime} хв читання</span>
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
