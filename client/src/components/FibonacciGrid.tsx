import { motion } from "framer-motion";
import { ArticleCard, ArticleCardSkeleton } from "./ArticleCard";
import type { Article } from "@shared/schema";

interface FibonacciGridProps {
  articles: Article[];
  isLoading?: boolean;
}

const fibonacciPattern = [
  { colSpan: 3, rowSpan: 2, size: "featured" as const },
  { colSpan: 2, rowSpan: 2, size: "large" as const },
  { colSpan: 2, rowSpan: 1, size: "medium" as const },
  { colSpan: 2, rowSpan: 1, size: "medium" as const },
  { colSpan: 1, rowSpan: 2, size: "medium" as const },
  { colSpan: 1, rowSpan: 1, size: "small" as const },
  { colSpan: 1, rowSpan: 1, size: "small" as const },
  { colSpan: 2, rowSpan: 1, size: "medium" as const },
  { colSpan: 1, rowSpan: 2, size: "medium" as const },
  { colSpan: 1, rowSpan: 1, size: "small" as const },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function FibonacciGrid({ articles, isLoading = false }: FibonacciGridProps) {
  if (isLoading) {
    return (
      <section className="max-w-[1400px] mx-auto px-6 py-12" data-testid="fibonacci-grid-loading">
        <h2 className="text-text-primary text-h2 font-bold mb-8">Останні новини</h2>
        <div className="hidden lg:grid grid-cols-4 auto-rows-[280px] gap-6">
          {fibonacciPattern.slice(0, 6).map((pattern, index) => (
            <div
              key={index}
              style={{
                gridColumn: `span ${pattern.colSpan}`,
                gridRow: `span ${pattern.rowSpan}`,
              }}
            >
              <ArticleCardSkeleton size={pattern.size} />
            </div>
          ))}
        </div>
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-[360px]">
              <ArticleCardSkeleton size="medium" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-12" data-testid="fibonacci-grid">
      <h2 className="text-text-primary text-h2 font-bold mb-8">Останні новини</h2>
      
      <motion.div
        className="hidden lg:grid grid-cols-4 auto-rows-[280px] gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        data-testid="grid-desktop"
      >
        {articles.map((article, index) => {
          const pattern = fibonacciPattern[index % fibonacciPattern.length];
          return (
            <motion.div
              key={article.id}
              style={{
                gridColumn: `span ${pattern.colSpan}`,
                gridRow: `span ${pattern.rowSpan}`,
              }}
              variants={itemVariants}
            >
              <ArticleCard 
                article={article} 
                size={pattern.size} 
                className="h-full"
              />
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="hidden md:grid lg:hidden grid-cols-2 auto-rows-[320px] gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        data-testid="grid-tablet"
      >
        {articles.map((article, index) => {
          const isFirst = index === 0;
          return (
            <motion.div
              key={article.id}
              style={{
                gridColumn: isFirst ? "span 2" : "span 1",
              }}
              variants={itemVariants}
            >
              <ArticleCard 
                article={article} 
                size={isFirst ? "large" : "medium"} 
                className="h-full"
              />
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="md:hidden flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        data-testid="grid-mobile"
      >
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            variants={itemVariants}
            className="h-[360px]"
          >
            <ArticleCard 
              article={article} 
              size={index === 0 ? "large" : "medium"} 
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
