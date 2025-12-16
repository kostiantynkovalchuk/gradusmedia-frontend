# Gradus Media Logo Assets

Optimized logo files for the Gradus Media website.

## PNG Files (All sizes)

### For Website Use:
- **logo-large.png** (512x512, 271KB) - High resolution for hero sections, social sharing
- **logo-medium.png** (256x256, 85KB) - Header logo, main navigation
- **logo-small.png** (128x128, 26KB) - Mobile header, thumbnails
- **favicon.png** (32x32, 2.7KB) - Browser tab icon
- **favicon.ico** (32x32, 4.2KB) - IE/older browser support

### Bonus:
- **logo-transparent.png** - Version with background removed (has some artifacts, use with caution)

## WebP Files (Better Compression!)

These are 80-90% smaller than PNG while maintaining quality. Use these for modern browsers:

- **logo-large.webp** (15KB vs 271KB PNG) - 94% smaller! ✨
- **logo-medium.webp** (6.2KB vs 85KB PNG) - 93% smaller! ✨  
- **logo-small.webp** (2.8KB vs 26KB PNG) - 89% smaller! ✨

## Recommended Usage in Next.js

```jsx
// In your Header component
<picture>
  <source srcSet="/logo-medium.webp" type="image/webp" />
  <img 
    src="/logo-medium.png" 
    alt="Gradus Media" 
    width={120}
    height={120}
  />
</picture>

// Or with Next.js Image component (auto-optimizes):
<Image 
  src="/logo-medium.png"
  alt="Gradus Media"
  width={120}
  height={120}
  priority
/>
```

## File Placement

Place all files in your Next.js project:
```
/public
  ├── logo-large.png
  ├── logo-large.webp
  ├── logo-medium.png
  ├── logo-medium.webp
  ├── logo-small.png
  ├── logo-small.webp
  └── favicon.ico
```

## Color Palette (Extracted from Logo)

- Amber Primary: `#F5B971`
- Amber Glow: `#FFD700`
- Dark Background: `#1A1410`
- Warm Brown: `#6B4423`

---

**Pro tip:** Next.js's Image component will automatically serve WebP to supported browsers while falling back to PNG for older ones. Just use the PNG path and Next.js handles the rest!
