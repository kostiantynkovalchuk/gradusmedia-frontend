'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  published_at: string;
  read_time: number;
}

interface ArticleCardProps {
  article: Article;
  height: number;
  priority?: boolean;
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

export default function ArticleCard({ article, height, priority = false }: ArticleCardProps) {
  // Format date to Ukrainian
  const formattedDate = new Date(article.published_at).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Determine card size class for conditional styling
  const sizeClass = height >= 500 ? 'large' : height >= 400 ? 'medium' : 'small';

  return (
    <motion.article
      variants={itemVariants}
      className="article-card"
      data-size={sizeClass}
      style={{ height: `${height}px` }}
    >
      <Link href={`/article/${article.slug}`} className="card-link">
        {/* Image Container */}
        <div className="image-container">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority={priority}
            quality={85}
          />
          
          {/* Category Badge */}
          <span className="category-badge">
            {article.category}
          </span>
        </div>

        {/* Card Content */}
        <div className="card-content">
          <h3 className="headline">{article.title}</h3>
          
          {/* Excerpt (hidden on small cards via CSS) */}
          {article.excerpt && (
            <p className="excerpt">{article.excerpt}</p>
          )}
          
          {/* Meta Information */}
          <div className="meta">
            <time dateTime={article.published_at}>
              {formattedDate}
            </time>
            <span className="meta-separator">•</span>
            <span>{article.read_time} хв читання</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Loading skeleton component for use while fetching
export function ArticleCardSkeleton({ height }: { height: number }) {
  return (
    <div 
      className="article-card skeleton"
      style={{ height: `${height}px` }}
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
