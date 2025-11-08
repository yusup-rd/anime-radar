# AnimeRadar 🎌

A modern, feature-rich anime search application built with React, TypeScript, Tailwind CSS, Redux and Jikan API. Search through thousands of anime titles with advanced filtering, instant search, and a beautiful Netflix-inspired UI.

## � Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Bonus Implementation](#-bonus-implementation)
- [Tech Stack](#️-tech-stack)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#️-project-structure)
- [Key Features Explained](#-key-features-explained)
- [API Integration](#-api-integration)
- [Design Decisions](#-design-decisions)
- [Responsive Breakpoints](#-responsive-breakpoints)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## �🚀 Live Demo

[View Live Application](#)

## ✨ Features

### Core Functionality

- **Instant Search** - Real-time search with 250ms debouncing for optimal performance
- **Server-Side Pagination** - Navigate through search results with smooth pagination
- **Advanced Filtering** - Filter by type, status, rating, score range, genres, and more
- **Detail Pages** - Netflix-style cinematic detail pages with hero banners
- **Redux State Management** - Centralized state management with Redux Toolkit
- **TypeScript** - Fully typed for enhanced development experience and code quality

### User Experience

- **Dark Theme** - Modern dark color scheme with custom Poppins font
- **Sticky Navigation** - Header follows you as you scroll for easy access
- **Smart Search Behavior** - Search clears on navigation, auto-navigates when typing on detail pages
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop devices
- **Skeleton Loaders** - Professional loading states that match content structure

## 🏆 Bonus Implementation

The following bonus features have been implemented:

### User Experience Enhancements:

- ✅ **Skeleton Loaders** - Both search results and detail pages display skeleton screens during loading
- ✅ **Netflix-Style UI** - Cinematic hero banner with gradient overlays on detail pages
- ✅ **Empty State Handling** - Helpful messaging when no results are found
- ✅ **Mobile Responsive** - Fully responsive design with breakpoints for all screen sizes
- ✅ **Advanced Filtering System** - 10+ filter parameters including genres, score range, type, status, rating, and sorting options
- ✅ **Visual Enhancements** - Section icons, active filter badges, hover effects throughout
- ✅ **Sticky Navigation** - Header remains accessible while scrolling

### Technical Excellence:

- ✅ **Race Condition Prevention** - Debouncing with proper cleanup to cancel pending API calls
- ✅ **TypeScript Best Practices** - Type-safe Redux hooks, minimal use of 'any' types
- ✅ **Error Handling** - Graceful error states with user-friendly messages
- ✅ **Clean Architecture** - Well-organized component structure with clear separation of concerns

## 🛠️ Tech Stack

- **React** - Latest React with hooks-only approach
- **TypeScript** - Type-safe development
- **Redux Toolkit** - Modern Redux state management
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling with custom theme
- **Swiper** - Touch-enabled carousels for Top & Recommended anime
- **React Icons** - Beautiful icon library
- **Vite** - Fast build tool and dev server
- **Jikan API v4** - MyAnimeList data source

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

### Quick Start

1. Clone the repository

```bash
git clone <your-repo-url>
cd anime-radar
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

The application will start on **http://localhost:4000**

## 🏗️ Project Structure

```
anime-radar/
├── src/
│   ├── components/
│   │   ├── Card/
│   │   │   └── AnimeCard.tsx
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── Filter.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── AnimeSwiper.tsx
│   │   └── Skeleton/
│   │       ├── AnimeCardSkeleton.tsx
│   │       └── DetailPageSkeleton.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── DetailPage.tsx
│   ├── store/
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   └── animeSlice.ts
│   ├── types/
│   │   └── anime.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── PROMPTS.md
└── README.md
```

## 🎯 Key Features Explained

### Instant Search with Debouncing

The search bar implements a 250ms debounce to avoid excessive API calls. When you type, the search waits 250ms after your last keystroke before making the API request. If you continue typing, the previous timeout is cancelled, preventing race conditions.

### Advanced Filtering

Click the Filter button next to the search bar to access comprehensive filtering options:

- **Type**: TV, Movie, OVA, Special, ONA, Music
- **Status**: Airing, Complete, Upcoming
- **Rating**: G, PG, PG-13, R-17+, R+, Rx
- **Score Range**: Min and max score (0-10)
- **Genres**: 10 popular genres with toggle selection
- **Order By**: Sort by various properties (score, popularity, etc.)
- **Sort Direction**: Ascending or Descending
- **SFW Toggle**: Filter out adult content

### Smart Navigation

- When you navigate to an anime detail page, the search input automatically clears
- If you're on a detail page and start typing in the search bar, you're automatically navigated back to the homepage
- Filters and search queries persist across pagination

### Netflix-Style Detail Page

Detail pages feature:

- 70vh hero banner with the anime poster as background
- Dual gradient overlays for text readability
- Responsive 3-column layout (main content + sidebar)
- Information cards with stats, genres, and studio details

## 🔍 API Integration

This project uses the [Jikan API v4](https://docs.api.jikan.moe/), a free REST API for MyAnimeList data.

**Endpoints Used:**

- `/anime?q={query}` - Search anime
- `/top/anime` - Get top-rated anime
- `/recommendations/anime` - Get recommended anime
- `/anime/{id}` - Get anime details

No authentication required.

## 🎨 Design Decisions

### Color Palette

- **Primary**: `#ff3366` (Pink/Red for accents and CTAs)
- **Background**: `#0b0b14` (Deep dark blue)
- **Card**: `#1a1a2e` (Slightly lighter dark blue)
- **Foreground**: `#e1e1e6` (Light gray for text)
- **Muted**: `#9d9da7` (Muted gray for secondary text)

### Typography

- **Font Family**: Poppins (Google Fonts)
- Clean, modern sans-serif that works well for both headings and body text

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px` (2 columns)
- **Tablet**: `768px - 1024px` (3 columns)
- **Desktop**: `> 1024px` (4 columns)

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 📝 Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🤝 Contributing

This is a portfolio/test project, but feedback and suggestions are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Jikan API](https://jikan.moe/) - For providing free MyAnimeList data
- [MyAnimeList](https://myanimelist.net/) - Original data source
- YoPrint - For the interesting coding challenge

---

Built with ❤️ using React, TypeScript, Tailwind CSS, Redux and Jikan API
