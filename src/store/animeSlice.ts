import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  Anime,
  AnimeSearchResponse,
  AnimeDetailResponse,
} from '../types/anime';

interface AnimeState {
  searchResults: Anime[];
  selectedAnime: Anime | null;
  topAnime: Anime[];
  recommendedAnime: Anime[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  searchQuery: string;
}

const initialState: AnimeState = {
  searchResults: [],
  selectedAnime: null,
  topAnime: [],
  recommendedAnime: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  searchQuery: '',
};

// Async thunk for searching anime
export const searchAnime = createAsyncThunk(
  'anime/search',
  async (
    { query, page }: { query: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch anime');
      }

      const data: AnimeSearchResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  }
);

// Async thunk for fetching anime details
export const fetchAnimeDetails = createAsyncThunk(
  'anime/fetchDetails',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch anime details');
      }

      const data: AnimeDetailResponse = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  }
);

// Async thunk for fetching top anime
export const fetchTopAnime = createAsyncThunk(
  'anime/fetchTop',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://api.jikan.moe/v4/top/anime?limit=20'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch top anime');
      }

      const data: AnimeSearchResponse = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  }
);

// Async thunk for fetching recommended anime
export const fetchRecommendedAnime = createAsyncThunk(
  'anime/fetchRecommended',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://api.jikan.moe/v4/recommendations/anime?limit=20'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recommended anime');
      }

      const data = await response.json();
      const animeList: Anime[] = data.data.flatMap(
        (rec: { entry: Anime[] }) => rec.entry
      );
      return animeList.slice(0, 20);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.hasNextPage = false;
    },
    clearSelectedAnime: (state) => {
      state.selectedAnime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search anime
      .addCase(searchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.currentPage = action.payload.pagination.current_page;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasNextPage = action.payload.pagination.has_next_page;
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch anime details
      .addCase(fetchAnimeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAnime = action.payload;
      })
      .addCase(fetchAnimeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch top anime
      .addCase(fetchTopAnime.fulfilled, (state, action) => {
        state.topAnime = action.payload;
      })
      // Fetch recommended anime
      .addCase(fetchRecommendedAnime.fulfilled, (state, action) => {
        state.recommendedAnime = action.payload;
      });
  },
});

export const { setSearchQuery, clearSearchResults, clearSelectedAnime } =
  animeSlice.actions;
export default animeSlice.reducer;
