# GRADUS MEDIA WEBSITE - COMPLETE BUILD BRIEF

## 🎯 Project Overview
Build a modern, premium news website for Gradus Media (gradusmedia.org) - an AI-powered content platform for Ukraine's hospitality beverage industry (HoReCa). The site features a dynamic Fibonacci-based masonry layout showcasing automated industry news.

**Target Audience:** Hotel beverage managers, bar owners, restaurant decision-makers in Ukraine  
**Tone:** Professional, premium, sophisticated yet approachable  
**Primary Goal:** Showcase automated industry news, build credibility for investor meetings

---

## 🛠 Tech Stack

**Framework:** Next.js 14+ (App Router)  
**Styling:** Tailwind CSS  
**Language:** TypeScript (preferred) or JavaScript  
**Deployment:** Vercel  
**API:** FastAPI backend (will provide URL)  
**Content Language:** Ukrainian (UI can be English initially)

---

## 🎨 Brand Identity

### Color Palette
```css
/* Primary Colors */
--amber-primary: #F5B971;      /* Warm amber glow - main accent */
--amber-secondary: #D4A574;    /* Deeper amber - highlights */
--amber-neon: #FFD700;         /* Bright gold - hover/interactive */

/* Background Colors */
--bg-dark: #1A1410;            /* Deep charcoal - main background */
--bg-darker: #2B1810;          /* Darker sections - cards */
--bg-darkest: #0F0A06;         /* Darkest - footer */

/* Accent Colors */
--wood-accent: #6B4423;        /* Warm brown - borders/dividers */

/* Text Colors */
--text-primary: #F5F5F0;       /* Off-white/cream - main text */
--text-secondary: #A09B94;     /* Muted gray - meta info */
--text-tertiary: #6B6761;      /* Dimmer - timestamps */
```

### Typography
```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Font Weights */
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Heading Sizes */
--h1: 3.5rem;      /* 56px - Hero headlines */
--h2: 2.5rem;      /* 40px - Section headers */
--h3: 1.75rem;     /* 28px - Card headlines */
--h4: 1.25rem;     /* 20px - Subheadings */

/* Body Sizes */
--body-lg: 1.125rem;   /* 18px - Article content */
--body-md: 1rem;       /* 16px - Standard text */
--body-sm: 0.875rem;   /* 14px - Meta info */
--body-xs: 0.75rem;    /* 12px - Timestamps */
```

### Logo Assets
**Files provided:**
- `logo-large.png` (512x512) - Hero sections, social sharing
- `logo-medium.png` (256x256) - Header logo
- `logo-small.png` (128x128) - Mobile header
- `favicon.ico` (32x32) - Browser icon
- WebP versions of all above (use for performance)

**Logo Usage:**
- Header: 120x120px on desktop, 80x80px on mobile
- Glowing neon "G" on dark background
- Never place on light backgrounds

---

## 📐 Layout Structure

### Header Component
```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO: 120px]  GRADUS MEDIA                        [SEARCH] │
│                                                               │
│      Головна    Новини    Огляди    Тренди    Про нас       │
└─────────────────────────────────────────────────────────────┘
```

**Header Specifications:**
- **Position:** Fixed on scroll, backdrop blur effect
- **Height:** 80px desktop, 64px mobile
- **Background:** `rgba(26, 20, 16, 0.95)` with blur
- **Border:** 1px solid `rgba(245, 185, 113, 0.1)` at bottom
- **Logo:** Left aligned, 24px margin
- **Navigation:** Center aligned, Inter 500, 16px
- **Search:** Right aligned, icon button
- **Mobile:** Hamburger menu for navigation

**Navigation Items:**
1. Головна (Home) - `/`
2. Новини (News) - `/news`
3. Огляди (Reviews) - `/reviews`
4. Тренди (Trends) - `/trends`
5. Про нас (About) - `/about`

---

