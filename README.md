# ThinkALM Landing Page

Modern, high-converting landing page for ThinkALM - The AI Sales OS Built for Real Estate.

## 🌟 Features

### ✅ High Priority Improvements (Implemented)
- **Functional Calendly Integration** - Book demo buttons open Calendly booking page
- **Mobile Navigation** - Full-screen overlay menu for mobile/tablet
- **Google Analytics 4** - Complete event tracking and analytics
- **WCAG 2.1 AA Accessibility** - Full keyboard navigation, ARIA labels, high contrast
- **Production Tailwind CSS** - Optimized build (12KB vs 3MB+, 90% reduction)

### 🎨 Design
- Modern dark theme with teal brand color (#2CC5A1)
- Glass-card effects and smooth animations
- Interactive dashboard mockup preview
- Responsive design for all devices

### 📊 Analytics Tracking
- CTA click tracking (with location)
- Scroll depth monitoring (25%, 50%, 75%, 100%)
- Calendly event tracking
- Section view tracking

### ♿ Accessibility
- Keyboard navigation support
- Skip-to-content link
- ARIA labels and semantic HTML
- Focus indicators on all interactive elements
- High contrast color scheme (WCAG 2.1 AA compliant)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- A Calendly account (for demo bookings)
- Google Analytics 4 property (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/charlieunitedcs-byte/Landing-page---Think-ALM.git
   cd Landing-page---Think-ALM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your configuration:
   ```
   VITE_CALENDLY_URL=https://calendly.com/your-username/demo
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Visit http://localhost:3000

5. **Build for production**
   ```bash
   npm run build
   npm run preview  # Preview production build
   ```

## 📁 Project Structure

```
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # Reusable button component
│   │   └── Section.tsx       # Section wrapper components
│   ├── CalendlyModal.tsx     # Calendly booking modal
│   └── MobileMenu.tsx        # Mobile navigation menu
├── src/
│   ├── utils/
│   │   └── analytics.ts      # Google Analytics helpers
│   └── index.css             # Tailwind + custom styles
├── App.tsx                   # Main application component
├── index.tsx                 # Application entry point
├── index.html                # HTML template
├── postcss.config.js         # PostCSS configuration
├── package.json              # Dependencies
└── .env.example              # Environment variables template
```

## 🎯 Features in Detail

### Calendly Integration
All "Book a Demo" buttons open an iframe modal with your Calendly booking page. No authentication required - visitors can book directly.

**Locations:**
- Navigation bar
- Hero section
- Mobile menu
- Final CTA section

### Mobile Navigation
Responsive hamburger menu appears on screens < 768px. Features:
- Full-screen overlay
- Backdrop blur effect
- Focus trap for accessibility
- ESC key to close
- Smooth animations

### Analytics Events
Track user behavior with these custom events:
- `cta_click` - Button clicks with location
- `calendly_opened` - Modal opened
- `calendly_scheduled` - Booking completed
- `scroll_depth` - Scroll milestones
- `see_platform_click` - Platform demo clicks

### Accessibility Features
- **Keyboard navigation** - Full site navigable via Tab key
- **Skip link** - Jump to main content (visible on focus)
- **ARIA labels** - Proper labeling for screen readers
- **Color contrast** - WCAG 2.1 AA compliant
- **Focus indicators** - Brand-colored focus rings

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons
- **React Calendly** - Booking integration

## 📦 Build Output

Production build metrics:
- **CSS**: 12.41 KB (2.76 KB gzipped)
- **JS**: 260 KB (75.78 KB gzipped)
- **Total**: ~272 KB (optimized)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CALENDLY_URL` | Your Calendly booking URL | Yes |
| `VITE_GA4_MEASUREMENT_ID` | Google Analytics 4 ID | Optional |

### Customization

**Brand Colors** - Edit `src/index.css`:
```css
@theme {
  --color-brand-500: #2CC5A1; /* Your brand color */
  --color-dark-950: #050505;  /* Background */
}
```

**Copy/Content** - Edit `App.tsx` to update:
- Headlines
- Descriptions
- Pricing
- Features

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop the dist/ folder to Netlify
```

### GitHub Pages
Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

## 📝 License

MIT License - feel free to use for your projects

## 🙏 Credits

Built with [Claude Code](https://claude.com/claude-code) - Anthropic's AI coding assistant

---

**Questions?** Open an issue or contact support@thinkalm.com
