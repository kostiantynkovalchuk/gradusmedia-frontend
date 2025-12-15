# Gradus Media Design Guidelines

## Design Approach
**Reference-Based Approach**: Premium news site inspired by sophisticated hospitality industry aesthetics - think spirits lounge meets modern journalism. Design differentiator is the unique Fibonacci masonry layout that visually prioritizes content by recency and importance.

## Core Design Elements

### A. Typography
**Font Family**: Inter (Google Fonts)
- Headings: Inter 600-700 (Semi-bold to Bold)
- Body: Inter 400-500 (Regular to Medium)
- Meta/Small: Inter 400 (Regular)

**Sizes**:
- H1: 3.5rem (56px) - Hero headlines
- H2: 2.5rem (40px) - Section headers
- H3: 1.75rem (28px) - Card headlines
- Body: 1rem (16px) - Standard text
- Small: 0.875rem (14px) - Meta info
- Tiny: 0.75rem (12px) - Timestamps

### B. Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Container padding: p-6 (mobile), p-8 (tablet), p-12 (desktop)
- Section gaps: gap-4 (mobile), gap-6 (tablet), gap-8 (desktop)
- Card padding: p-5 (20px)

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1199px
- Desktop: 1200px+

**Grid System**:
- Desktop: 4-column Fibonacci masonry (grid-cols-4, auto-rows-[280px], gap-6)
- Tablet: 2-column simplified (grid-cols-2, auto-rows-[320px], gap-5)
- Mobile: Single column stack (flex-col, gap-4)

### C. Component Library

**Header** (Fixed, 80px desktop / 64px mobile):
- Logo: 120px desktop, 80px mobile (left aligned)
- Navigation: Center aligned, 16px Inter Medium
- Background: rgba(26, 20, 16, 0.95) with backdrop blur
- Border: 1px solid rgba(245, 185, 113, 0.1) bottom

**Hero Section** (Homepage):
- Height: 70vh desktop, 50vh mobile
- Full-width image with gradient overlay (transparent to rgba(26, 20, 16, 0.8))
- Amber accent line: 60px × 3px
- Content: Bottom 20% left-aligned
- CTA button with amber background

**Article Cards**:
- Background: Linear gradient (135deg, #2B1810 to #1A1410)
- Border-radius: 8px
- Image container: 60% height with bottom gradient overlay
- Category badge: Absolute top-left, amber background (#F5B971), 12px padding
- Hover: translateY(-4px), amber glow shadow, 1px amber border
- Content: 40% height, 20px padding
- Headline: 2-line clamp, 1.25rem, weight 600
- Excerpt: 2-line clamp (shown on large cards only)
- Meta: Bottom-aligned, 0.75rem, gray text

**Fibonacci Sizing Pattern** (Desktop):
- Article 1 (newest): span 3 cols × 2 rows
- Article 2: span 2 cols × 2 rows
- Article 3-4: span 2 cols × 1 row
- Article 5: span 1 col × 2 rows
- Article 6-7: span 1 col × 1 row each
- Continue pattern with variations

**Footer**:
- Background: #0F0A06
- 4-column grid desktop (2fr 1fr 1fr 1fr), single column mobile
- Logo: 60px, brand description, navigation columns, social links
- Bottom bar: Copyright, AI tagline

### D. Animations
**Hover Effects**:
- Cards: Lift 4px up, amber glow shadow
- Images: Scale 1.05
- Links: Color shift to amber
- Buttons: Subtle glow increase

**Page Transitions**: Minimal - smooth 0.3s ease on interactive elements only

**Load Animations**: Stagger entrance for masonry cards (50ms delay each)

## Images

**Hero Section**:
- Full-width featured article image
- Aspect ratio: 21:9 (desktop), 16:9 (mobile)
- Gradient overlay from transparent (top) to dark (bottom 50%)
- Position: object-cover center

**Article Cards**:
- 60% of card height
- Aspect ratio: 16:9
- Gradient overlay on bottom 50%
- Category badge overlays top-left
- Hover: Slight zoom (scale 1.05)

**Article Detail Pages**:
- Hero image: Full-width, 50vh height
- In-content images: Max-width with proper margins
- All images: Next.js Image component with WebP optimization

**Logo Usage**:
- Header: /logo-medium.png (256x256) at 120px desktop, 80px mobile
- Footer: /logo-small.png (128x128) at 60px
- Favicon: /favicon.ico
- Use WebP versions (.webp) for modern browsers with PNG fallback

**Color Scheme**:
- Amber Primary: #F5B971
- Amber Neon (hover): #FFD700
- Dark Background: #1A1410
- Dark Darker (cards): #2B1810
- Dark Darkest (footer): #0F0A06
- Wood Accent: #6B4423
- Text Primary: #F5F5F0
- Text Secondary: #A09B94
- Text Tertiary: #6B6761