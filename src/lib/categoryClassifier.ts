/**
 * Article Category Classifier
 *
 * Automatically assigns articles to categories based on keyword analysis
 * Ensures balanced distribution across Новини, Огляди, and Тренди
 */

export type Category = 'Новини' | 'Огляди' | 'Тренди';

interface CategoryKeywords {
  category: Category;
  keywords: string[];
  weight: number;
}

// Keywords for each category (Ukrainian and English)
const CATEGORY_KEYWORDS: CategoryKeywords[] = [
  {
    category: 'Новини',
    keywords: [
      // Ukrainian
      'новина', 'новини', 'анонс', 'оголошення', 'запуск', 'релі', 'подія', 'івент',
      'презентація', 'відкриття', 'закриття', 'зміни', 'оновлення',
      // English
      'news', 'announce', 'launch', 'release', 'event', 'opening', 'closing',
      'update', 'breaking', 'just', 'recently', 'today', 'yesterday'
    ],
    weight: 1.0
  },
  {
    category: 'Огляди',
    keywords: [
      // Ukrainian
      'огляд', 'рецензія', 'дегустація', 'смак', 'аромат', 'якість',
      'порівняння', 'тестування', 'оцінка', 'рейтинг', 'враження',
      'досвід', 'експертиза', 'думка', 'відгук',
      // English
      'review', 'tasting', 'taste', 'flavor', 'aroma', 'quality',
      'comparison', 'rating', 'expert', 'opinion', 'feedback', 'experience'
    ],
    weight: 1.0
  },
  {
    category: 'Тренди',
    keywords: [
      // Ukrainian
      'тренд', 'тенденція', 'прогноз', 'майбутнє', 'зростання', 'ринок',
      'аналіз', 'дослідження', 'статистика', 'інновація', 'розвиток',
      'популярн', 'модн', 'актуальн', 'перспектив',
      // English
      'trend', 'forecast', 'future', 'growth', 'market', 'analysis',
      'research', 'statistics', 'innovation', 'development', 'emerging',
      'popular', 'modern', 'perspective', 'outlook'
    ],
    weight: 1.0
  }
];

/**
 * Calculate category score for an article based on keyword matches
 * Uses simple substring matching since \b doesn't work with Cyrillic
 */
function calculateCategoryScore(
  text: string,
  keywords: string[]
): number {
  const lowerText = text.toLowerCase();
  let score = 0;

  for (const keyword of keywords) {
    // Use simple case-insensitive substring search
    // Count how many times the keyword appears
    const keywordLower = keyword.toLowerCase();
    let index = 0;
    while ((index = lowerText.indexOf(keywordLower, index)) !== -1) {
      score += 1;
      index += keywordLower.length;
    }
  }

  return score;
}

/**
 * Classify an article into a category based on its content
 * Title keywords have 5x weight, excerpt 2x, content 1x
 */
export function classifyArticle(
  title: string,
  content: string,
  excerpt?: string
): Category {
  const scores = CATEGORY_KEYWORDS.map(({ category, keywords, weight }) => {
    // Calculate scores with different weights for title, excerpt, and content
    const titleScore = calculateCategoryScore(title, keywords) * 5; // Title is most important
    const excerptScore = calculateCategoryScore(excerpt || '', keywords) * 2; // Excerpt is medium
    const contentScore = calculateCategoryScore(content.substring(0, 500), keywords) * 1; // Content is baseline

    return {
      category,
      score: (titleScore + excerptScore + contentScore) * weight
    };
  });

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  // If there's a clear winner (score > 0), return it
  if (scores[0].score > 0) {
    return scores[0].category;
  }

  // If no keywords matched, use round-robin or hash-based distribution
  return distributeEvenly(title);
}

/**
 * Fallback: Distribute articles evenly when no keywords match
 * Uses simple hash of title to ensure consistency
 */
function distributeEvenly(title: string): Category {
  const hash = title.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  const categories: Category[] = ['Новини', 'Огляди', 'Тренди'];
  return categories[hash % categories.length];
}

/**
 * Batch classify multiple articles based purely on keyword matching
 * No artificial balancing - articles go to the category they best match
 */
export function classifyArticlesBatch(
  articles: Array<{ id: number; title: string; content: string; excerpt?: string }>
): Map<number, Category> {
  const result = new Map<number, Category>();

  // Classify each article based on keyword scores
  for (const article of articles) {
    const category = classifyArticle(article.title, article.content, article.excerpt);
    result.set(article.id, category);
  }

  return result;
}

/**
 * Get category distribution statistics
 */
export function getCategoryDistribution(
  categoryMap: Map<number, Category>
): Record<Category, number> {
  const distribution: Record<Category, number> = {
    'Новини': 0,
    'Огляди': 0,
    'Тренди': 0
  };

  for (const category of categoryMap.values()) {
    distribution[category]++;
  }

  return distribution;
}
