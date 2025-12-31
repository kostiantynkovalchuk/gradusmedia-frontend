import { motion } from "framer-motion";
import { ArticleCard, ArticleCardSkeleton } from "./ArticleCard";
import type { Article } from "@shared/schema";

interface RelatedArticlesProps {
  articles: Article[];
  isLoading?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function RelatedArticles({ articles, isLoading = false }: RelatedArticlesProps) {
  if (isLoading) {
    return (
      <section 
        className="max-w-[1200px] mx-auto mt-20 pt-16 border-t border-amber-primary/10"
        data-testid="related-articles-loading"
      >
        <h2 className="text-text-primary text-2xl md:text-3xl font-semibold mb-8">
          Схожі статті
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-[320px]">
              <ArticleCardSkeleton height={320} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section 
      className="max-w-[1200px] mx-auto mt-20 pt-16 border-t border-amber-primary/10"
      data-testid="related-articles"
    >
      <h2 className="text-text-primary text-2xl md:text-3xl font-semibold mb-8">
        Схожі статті
      </h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {articles.map((article) => (
          <motion.div
            key={article.id}
            variants={itemVariants}
            className="h-[320px]"
          >
            <ArticleCard 
              article={article} 
              height={320}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
