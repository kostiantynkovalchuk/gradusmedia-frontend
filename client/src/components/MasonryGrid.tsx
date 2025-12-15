import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArticleCard, ArticleCardSkeleton } from "./ArticleCard";
import type { Article } from "@shared/schema";

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

export function MasonryGrid({ articles, isLoading = false }: MasonryGridProps) {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else if (window.innerWidth < 1280) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columnArticles: Article[][] = Array.from({ length: columns }, () => []);
  
  articles.forEach((article, index) => {
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
        className="masonry-container"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
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