### Hero Section (Homepage Only)
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│        [FULL WIDTH IMAGE WITH GRADIENT OVERLAY]    │
│                                                     │
│     ─── AMBER ACCENT LINE ───                      │
│     LATEST ARTICLE HEADLINE                        │
│     Two-line excerpt preview text goes here...     │
│                                                     │
│     [Читати далі →]                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Hero Specifications:**
- **Height:** 70vh (desktop), 50vh (mobile)
- **Image:** Object-cover, center position
- **Overlay:** Linear gradient from transparent to `rgba(26, 20, 16, 0.8)`
- **Content Position:** Bottom 20%, left aligned
- **Headline:** h1 size, Inter 700, white
- **Accent Line:** 60px width, 3px height, amber-primary
- **Button:** Amber background, hover glow effect

---

### Masonry Grid Layout - FIBONACCI SIZING

**The Heart of the Design:** Articles displayed in a visually dynamic grid where size indicates recency and importance.

#### Desktop Layout (1200px+)

**Grid Configuration:**
```css
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-auto-rows: 280px;
gap: 24px;
```

**Fibonacci Pattern Ratios:**
```
Article 1 (newest):    grid-column: span 3; grid-row: span 2;
Article 2:             grid-column: span 2; grid-row: span 2;
Article 3:             grid-column: span 2; grid-row: span 1;
Article 4:             grid-column: span 2; grid-row: span 1;
Article 5:             grid-column: span 1; grid-row: span 2;
Article 6:             grid-column: span 1; grid-row: span 1;
Article 7:             grid-column: span 1; grid-row: span 1;
Article 8:             grid-column: span 2; grid-row: span 1;
Article 9:             grid-column: span 1; grid-row: span 2;
Article 10:            grid-column: span 1; grid-row: span 1;

...repeat pattern with variations...
```

**Key Principles:**
- Newest articles get largest space (3x2 or 2x2)
- Older articles gradually decrease in size
- No article smaller than 1x1 grid cell
- Mix of horizontal and vertical orientations
- Maintain visual balance - don't cluster all large articles

#### Tablet Layout (768-1199px)

**Grid Configuration:**
```css
grid-template-columns: repeat(2, 1fr);
grid-auto-rows: 320px;
gap: 20px;
```

**Simplified Ratios:**
```
Article 1:  span 2 columns, 1.5 rows
Article 2:  span 2 columns, 1 row
Article 3:  span 1 column, 1 row
Article 4:  span 1 column, 1 row
...continue 2-1-1 pattern...
```

#### Mobile Layout (<768px)

**Grid Configuration:**
```css
display: flex;
flex-direction: column;
gap: 16px;
```

**Equal Cards:**
- All cards same height: 360px
- Stack vertically
- Differentiate importance through:
  - Typography size
  - Category badge prominence
  - Image brightness

---

### Article Card Component

**Card Structure:**
```html
<article class="article-card">
  <div class="image-container">
    <img src="..." alt="..." />
    <span class="category-badge">КАТЕГОРІЯ</span>
  </div>
  <div class="content">
    <h3 class="headline">Article Headline Here</h3>
    <p class="excerpt">Brief excerpt text...</p>
    <div class="meta">
      <span class="date">15 грудня 2024</span>
      <span class="separator">•</span>
      <span class="read-time">5 хв читання</span>
    </div>
  </div>
</article>
```

**Card Styling:**
```css
.article-card {
  background: linear-gradient(135deg, #2B1810 0%, #1A1410 100%);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(245, 185, 113, 0.2),
              0 0 40px rgba(245, 185, 113, 0.1);
  border: 1px solid rgba(245, 185, 113, 0.3);
}

.image-container {
  position: relative;
  width: 100%;
  height: 60%;
  overflow: hidden;
}

.image-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(26, 20, 16, 0.9), transparent);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover img {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(245, 185, 113, 0.9);
  color: #1A1410;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
}

.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 40%;
}

.headline {
  color: #F5F5F0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.excerpt {
  color: #A09B94;
  font-size: 0.875rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* Hide on small cards */
  display: none;
}

/* Show excerpt on larger cards */
.article-card[data-size="large"] .excerpt,
.article-card[data-size="featured"] .excerpt {
  display: -webkit-box;
}

.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B6761;
  font-size: 0.75rem;
  margin-top: auto;
}
```

