# AI Prompts Documentation

This document tracks AI assistance used for specific challenging problems during the development of the Anime Search App.

## Complex Filter System Implementation

**Prompt:** "Help me integrate advanced filtering with the Jikan API. Need to support type, status, rating, score range, genres, order_by, sort, and sfw parameters."

**Context:** I was struggling with how to properly structure the filter state in Redux and build clean API URLs with multiple optional parameters.

**Solution Implemented:**

- Used URLSearchParams to dynamically build query strings
- Extended Redux state to include `searchFilters` object
- Modified `searchAnime` thunk to accept optional filters parameter
- Updated HomePage logic to show results when either search query OR filters exist

**Key Learning:** URLSearchParams automatically handles encoding and skips undefined values, making it perfect for optional API parameters.

## Debounced Search with Race Condition Prevention

**Prompt:** "Implement 250ms debounced search that cancels pending API calls if user keeps typing. Need to avoid race conditions and memory leaks."

**Context:** Initial implementation was calling the API on every keystroke. Needed proper debouncing with cleanup.

**Solution Implemented:**

- Used setTimeout/clearTimeout pattern in useCallback
- Added cleanup in useEffect return to prevent memory leaks
- Stored timeout ID in state to enable cancellation

**Challenge:** Had to handle the debounceTimeout in the dependency array correctly to avoid infinite re-renders.

## Smart Navigation with Search State

**Prompt:** "When user navigates to detail page, the search input still shows the query. How do I clear it on navigation and navigate back when they start typing again?"

**Context:** UX issue where search input was confusing on detail pages.

**Solution Implemented:**

- Used `useLocation` hook to detect route changes
- Clear search input when pathname starts with `/anime/`
- In `handleInputChange`, check if on detail page and navigate to `/` when typing begins
- Dispatch Redux actions to clear both input state and search results

## Skeleton Loaders Matching Real Content

**Prompt:** "Create skeleton loaders that match the exact layout of my AnimeCard and DetailPage components."

**Context:** Generic spinners looked unprofessional. Wanted skeleton screens like modern apps.

**Solution Implemented:**

- Created separate skeleton components mirroring real component structure
- Used `animate-pulse` utility for pulsing effect
- Matched aspect ratios, spacing, and grid layouts exactly
- DetailPageSkeleton includes hero banner, content sections, and sidebar structure

**Key Insight:** Skeletons should match the exact layout structure, not just approximate dimensions.
