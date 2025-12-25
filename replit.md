# Gradus Media Website

## Overview
Gradus Media is a premium AI-powered news platform for Ukraine's hospitality beverage industry (HoReCa). The website features a sophisticated amber-on-dark design with a unique Fibonacci masonry layout.

**Purpose:** Showcase automated industry news for hotel beverage managers, bar owners, and restaurant decision-makers in Ukraine.

**Current State:** MVP complete with full-stack implementation.

## Recent Changes
- **December 25, 2024:** Maya AI Chat Integration
  - Added MayaChatBanner component with 4 quick-start questions (cocktail trends, suppliers, cost reduction, licensing)
  - Added FloatingChatBubble component with ripple animation and question counter (appears after 400px scroll)
  - Created full /chat page with video hero placeholder, chat interface, and premium CTA
  - Updated Header navigation with highlighted "Чат з Maya" link using gradient text
  - Added Maya purple color variables to CSS (--purple-dark, --purple-medium, --purple-light)
  - Chat functionality: 5 free questions/day tracked in localStorage, integrates with backend API
  - Backend endpoint: https://gradus-ai.onrender.com/api/maya/chat

- **December 16, 2024:** External API Integration
  - Migrated from local Express backend to external FastAPI backend (https://gradus-ai.onrender.com)
  - Updated routing to use numeric article IDs (/article/:id) instead of slugs
  - Implemented image loading from API endpoint: /api/images/serve/{id}
  - Added safe date handling for optional publishedAt field
  - Added fallback placeholder images when API images fail to load
  - All components updated: HeroSection, MasonryGrid, ArticleCard, article page, RelatedArticles

- **December 15, 2024:** Enhanced Masonry Grid System
  - Replaced FibonacciGrid with new column-based MasonryGrid component
  - Responsive columns: 4 (desktop) → 3 (small desktop) → 2 (tablet) → 1 (mobile)
  - Fibonacci-inspired height patterns for visual variety (360-600px)
  - Round-robin article distribution for perfect fill (no gaps)
  - Updated ArticleCard with variable height support and framer-motion animations
  - Added comprehensive masonry CSS styles with shimmer loading skeletons
  
- **December 15, 2024:** Initial MVP launch
  - Created Header with logo, navigation, and mobile menu
  - Built Hero section with featured article
  - Designed ArticleCard components with amber glow hover effects
  - Created Article detail pages with breadcrumbs and related articles
  - Built Footer with multi-column navigation
  - Implemented backend API with sample Ukrainian HoReCa content

## User Preferences
- Ukrainian language for content
- Premium, sophisticated design (spirits lounge aesthetic)
- Amber/gold accent colors on dark background
- Inter font family
- Responsive design with Fibonacci layout on desktop

## Project Architecture

### Tech Stack
- **Frontend:** React + TypeScript + Tailwind CSS + Framer Motion
- **Backend:** Express.js
- **State Management:** TanStack React Query
- **Routing:** Wouter
- **Styling:** Tailwind CSS with custom design tokens

### Directory Structure
```
client/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MasonryGrid.tsx
│   │   ├── MayaChatBanner.tsx
│   │   ├── FloatingChatBubble.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── RelatedArticles.tsx
│   │   └── ui/         # Shadcn components
│   ├── pages/          # Page components
│   │   ├── home.tsx
│   │   ├── article.tsx
│   │   ├── chat.tsx
│   │   ├── about.tsx
│   │   └── not-found.tsx
│   ├── lib/           # Utilities
│   └── hooks/         # Custom hooks
server/
├── routes.ts          # API endpoints
├── storage.ts         # In-memory storage with sample data
└── index.ts           # Express server
shared/
└── schema.ts          # TypeScript types and Zod schemas
```

### External API (FastAPI on Render.com)
- **Base URL:** https://gradus-ai.onrender.com
- `GET /api/articles` - List articles (returns { articles: [], total: number, hasMore: boolean })
- `GET /api/articles/{id}` - Get single article by numeric ID
- `GET /api/articles/search?q=query` - Search articles
- `GET /api/images/serve/{id}` - Get article image by article ID
- `POST /api/maya/chat` - Maya AI chat endpoint (body: { message, sessionId })

### Design System
- **Primary Color:** Amber (#F5B971, HSL 36 85% 65%)
- **Background:** Dark charcoal (#1A1410)
- **Typography:** Inter font family
- **Breakpoints:** Mobile (<768px), Tablet (768-1199px), Desktop (1200px+)

## Key Features
1. **Column-Based Masonry Grid** - Responsive columns with Fibonacci-inspired heights (600, 450, 520, 380, 500, 420, 360, 480px pattern)
2. **Hero Section** - Full-width featured article display
3. **Article Cards** - Variable heights, amber glow hover effects, category badges
4. **Responsive Design** - 4/3/2/1 columns based on viewport, adapts layout per device
5. **Ukrainian Content** - Sample HoReCa industry articles
6. **Framer Motion Animations** - Staggered entrance effects with smooth card animations
7. **Maya AI Chat Integration** - Interactive AI consultant for HoReCa businesses
   - MayaChatBanner with 4 quick-start questions on homepage
   - FloatingChatBubble with ripple animation (appears after scroll)
   - Full /chat page with video hero, chat interface, and premium CTA
   - 5 free questions/day with upgrade path to premium subscription
   - Purple accent colors (#1a0f2e, #2d1b4e, #8b5cf6) maintaining amber design system
