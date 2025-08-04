# Sunny Pizza - Next.js Modern Website

🍕 A modern, responsive recreation of the Sunny Pizza website built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Live Development Server

The website is currently running at: **http://localhost:3000**

## ✨ Features

### 🎨 Modern Tech Stack
- **Next.js 14** - Latest React framework with App Router
- **React 18** - Modern React with hooks and server components
- **TypeScript** - Type-safe development
- **Tailwind CSS v3** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Swiper.js** - Touch-enabled sliders and carousels
- **Lucide React** - Beautiful icons

### 📱 Fully Responsive Design
- **Mobile-first approach** with responsive breakpoints
- **Optimized for all devices** (mobile, tablet, desktop)
- **Touch-friendly interactions** and navigation
- **Flexible grid layouts** that adapt to screen sizes

### 🎭 Interactive Components
- **Smooth scroll animations** triggered on viewport entry
- **Hero carousel** with fade transitions and auto-play
- **Interactive menu tabs** with animated content switching
- **Hover effects** and micro-interactions
- **Mobile-friendly navigation** with hamburger menu
- **Animated statistics** with count-up effects

### 🏗️ Component Architecture

#### Core Components
1. **Header** - Responsive navigation with mobile menu
2. **Hero** - Full-screen carousel with brand messaging
3. **SelfBaking** - Brand story section with animated features
4. **MenuShowcase** - Interactive menu display with tabs
5. **Statistics** - Animated company stats and achievements
6. **NewStores** - Store carousel showcasing new locations
7. **News** - News and events with featured articles
8. **StoreLocations** - Store finder with search and filtering
9. **Footer** - Comprehensive footer with company info

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main homepage
├── components/
│   ├── Header.tsx           # Navigation component
│   ├── Hero.tsx             # Hero carousel section
│   ├── SelfBaking.tsx       # Brand story section
│   ├── MenuShowcase.tsx     # Menu display component
│   ├── Statistics.tsx       # Stats display component
│   ├── NewStores.tsx        # New stores carousel
│   ├── News.tsx             # News and events section
│   ├── StoreLocations.tsx   # Store locator component
│   └── Footer.tsx           # Footer component
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Design System

### Color Palette
- **Primary Red**: `#e12800` - Brand color for CTAs and highlights
- **Dark Red**: `#c41e00` - Hover states and emphasis
- **Cream**: `#fff8f0` - Soft background sections
- **Light Gray**: `#f5f5f5` - Neutral backgrounds
- **Medium Gray**: `#666666` - Text and subtle elements

### Typography
- **Noto Sans KR** - Main body text (Google Fonts)
- **GmarketSans** - Headings and brand text (Korean web font)
- Custom font sizes: `display`, `hero`, `section` for different hierarchies

### Animations
- **Fade In**: Smooth opacity transitions
- **Slide Up/Left/Right**: Directional entrance animations
- **Zoom In**: Scale-based entrance effects
- **Hover Effects**: Interactive feedback on buttons and cards
- **Scroll-triggered**: Animations activate when elements enter viewport

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

5. **Run linting**:
   ```bash
   npm run lint
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## 📱 Responsive Breakpoints

The website is optimized for the following breakpoints:

- **Mobile**: `< 640px` - Single column layouts
- **Tablet**: `640px - 1024px` - Two column grids
- **Desktop**: `1024px+` - Full multi-column layouts

### Key Responsive Features
- **Mobile navigation** with collapsible hamburger menu
- **Flexible grid systems** that stack on smaller screens
- **Touch-optimized** buttons and interactive elements
- **Responsive typography** that scales appropriately
- **Optimized image sizing** for different screen densities

## 🎯 Performance Optimizations

- **Static generation** for faster page loads
- **Image optimization** with Next.js Image component
- **Code splitting** for smaller bundle sizes
- **Lazy loading** for images and components
- **Optimized fonts** with preloading
- **Minimal runtime** with tree-shaking

## 🔧 Customization

### Adding New Sections
1. Create a new component in `/components/`
2. Import and add to `/app/page.tsx`
3. Style with Tailwind classes
4. Add animations with Framer Motion

### Modifying Colors
Update the color palette in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      'dark-red': '#your-color',
      // ... other colors
    }
  }
}
```

### Customizing Animations
Modify animation variants in individual components or add new keyframes in `tailwind.config.js`.

## 🌟 Key Improvements Over Original

### Technical Enhancements
- **Modern React patterns** (hooks, functional components)
- **TypeScript safety** with type checking
- **Component-based architecture** for maintainability
- **Optimized performance** with Next.js optimizations
- **Better SEO** with meta tags and structured data

### User Experience
- **Faster loading times** with static generation
- **Smoother animations** with Framer Motion
- **Better mobile experience** with touch optimizations
- **Improved accessibility** with semantic HTML
- **Progressive enhancement** that works without JavaScript

### Developer Experience
- **Hot reloading** for faster development
- **TypeScript IntelliSense** for better code completion
- **ESLint integration** for code quality
- **Modern tooling** with Next.js ecosystem

## 📄 License

This project is a modern recreation of the Sunny Pizza website for demonstration purposes.

## 🤝 Contributing

This is a demonstration project showcasing modern web development practices with Next.js and React.

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**

*For technical questions or support, please refer to the Next.js documentation or create an issue in the project repository.* 