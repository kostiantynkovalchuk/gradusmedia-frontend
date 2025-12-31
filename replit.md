# Gradus Media - Ukrainian HoReCa News Platform

## Overview

Gradus Media is an AI-powered news platform focused on the HoReCa (Hotels, Restaurants, Catering) and beverage industry in Ukraine. The platform automatically generates and displays news articles, reviews, and industry trends. It features a modern, dark-themed UI with amber accents, an AI chat assistant named "Maya" for business inquiries, and category-based article browsing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with custom design tokens (amber color palette, dark theme)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and micro-interactions

### Component Structure
- `src/components/` - Reusable UI components (ArticleCard, Header, Footer, etc.)
- `src/components/ui/` - shadcn/ui base components (Button, Card, Dialog, etc.)
- `src/pages/` - Route-level page components (home, article, category, chat, about)
- `src/hooks/` - Custom React hooks (use-mobile, use-toast)
- `src/lib/` - Utility functions and API client configuration

### Design Patterns
- **Component-based architecture**: Modular, reusable components with props interfaces
- **Path aliases**: `@/` for src imports, `@shared/` for shared schemas, `@assets/` for static assets
- **Centralized API client**: Query client with base URL configuration in `src/lib/queryClient.ts`
- **Shared type definitions**: Zod schemas in `shared/schema.ts` for type-safe article data

### Key Pages
1. **Home** (`/`) - Hero section with featured article, masonry grid of articles, Maya chat banner
2. **Article** (`/article/:id`) - Full article view with related articles
3. **Category** (`/category/:slug`) - Filtered articles by category (news, reviews, trends)
4. **Chat** (`/chat`) - AI assistant chat interface with session management
5. **About** (`/about`) - Company information page

## External Dependencies

### Backend API
- **Base URL**: `https://gradus-ai.onrender.com`
- **Endpoints**:
  - `GET /api/articles` - Fetch all articles
  - `GET /api/articles?category={slug}` - Fetch articles by category
  - `GET /api/images/serve/{articleId}` - Serve article images
  - Chat API for Maya assistant (session-based)

### Third-Party Libraries
- **Radix UI**: Accessible, unstyled UI primitives for dialogs, menus, tooltips, etc.
- **TanStack Query**: Data fetching, caching, and synchronization
- **react-markdown**: Markdown content rendering for articles
- **embla-carousel-react**: Carousel/slider functionality
- **date-fns**: Date formatting utilities
- **lucide-react**: Icon library
- **react-icons**: Additional icons (social media)
- **Zod**: Schema validation for type safety

### External Services
- **Google Fonts**: Inter font family
- **Unsplash**: Placeholder images for articles
- **Social Links**: Facebook, LinkedIn, Instagram integration in footer