import { useQuery } from "@tanstack/react-query";
import { HeroSection, HeroSkeleton } from "@/components/HeroSection";
import { MasonryGrid } from "@/components/MasonryGrid";
import type { ArticlesResponse } from "@shared/schema";

export default function Home() {
  const { data, isLoading, error } = useQuery<ArticlesResponse>({
    queryKey: ["/api/articles"],
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="error-state">
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

  const articles = data?.articles || [];
  const heroArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <main className="pt-20" data-testid="page-home">
      {isLoading ? (
        <HeroSkeleton />
      ) : heroArticle ? (
        <HeroSection article={heroArticle} />
      ) : null}

      <MasonryGrid 
        articles={gridArticles} 
        isLoading={isLoading} 
      />
    </main>
  );
}