---

### Footer Component

```html
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-brand">
      <img src="/logo-small.png" alt="Gradus Media" />
      <h3>GRADUS MEDIA</h3>
      <p>Автоматизована платформа новин для HoReCa індустрії</p>
    </div>
    
    <div class="footer-links">
      <div class="link-column">
        <h4>Навігація</h4>
        <ul>
          <li><a href="/">Головна</a></li>
          <li><a href="/news">Новини</a></li>
          <li><a href="/reviews">Огляди</a></li>
          <li><a href="/trends">Тренди</a></li>
        </ul>
      </div>
      
      <div class="link-column">
        <h4>Компанія</h4>
        <ul>
          <li><a href="/about">Про нас</a></li>
          <li><a href="/contact">Контакти</a></li>
          <li><a href="/partnerships">Партнерство</a></li>
        </ul>
      </div>
      
      <div class="link-column">
        <h4>Правова інформація</h4>
        <ul>
          <li><a href="/privacy">Політика конфіденційності</a></li>
          <li><a href="/terms">Умови використання</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-social">
      <h4>Слідкуйте за нами</h4>
      <div class="social-links">
        <a href="#" aria-label="Facebook">FB</a>
        <a href="#" aria-label="LinkedIn">IN</a>
        <a href="#" aria-label="Instagram">IG</a>
      </div>
    </div>
  </div>
  
  <div class="footer-bottom">
    <p>© 2024 Gradus Media. Всі права захищені.</p>
    <p>Створено з використанням AI для HoReCa індустрії України</p>
  </div>
</footer>
```

**Footer Styling:**
```css
.site-footer {
  background: #0F0A06;
  border-top: 1px solid rgba(245, 185, 113, 0.1);
  padding: 60px 24px 24px;
  margin-top: 120px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.footer-brand img {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
}

.footer-brand h3 {
  color: #F5B971;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.footer-brand p {
  color: #A09B94;
  font-size: 0.875rem;
  line-height: 1.6;
}

.link-column h4 {
  color: #F5F5F0;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.link-column ul {
  list-style: none;
  padding: 0;
}

.link-column li {
  margin-bottom: 12px;
}

.link-column a {
  color: #A09B94;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.link-column a:hover {
  color: #F5B971;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(245, 185, 113, 0.1);
  border: 1px solid rgba(245, 185, 113, 0.2);
  border-radius: 8px;
  color: #F5B971;
  font-weight: 600;
  font-size: 0.75rem;
  text-decoration: none;
  transition: all 0.2s;
}

.social-links a:hover {
  background: rgba(245, 185, 113, 0.2);
  border-color: #F5B971;
  box-shadow: 0 0 20px rgba(245, 185, 113, 0.3);
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 32px;
  border-top: 1px solid rgba(245, 185, 113, 0.1);
  text-align: center;
  color: #6B6761;
  font-size: 0.875rem;
}

.footer-bottom p {
  margin: 8px 0;
}
```

---

## 📄 Article Detail Page

### Page Structure

```html
<article class="article-detail">
  <!-- Breadcrumbs -->
  <nav class="breadcrumbs">
    <a href="/">Головна</a>
    <span>›</span>
    <a href="/news">Новини</a>
    <span>›</span>
    <span>Article Title</span>
  </nav>
  
  <!-- Hero Image -->
  <div class="article-hero">
    <img src="..." alt="..." />
    <span class="category-badge">КАТЕГОРІЯ</span>
  </div>
  
  <!-- Article Header -->
  <header class="article-header">
    <h1>Article Headline Goes Here</h1>
    <div class="accent-line"></div>
    <div class="article-meta">
      <time datetime="2024-12-15">15 грудня 2024</time>
      <span>•</span>
      <span>5 хв читання</span>
      <span>•</span>
      <div class="share-buttons">
        <button>FB</button>
        <button>TW</button>
        <button>IN</button>
      </div>
    </div>
  </header>
  
  <!-- Article Content -->
  <div class="article-content">
    <p>Article content goes here...</p>
    <!-- Rich text content -->
  </div>
  
  <!-- Related Articles -->
  <section class="related-articles">
    <h2>Схожі статті</h2>
    <div class="related-grid">
      <!-- 3 article cards -->
    </div>
  </section>
</article>
```

