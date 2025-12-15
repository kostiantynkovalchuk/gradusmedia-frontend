# Gradus Media Website

## Overview
Gradus Media is a premium AI-powered news platform for Ukraine's hospitality beverage industry (HoReCa). The website features a sophisticated amber-on-dark design with a unique Fibonacci masonry layout.

**Purpose:** Showcase automated industry news for hotel beverage managers, bar owners, and restaurant decision-makers in Ukraine.

**Current State:** MVP complete with full-stack implementation.

## Recent Changes
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
│   │   ├── Breadcrumbs.tsx
│   │   ├── RelatedArticles.tsx
│   │   └── ui/         # Shadcn components
│   ├── pages/          # Page components
│   │   ├── home.tsx
│   │   ├── article.tsx
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

### API Endpoints
- `GET /api/articles` - List articles (with pagination, category filter)
- `GET /api/articles/:slug` - Get single article with related articles
- `GET /api/articles/search?q=query` - Search articles
- `GET /api/categories` - Get all categories

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
