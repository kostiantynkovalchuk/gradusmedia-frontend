import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { ArticleCard, ArticleCardSkeleton } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCategorizedArticles } from "@/hooks/useCategorizedArticles";
import type { ArticlesResponse } from "@shared/schema";

// Client-side categorization system active

const categoryNames: Record<string, string> = {
  news: "Новини",
  reviews: "Огляди", 
  trends: "Тренди",
};

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

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const categoryName = categoryNames[slug || ""] || slug;

  // Fetch all articles (no category filter)
  const { data, isLoading, error } = useQuery<ArticlesResponse>({
    queryKey: ["/api/articles"],
  });

  // Client-side categorization
  const filteredArticles = useCategorizedArticles(
    data?.articles || [],
    categoryName as 'Новини' | 'Огляди' | 'Тренди'
  );

  const breadcrumbs = [
    { label: "Головна", href: "/" },
    { label: categoryName },
  ];

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" data-testid="error-state">
        <div className="text-center">
          <h2 className="text-text-primary text-h3 font-semibold mb-4">
            Щось пішло не так
          </h2>
          <p className="text-text-secondary">
            Не вдалося завантажити статті. Спробуйте пізніше.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20 min-h-screen" data-testid="page-category">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <header className="mb-10">
          <div className="w-16 h-1 bg-amber-primary mb-4" />
          <h1 
            className="text-text-primary text-h1 font-bold"
            data-testid="category-title"
          >
            {categoryName}
          </h1>
          {filteredArticles && (
            <p className="text-text-secondary text-body-md mt-2" data-testid="category-count">
              {filteredArticles.length} статей
            </p>
          )}
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="category-loading">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-[420px]">
                <ArticleCardSkeleton height={420} />
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            data-testid="category-grid"
          >
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                className="h-[420px]"
              >
                <ArticleCard
                  article={article}
                  height={420}
                  className="h-full"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredArticles.length === 0 && !isLoading && (
          <div className="text-center py-16" data-testid="empty-state">
            <p className="text-text-secondary text-body-lg">
              У цій категорії поки немає статей
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
