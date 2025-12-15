# Gradus Media Website

## Overview
Gradus Media is a premium AI-powered news platform for Ukraine's hospitality beverage industry (HoReCa). The website features a sophisticated amber-on-dark design with a unique Fibonacci masonry layout.

**Purpose:** Showcase automated industry news for hotel beverage managers, bar owners, and restaurant decision-makers in Ukraine.

**Current State:** MVP complete with full-stack implementation.

## Recent Changes
- **December 15, 2024:** Initial MVP launch
  - Implemented Fibonacci masonry grid layout
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
│   │   ├── FibonacciGrid.tsx
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
1. **Fibonacci Masonry Grid** - Dynamic article sizing based on importance
2. **Hero Section** - Full-width featured article display
3. **Article Cards** - Amber glow hover effects, category badges
4. **Responsive Design** - Adapts layout per device
5. **Ukrainian Content** - Sample HoReCa industry articles
6. **Framer Motion Animations** - Staggered entrance effects
