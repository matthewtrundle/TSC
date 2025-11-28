# PlanoDerm - Headless Medical Dermatology Site

## Project Overview

This is a headless Next.js website for **The Surgery Center at Plano Dermatology**, a medical practice specializing in skin cancer surgery and Mohs micrographic surgery in Plano, Texas.

### Archon Project ID
`450c00c7-754f-4d6a-b047-3d8d46221bb1`

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Custom Properties
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Vercel (planned)

## Design Philosophy

This site's design is adapted from **Bloom Psychology's** design system, featuring:

- **Magazine-quality layouts** with asymmetric grids
- **Glass morphism** effects for modern depth
- **Professional medical color palette** (navy, teal, warm neutrals)
- **Multi-layer shadow system** for depth and hierarchy
- **Fluid typography** using CSS clamp() for responsive scaling

### Color Palette

| Color | Value | Usage |
|-------|-------|-------|
| Navy Primary | `#1e3a5f` | Headers, CTAs, authority |
| Teal Accent | `#4a9b9b` | Accents, health/healing |
| Cream | `#FFF8F0` | Backgrounds, warmth |
| Coral | `#e8907a` | Warm accents |
| Sage | `#8B9A82` | Balance, growth |

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Homepage with Bloom-style animations
│   ├── layout.tsx        # Root layout with Header/Footer
│   └── globals.css       # Design system CSS variables + Bloom enhancements
├── components/
│   ├── layout/
│   │   ├── Header.tsx    # Navigation with sticky header
│   │   └── Footer.tsx    # Footer with contact info
│   ├── ui/               # Bloom-inspired reusable components
│   │   ├── AnimatedSection.tsx      # Scroll-triggered animations
│   │   ├── AnimatedTagline.tsx      # Word rotation animation
│   │   ├── FloatingCTA.tsx          # Scroll-triggered floating banner
│   │   ├── GlassmorphismPanel.tsx   # Glass morphism variants
│   │   └── OrganicShape.tsx         # SVG blob backgrounds
│   └── sections/         # Page section components
└── lib/
    └── data/
        └── siteData.ts   # Central content data store
```

## Content Data

All site content is centralized in `src/lib/data/siteData.ts`:
- Site configuration (contact, hours, social)
- Navigation structure
- Doctor profiles (Dr. Modi, Dr. Wells, Dr. Parry)
- Services (Mohs Surgery, Medical Dermatology)
- Values and testimonials

## Remaining Tasks

Check Archon for current task status. Key remaining work:
- [ ] Create additional pages (Our Practice, Services, Team, Contact)
- [ ] Add images and optimize for production
- [ ] Implement contact form
- [ ] Configure Vercel deployment
- [ ] Add SEO structured data

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Reference Sites

- **Source Content**: [planoderm.pillarwebdesign.com](https://planoderm.pillarwebdesign.com/)
- **Design Reference**: Bloom Psychology (local at /Users/matthewrundle/Documents/bloom)

## Bloom Aesthetic Features Implemented

### Animations & Motion
- **Framer Motion** for scroll-triggered animations
- **AnimatedSection** component with directional reveals (up/down/left/right/fade)
- **Staggered animations** for grids and lists
- **Blob animations** for organic background shapes
- **FloatingCTA** that appears after scrolling

### Glass Morphism
- Multiple variants: subtle, medium, prominent, teal
- Backdrop blur with translucent backgrounds
- Hover border accent effects

### Visual Patterns
- **Geometric frames** around images (rotated pseudo-elements)
- **Trust badges** in pill format
- **Card accent borders** (top border highlights)
- **Gradient statistics** with background-clip text
- **Quote/testimonial styling** with decorative quotes
- **Dot pattern backgrounds** for subtle texture

### CSS Utilities Added
- `.glass-panel`, `.glass-panel-teal`, `.glass-panel-prominent`
- `.card-accent-top`, `.card-accent-top-navy`
- `.badge-pill`, `.badge-pill-teal`
- `.geometric-frame`
- `.stat-highlight`
- `.quote-accent`
- `.btn-lift`, `.btn-teal`
- `.hero-gradient`, `.bg-pattern-dots`
- `.animate-blob`, `.animation-delay-*`

## Notes

- Header has dual-row design (contact bar + navigation)
- Homepage features Bloom-style hero with floating stats card
- Glass morphism cards for values/features
- Gradient CTA sections
- 6-step Mohs surgery process prominently featured
- All animations respect `prefers-reduced-motion`
