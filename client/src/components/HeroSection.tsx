import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@shared/schema";

interface HeroSectionProps {
  article: Article;
}

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function HeroSection({ article }: HeroSectionProps) {
  return (
    <section 
      className="relative w-full h-[70vh] md:h-[70vh] min-h-[500px] max-h-[800px]"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/60 to-transparent" />
      </div>

      <div className="relative h-full max-w-[1400px] mx-auto px-6 flex flex-col justify-end pb-12 md:pb-20">
        <Badge 
          className="w-fit mb-4 bg-amber-primary/90 text-bg-dark font-semibold text-body-xs uppercase tracking-wide border-0 hover:bg-amber-primary"
          data-testid="hero-category"
        >
          {article.category}
        </Badge>

        <div className="w-16 h-1 bg-amber-primary mb-6" />

        <h1 
          className="text-text-primary text-2xl md:text-h1 font-bold max-w-4xl mb-4 leading-tight"
          data-testid="hero-title"
        >
          {article.title}
        </h1>

        <p 
          className="text-text-secondary text-body-md md:text-body-lg max-w-2xl mb-6 line-clamp-2"
          data-testid="hero-excerpt"
        >
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link href={`/article/${article.slug}`} data-testid="link-hero-article">
            <Button 
              className="bg-amber-primary text-bg-dark font-semibold hover:bg-amber-neon hover:amber-glow transition-all"
              data-testid="button-hero-cta"
            >
              Читати далі
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <div className="flex items-center gap-2 text-text-tertiary text-body-sm">
            <time dateTime={new Date(article.publishedAt).toISOString()}>
              {formatDate(article.publishedAt)}
            </time>
            <span className="text-text-tertiary/50">•</span>
            <span>{article.readTime} хв читання</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <section 
      className="relative w-full h-[70vh] md:h-[70vh] min-h-[500px] max-h-[800px] bg-bg-darker animate-pulse"
      data-testid="hero-skeleton"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/60 to-transparent" />
      
      <div className="relative h-full max-w-[1400px] mx-auto px-6 flex flex-col justify-end pb-12 md:pb-20">
        <div className="h-6 w-24 bg-muted rounded mb-4" />
        <div className="w-16 h-1 bg-muted mb-6" />
        <div className="h-10 w-3/4 bg-muted rounded mb-4" />
        <div className="h-6 w-1/2 bg-muted rounded mb-6" />
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-muted rounded" />
          <div className="h-6 w-40 bg-muted rounded" />
        </div>
      </div>
    </section>
  );
}