### Styling Specifications

```css
.article-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #A09B94;
  font-size: 0.875rem;
  margin-bottom: 24px;
}

.breadcrumbs a {
  color: #A09B94;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumbs a:hover {
  color: #F5B971;
}

.article-hero {
  position: relative;
  width: 100%;
  height: 60vh;
  max-height: 600px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 40px;
}

.article-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-header {
  max-width: 800px;
  margin: 0 auto 40px;
}

.article-header h1 {
  color: #F5F5F0;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .article-header h1 {
    font-size: 2rem;
  }
}

.accent-line {
  width: 60px;
  height: 3px;
  background: #F5B971;
  margin-bottom: 24px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #A09B94;
  font-size: 0.875rem;
  flex-wrap: wrap;
}

.share-buttons {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.share-buttons button {
  padding: 6px 12px;
  background: rgba(245, 185, 113, 0.1);
  border: 1px solid rgba(245, 185, 113, 0.2);
  border-radius: 4px;
  color: #F5B971;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.share-buttons button:hover {
  background: rgba(245, 185, 113, 0.2);
  border-color: #F5B971;
}

.article-content {
  max-width: 800px;
  margin: 0 auto;
  color: #F5F5F0;
  font-size: 1.125rem;
  line-height: 1.8;
}

.article-content p {
  margin-bottom: 1.5rem;
}

.article-content h2 {
  color: #F5F5F0;
  font-size: 2rem;
  font-weight: 600;
  margin: 3rem 0 1.5rem;
}

.article-content h3 {
  color: #F5F5F0;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2.5rem 0 1rem;
}

.article-content img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 2rem 0;
}

.article-content blockquote {
  border-left: 3px solid #F5B971;
  padding-left: 24px;
  margin: 2rem 0;
  font-style: italic;
  color: #A09B94;
}

.article-content a {
  color: #F5B971;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.article-content a:hover {
  border-bottom-color: #F5B971;
}

.related-articles {
  max-width: 1200px;
  margin: 80px auto 0;
  padding-top: 60px;
  border-top: 1px solid rgba(245, 185, 113, 0.1);
}

.related-articles h2 {
  color: #F5F5F0;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 32px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 🔌 API Integration

### Backend Endpoints (FastAPI)

Your existing FastAPI backend needs these endpoints:

#### 1. Get Articles List
```
GET /api/articles

Query Parameters:
  - limit: int (default: 20, max: 100)
  - offset: int (default: 0)
  - category: string (optional)
  - sort: string (default: "published_at", options: "published_at", "views")

Response:
{
  "articles": [
    {
      "id": "uuid",
      "slug": "article-slug-here",
      "title": "Article Title",
      "excerpt": "Brief summary...",
      "content": "Full HTML content...",
      "image_url": "https://...",
      "category": "Новини",
      "published_at": "2024-12-15T10:00:00Z",
      "read_time": 5,
      "views": 1234
    }
  ],
  "total": 150,
  "has_more": true
}
```

#### 2. Get Single Article
```
GET /api/articles/{slug}

Response:
{
  "article": {
    "id": "uuid",
    "slug": "article-slug",
    "title": "...",
    "excerpt": "...",
    "content": "Full HTML content",
    "image_url": "https://...",
    "category": "Новини",
    "published_at": "2024-12-15T10:00:00Z",
    "updated_at": "2024-12-15T10:00:00Z",
    "read_time": 5,
    "views": 1234,
    "author": "Gradus AI",
    "tags": ["whisky", "trends", "horeca"]
  },
  "related_articles": [
    // 3 related articles with same structure as list
  ]
}
```

#### 3. Search Articles
```
GET /api/articles/search

