import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArticleCard, ArticleCardSkeleton } from "./ArticleCard";
import type { Article } from "@shared/schema";
import { getArticleImageUrl } from "@/lib/queryClient";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800&q=80";

interface MasonryGridProps {
  articles: Article[];
  isLoading?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

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
    return text.length > 200 ? text.slice(0, 200).trim() + "..." : text;
  }
  return "";
}

function FeaturedCard({ article }: { article: Article }) {
  const excerpt = getExcerpt(article);
  
  return (
    <motion.article
      variants={itemVariants}
      className="featured-card"
      data-testid={`featured-card-${article.id}`}
    >
      <Link 
        href={`/article/${article.id}`} 
        className="featured-link"
        data-testid={`link-featured-${article.id}`}
      >
        <div className="featured-image">
          <img
            src={article.imageUrl || getArticleImageUrl(article.id)}
            alt={article.title}
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== PLACEHOLDER_IMAGE) {
                target.src = PLACEHOLDER_IMAGE;
              }
            }}
          />
          <span 
            className="category-badge"
            data-testid={`badge-featured-${article.id}`}
          >
            {article.category}
          </span>
        </div>

        <div className="featured-content">
          <h3 
            className="featured-headline"
            data-testid={`title-featured-${article.id}`}
          >
            {article.title}
          </h3>
          
          <p 
            className="featured-excerpt"
            data-testid={`excerpt-featured-${article.id}`}
          >
            {excerpt}
          </p>
          
          <div className="meta">
            {article.publishedAt && (
              <>
                <time dateTime={new Date(article.publishedAt).toISOString()}>
                  {formatDate(article.publishedAt)}
                </time>
                <span className="meta-separator">•</span>
              </>
            )}
            <span>{article.readTime || 5} хв читання</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function MasonryGrid({ articles, isLoading = false }: MasonryGridProps) {
  const [columns, setColumns] = useState(4);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      
      if (width < 768) {
        setColumns(1);
      } else if (width < 1024) {
        setColumns(2);
      } else if (width < 1280) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const featuredArticle = null;  // Disable featured card
  const gridArticles = isDesktop && articles.length > 0 ? articles.slice(1) : articles;

  const columnArticles: Article[][] = Array.from({ length: columns }, () => []);
  
  gridArticles.forEach((article, index) => {
    const columnIndex = index % columns;
    columnArticles[columnIndex].push(article);
  });

  if (isLoading) {
    const skeletonHeights = [600, 450, 520, 380, 500, 420, 360, 480, 400];
    return (
      <section className="py-12" data-testid="masonry-loading">
        <div className="masonry-container">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="masonry-column">
              {Array.from({ length: 3 }).map((_, idx) => {
                const globalIdx = colIndex + (idx * columns);
                return (
                  <ArticleCardSkeleton 
                    key={idx} 
                    height={skeletonHeights[globalIdx % skeletonHeights.length]} 
                  />
                );
              })}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12" data-testid="masonry-grid">
      <motion.div 
        className="masonry-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {featuredArticle && (
          <div className="featured-wrapper">
            <FeaturedCard article={featuredArticle} />
          </div>
        )}
        
        <div className="masonry-container">
          {columnArticles.map((colArticles, columnIndex) => (
            <div key={columnIndex} className="masonry-column">
              {colArticles.map((article, indexInColumn) => {
                const globalIndex = columnIndex + (indexInColumn * columns);
                const cardConfig = getCardConfig(globalIndex);
                
                return (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    height={cardConfig.height}
                    priority={globalIndex < 4}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function getCardConfig(index: number) {
  const patterns = [
    { height: 600 },
    { height: 450 },
    { height: 520 },
    { height: 380 },
    { height: 500 },
    { height: 420 },
    { height: 360 },
    { height: 480 },
    { height: 400 },
    { height: 540 },
    { height: 380 },
    { height: 440 },
  ];
  
  return patterns[index % patterns.length];
}
