import { useMemo } from 'react';
import { classifyArticlesBatch, type Category } from '@/lib/categoryClassifier';
import type { Article } from '@shared/schema';

/**
 * Hook to categorize articles on the frontend
 * Returns articles filtered by the requested category
 */
export function useCategorizedArticles(
  articles: Article[] | undefined,
  requestedCategory: Category
): Article[] {
  return useMemo(() => {
    if (!articles || articles.length === 0) {
      return [];
    }

    // Classify all articles
    const categoryMap = classifyArticlesBatch(articles);

    // Filter by requested category
    const filtered = articles.filter(article => {
      const assignedCategory = categoryMap.get(article.id);
      return assignedCategory === requestedCategory;
    });

    return filtered;
  }, [articles, requestedCategory]);
}

/**
 * Hook to get all articles organized by category
 * Useful for the home page or overview
 */
export function useArticlesByCategory(
  articles: Article[] | undefined
): Record<Category, Article[]> {
  return useMemo(() => {
    const result: Record<Category, Article[]> = {
      'Новини': [],
      'Огляди': [],
      'Тренди': []
    };

    if (!articles || articles.length === 0) {
      return result;
    }

    // Classify all articles
    const categoryMap = classifyArticlesBatch(articles);

    // Group by category
    articles.forEach(article => {
      const category = categoryMap.get(article.id);
      if (category) {
        result[category].push(article);
      }
    });

    return result;
  }, [articles]);
}
