'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from './ArticleCard';

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

interface MasonryGridProps {
  articles: Article[];
}

export default function MasonryGrid({ articles }: MasonryGridProps) {
  const [columns, setColumns] = useState(4);

  // Responsive column count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(1); // Mobile: stack
      } else if (window.innerWidth < 1024) {
        setColumns(2); // Tablet: 2 columns
      } else if (window.innerWidth < 1280) {
        setColumns(3); // Small desktop: 3 columns
      } else {
        setColumns(4); // Large desktop: 4 columns
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Distribute articles across columns (round-robin for even distribution)
  const columnArticles: Article[][] = Array.from({ length: columns }, () => []);
  
  articles.forEach((article, index) => {
    const columnIndex = index % columns;
    columnArticles[columnIndex].push(article);
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="masonry-container"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {columnArticles.map((columnArticles, columnIndex) => (
        <div key={columnIndex} className="masonry-column">
          {columnArticles.map((article, indexInColumn) => {
            // Calculate global index for size pattern
            const globalIndex = columnIndex + (indexInColumn * columns);
            const cardConfig = getCardConfig(globalIndex);
            
            return (
              <ArticleCard
                key={article.id}
                article={article}
                height={cardConfig.height}
                priority={globalIndex < 4} // Prioritize first 4 images
              />
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}

/**
 * Calculate card height based on Fibonacci-inspired pattern
 * This creates visual variety while maintaining hierarchy
 */
function getCardConfig(index: number) {
  // Fibonacci-inspired height patterns (in pixels)
  // Newest articles get taller cards for more prominence
  const patterns = [
    { height: 600 },  // Featured - biggest
    { height: 450 },  // Large
    { height: 520 },  // Large-medium
    { height: 380 },  // Medium
    { height: 500 },  // Large-medium
    { height: 420 },  // Medium
    { height: 360 },  // Small-medium
    { height: 480 },  // Medium-large
    { height: 400 },  // Medium
    { height: 540 },  // Large
    { height: 380 },  // Medium
    { height: 440 },  // Medium
  ];
  
  // Cycle through patterns
  return patterns[index % patterns.length];
}
