# 🚀 QUICK START GUIDE - Gradus Media Website

## What You Have in This Package

1. **REPLIT_AGENT_BRIEF.md** - Complete technical specification (paste this into Replit Agent)
2. **Logo Assets** - Optimized PNG and WebP files
3. **LOGO_ASSETS_README.md** - Guide for logo usage
4. This quick start guide

---

## Step-by-Step Setup in Replit

### 1. Create New Repl

1. Go to Replit.com
2. Click **"Create Repl"** (or Build → Web App)
3. Choose template: **Next.js**
4. Name it: `gradus-media-website`
5. Click **"Create Repl"**

### 2. Upload Logo Files

Once the Repl is created:

1. In the file explorer, navigate to `/public` folder
2. Upload these files from your package:
   - `logo-large.png`
   - `logo-large.webp`
   - `logo-medium.png`
   - `logo-medium.webp`
   - `logo-small.png`
   - `logo-small.webp`
   - `favicon.ico`

### 3. Brief the Replit Agent

1. Open the Replit Agent (AI assistant in Replit)
2. Copy and paste **ENTIRE** `REPLIT_AGENT_BRIEF.md` content
3. Start with this initial prompt:

```
I need you to build a Next.js website based on the complete technical brief I'm providing below. 

Please start by:
1. Setting up the project structure
2. Installing required dependencies (Tailwind CSS, Framer Motion)
3. Creating the basic Header component with logo from /public/logo-medium.png
4. Setting up the Tailwind config with brand colors
5. Creating a simple homepage layout

Here's the full brief:

[PASTE ENTIRE REPLIT_AGENT_BRIEF.md HERE]
```

### 4. Iterate and Build

The agent will start building. After initial setup, you can ask it to:

```
"Now create the ArticleCard component with the specifications from the brief"

"Build the Fibonacci masonry grid layout for the homepage"

"Create the article detail page with breadcrumbs and related articles"
```

### 5. Configure Environment Variables

In Replit:
1. Click on "Secrets" or "Environment Variables" in the left sidebar
2. Add:
   ```
   Key: NEXT_PUBLIC_API_URL
   Value: https://your-gradus-backend.render.com
   ```

### 6. Test Locally

1. The site will auto-run in Replit
2. Open the preview window
3. Test responsiveness by resizing
4. Check all pages work

### 7. Deploy to Vercel

#### Connect to GitHub (from Replit):
1. In Replit, click the Git icon
2. Connect to GitHub
3. Push your code to a new repository

#### Deploy to Vercel:
1. Go to vercel.com
2. Click "Import Project"
3. Select your GitHub repository
4. Configure:
   - Framework: Next.js (auto-detected)
   - Environment Variables: Add `NEXT_PUBLIC_API_URL`
5. Click "Deploy"

#### Connect Domain:
1. In Vercel dashboard → Domains
2. Add `gradusmedia.org`
3. Follow DNS configuration instructions:
   ```
   Type: A Record
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait 24-48 hours for DNS propagation

---

## Important Notes

### API Integration
Your FastAPI backend needs to expose these endpoints:
- `GET /api/articles` - List articles
- `GET /api/articles/{slug}` - Get single article
- `GET /api/articles/search?q={query}` - Search

Make sure CORS is enabled on your backend:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://gradusmedia.org", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Testing Checklist
- [ ] Logo displays correctly in header
- [ ] Homepage masonry grid works on desktop
- [ ] Mobile layout stacks cards properly
- [ ] Article detail pages load correctly
- [ ] Images load and optimize properly
- [ ] Navigation works between pages
- [ ] Footer links are correct
- [ ] Site works on real mobile device

---

## Troubleshooting

**"Logo not showing"**
→ Check file path is `/logo-medium.png` (no /public prefix in code)

**"API calls failing"**
→ Verify NEXT_PUBLIC_API_URL is set in environment variables
→ Check backend CORS is enabled

**"Fibonacci grid looks wrong on mobile"**
→ This is expected! Mobile uses stacked layout, not grid

**"Images are huge file sizes"**
→ Make sure you're using Next.js Image component, not regular <img>

**"Fonts not loading"**
→ Check Inter is imported in app/layout.tsx

---

## Quick Reference

**Brand Colors:**
- Amber Primary: `#F5B971`
- Dark Background: `#1A1410`
- Text: `#F5F5F0`

**Font:** Inter (all weights)

**Breakpoints:**
- Mobile: < 768px (stacked)
- Tablet: 768-1199px (2-3 columns)
- Desktop: 1200px+ (4 columns Fibonacci)

---

## Need Help?

Common questions:

1. **"How do I add more pages?"**
   - Create new folder in `/app` (e.g., `/app/contact`)
   - Add `page.tsx` inside it
   - Route is automatically created

2. **"How do I customize colors?"**
   - Edit `tailwind.config.js`
   - Update color values in `theme.extend.colors`

3. **"How do I add analytics?"**
   - Add Google Analytics script to `app/layout.tsx`
   - Use Next.js `<Script>` component

---

## Timeline

**Week 1 (MVP):**
- Days 1-2: Basic structure, components
- Days 3-4: API integration, article pages
- Days 5-6: Responsive design, testing
- Day 7: Deploy to Vercel

**Week 2 (Polish):**
- Animations and transitions
- Search functionality
- SEO optimization
- Performance tuning
- Analytics integration

---

## Success Criteria

Your website is ready when:
✅ Homepage loads with real articles from API
✅ Masonry grid looks good on all devices
✅ Article detail pages work with proper formatting
✅ Navigation works smoothly
✅ Logo and branding consistent throughout
✅ Fast loading times (<2 seconds)
✅ Mobile responsive and touch-friendly
✅ SEO metadata is correct
✅ Site is live on gradusmedia.org

---

**Ready? Let's build! 🚀**

Start by creating the Repl and uploading logos, then paste the brief into the agent.