Query Parameters:
  - q: string (search query)
  - limit: int (default: 10)

Response:
{
  "articles": [...],
  "total": 25,
  "query": "whisky"
}
```

#### 4. Get Categories
```
GET /api/categories

Response:
{
  "categories": [
    {
      "name": "Новини",
      "slug": "news",
      "count": 45
    },
    {
      "name": "Огляди",
      "slug": "reviews",
      "count": 23
    }
  ]
}
```

### Frontend API Client

Create `/lib/api.ts`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  published_at: string;
  read_time: number;
  views?: number;
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  has_more: boolean;
}

export async function getArticles(
  limit: number = 20,
  offset: number = 0
): Promise<ArticlesResponse> {
  const response = await fetch(
    `${API_URL}/api/articles?limit=${limit}&offset=${offset}`,
    {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  
  return response.json();
}

export async function getArticle(slug: string): Promise<Article> {
  const response = await fetch(`${API_URL}/api/articles/${slug}`, {
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }
  
  const data = await response.json();
  return data.article;
}

export async function searchArticles(query: string): Promise<ArticlesResponse> {
  const response = await fetch(
    `${API_URL}/api/articles/search?q=${encodeURIComponent(query)}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to search articles');
  }
  
  return response.json();
}
```

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.render.com
```

---

## 🎭 Animations & Interactions

### Page Transitions
Use Framer Motion for smooth page transitions:

```typescript
// app/layout.tsx
import { AnimatePresence } from 'framer-motion';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}
```

### Card Entrance Animation
```typescript
// Stagger effect for article cards
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="show"
>
  {articles.map(article => (
    <motion.div key={article.id} variants={itemVariants}>
      <ArticleCard article={article} />
    </motion.div>
  ))}
</motion.div>
```

### Hover Effects
```css
/* Glow effect on hover */
.article-card:hover {
  box-shadow: 
    0 8px 24px rgba(245, 185, 113, 0.2),
    0 0 40px rgba(245, 185, 113, 0.15),
    inset 0 0 60px rgba(245, 185, 113, 0.05);
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 📱 Responsive Design Breakpoints

```css
/* Mobile First Approach */

/* Extra small devices (phones) */
@media (min-width: 0px) {
  /* Base styles - mobile */
}

/* Small devices (large phones) */
@media (min-width: 640px) {
  /* sm: breakpoint */
}

/* Medium devices (tablets) */
@media (min-width: 768px) {
  /* md: breakpoint */
  /* Switch to 2-column grid */
}

/* Large devices (laptops) */
@media (min-width: 1024px) {
  /* lg: breakpoint */
  /* Switch to 3-column grid */
}

/* Extra large devices (desktops) */
@media (min-width: 1280px) {
  /* xl: breakpoint */
  /* Full 4-column Fibonacci grid */
}

/* 2XL devices (large desktops) */
@media (min-width: 1536px) {
  /* 2xl: breakpoint */
  /* Max-width container, same grid */
}
```

---

## 🚀 Performance Optimization

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src={article.image_url}
  alt={article.title}
  width={800}
  height={450}
  loading="lazy"
  placeholder="blur"
  blurDataURL={article.blur_placeholder}
/>
```

### Code Splitting
```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const SearchModal = dynamic(() => import('./SearchModal'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});
```

### Fonts
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🔍 SEO Configuration

### Metadata Template
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Gradus Media | Новини HoReCa індустрії',
    template: '%s | Gradus Media'
  },
  description: 'Автоматизована платформа новин для готельно-ресторанного бізнесу України',
  keywords: ['HoReCa', 'напої', 'алкоголь', 'готелі', 'ресторани', 'бари', 'Україна'],
  authors: [{ name: 'Gradus Media' }],
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://gradusmedia.org',
    siteName: 'Gradus Media',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gradusmedia',
  },
  robots: {
    index: true,
    follow: true,
  }
};
```

### Article Metadata
```typescript
// app/article/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image_url],
      type: 'article',
      publishedTime: article.published_at,
    }
  };
}
```

### Sitemap
```typescript
// app/sitemap.ts
export default async function sitemap() {
  const articles = await getArticles(1000, 0);
  
  const articleUrls = articles.articles.map(article => ({
    url: `https://gradusmedia.org/article/${article.slug}`,
    lastModified: article.published_at,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  
  return [
    {
      url: 'https://gradusmedia.org',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articleUrls,
  ];
}
```

---

## 📁 Project Structure

```
gradus-media-website/
├── app/
│   ├── layout.tsx                 # Root layout with header/footer
│   ├── page.tsx                   # Homepage (hero + masonry grid)
│   ├── globals.css                # Global styles & Tailwind
│   ├── article/
│   │   └── [slug]/
│   │       └── page.tsx           # Article detail page
│   ├── about/
│   │   └── page.tsx               # About page
│   ├── news/
│   │   └── page.tsx               # News category page
│   ├── reviews/
│   │   └── page.tsx               # Reviews category
│   ├── trends/
│   │   └── page.tsx               # Trends category
│   ├── sitemap.ts                 # Dynamic sitemap
│   └── robots.ts                  # Robots.txt config
├── components/
│   ├── Header.tsx                 # Site header with nav
│   ├── Footer.tsx                 # Site footer
│   ├── ArticleCard.tsx            # Reusable article card
│   ├── MasonryGrid.tsx            # Fibonacci masonry layout
│   ├── HeroArticle.tsx            # Featured article hero
│   ├── SearchBar.tsx              # Search functionality
│   ├── CategoryBadge.tsx          # Category badge component
│   └── ShareButtons.tsx           # Social share buttons
├── lib/
│   ├── api.ts                     # API client functions
│   ├── utils.ts                   # Utility functions
│   └── constants.ts               # Site constants
├── public/
│   ├── logo-large.png             # 512x512 logo
│   ├── logo-large.webp            # WebP version
│   ├── logo-medium.png            # 256x256 logo
│   ├── logo-medium.webp           # WebP version
│   ├── logo-small.png             # 128x128 logo
│   ├── logo-small.webp            # WebP version
│   ├── favicon.ico                # Browser icon
│   └── og-image.jpg               # Social sharing image
├── .env.local                     # Environment variables
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript config
└── package.json                   # Dependencies
```

---

## 🎨 Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          primary: '#F5B971',
          secondary: '#D4A574',
          neon: '#FFD700',
        },
        dark: {
          DEFAULT: '#1A1410',
          darker: '#2B1810',
          darkest: '#0F0A06',
        },
        wood: '#6B4423',
        cream: {
          DEFAULT: '#F5F5F0',
          secondary: '#A09B94',
          tertiary: '#6B6761',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': '3.5rem',
        'section': '2.5rem',
        'card': '1.75rem',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(245, 185, 113, 0.2)',
        'glow-lg': '0 0 60px rgba(245, 185, 113, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "tailwindcss": "^3.3.0",
    "@tailwindcss/typography": "^0.5.10"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 🚢 Deployment to Vercel

### 1. Connect Repository
- Push code to GitHub
- Connect repository in Vercel dashboard

### 2. Configure Project
```
Framework Preset: Next.js
Build Command: npm run build (default)
Output Directory: .next (default)
Install Command: npm install (default)
```

### 3. Environment Variables
Add in Vercel dashboard:
```
NEXT_PUBLIC_API_URL = https://your-backend.render.com
```

### 4. Domain Configuration
- Add gradusmedia.org in Vercel domains
- Update DNS records:
  ```
  Type: A
  Name: @
  Value: 76.76.21.21

  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
  ```

### 5. Deploy
- Automatic deploys on push to main branch
- Preview deploys for pull requests

---

## ✅ Phase 1 Checklist (MVP - Week 1)

**Setup:**
- [ ] Create Next.js project with TypeScript
- [ ] Install dependencies (Tailwind, Framer Motion)
- [ ] Configure Tailwind with brand colors
- [ ] Set up environment variables

**Components:**
- [ ] Header component with logo and navigation
- [ ] Footer component with links and social
- [ ] ArticleCard component with hover effects
- [ ] MasonryGrid component with Fibonacci logic

**Pages:**
- [ ] Homepage with hero section
- [ ] Homepage with masonry grid
- [ ] Article detail page with breadcrumbs
- [ ] Article content rendering
- [ ] Related articles section

**Integration:**
- [ ] API client functions
- [ ] Connect to FastAPI backend
- [ ] Error handling and loading states
- [ ] Image optimization

**Responsive:**
- [ ] Mobile layout (stacked cards)
- [ ] Tablet layout (2-column grid)
- [ ] Desktop layout (4-column Fibonacci)
- [ ] Test on real devices

**Deploy:**
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Configure environment variables
- [ ] Test production build

---

## 🎯 Phase 2 Enhancements (Week 2)

- [ ] Animations (page transitions, card entrance)
- [ ] Search functionality with modal
- [ ] Category filtering
- [ ] About page content
- [ ] Contact form
- [ ] SEO optimization (metadata, sitemap)
- [ ] Performance tuning (lazy loading, code splitting)
- [ ] Google Analytics integration
- [ ] Newsletter signup popup
- [ ] Social share analytics

---

## 🔧 Troubleshooting

**Common Issues:**

1. **Images not loading:**
   - Check Next.js config allows external image domains
   - Verify image URLs from API are valid

2. **Fibonacci grid looks wrong:**
   - Ensure grid-template-columns is set correctly
   - Check that grid-auto-rows matches design (280px)
   - Verify article card span values

3. **API connection fails:**
   - Check NEXT_PUBLIC_API_URL is set correctly
   - Verify backend is running and accessible
   - Check CORS is enabled on backend

4. **Fonts not loading:**
   - Ensure Inter is imported in layout.tsx
   - Check font-family is applied via className

5. **Dark mode issues:**
   - Verify all colors use theme variables
   - Check contrast ratios for accessibility

---

## 📞 Questions for Konstantin

After initial build, need clarification on:

1. **Backend API URL:** What's the production URL on Render.com?
2. **Content structure:** Does the API return HTML content or markdown?
3. **Categories:** What are the exact category names in Ukrainian?
4. **Social links:** What are the actual Facebook/LinkedIn/Instagram URLs?
5. **About page content:** What should the about page say?
6. **Analytics:** Do you have a Google Analytics tracking ID?

---

## 🎓 Development Best Practices

1. **Start Simple:** Build basic version first, then enhance
2. **Test Responsive:** Check on real mobile devices, not just browser
3. **Performance First:** Optimize images, lazy load components
4. **Semantic HTML:** Use proper tags (article, nav, header, footer)
5. **Accessibility:** Add alt text, ARIA labels, keyboard navigation
6. **Error Handling:** Always handle API failures gracefully
7. **Loading States:** Show skeletons while content loads
8. **Git Commits:** Small, focused commits with clear messages

---

## 🚀 Let's Build!

**Start with this command in Replit:**

1. Select **Next.js** template
2. Name it `gradus-media-website`
3. Paste this brief in the Replit Agent prompt
4. Upload logo files to `/public` directory
5. Run `npm run dev` to start development server

**First steps for the agent:**
```
"Build the basic Next.js structure with:
1. Header component with logo from /public/logo-medium.png
2. Simple homepage layout
3. Basic ArticleCard component
4. Tailwind config with brand colors from the brief
5. Responsive layout working on mobile/desktop"
```

Good luck! 🎉
