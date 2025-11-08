import { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchAnime, setSearchFilters } from '../../store/animeSlice';
import type { SearchFilters } from '../../store/animeSlice';

const Filter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchQuery, searchFilters } = useAppSelector((state) => state.anime);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(searchFilters || {});

  const animeTypes = [
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Movie' },
    { value: 'ova', label: 'OVA' },
    { value: 'special', label: 'Special' },
    { value: 'ona', label: 'ONA' },
    { value: 'music', label: 'Music' },
  ];

  const statusOptions = [
    { value: 'airing', label: 'Airing' },
    { value: 'complete', label: 'Complete' },
    { value: 'upcoming', label: 'Upcoming' },
  ];

  const ratingOptions = [
    { value: 'g', label: 'G - All Ages' },
    { value: 'pg', label: 'PG - Children' },
    { value: 'pg13', label: 'PG-13 - Teens 13+' },
    { value: 'r17', label: 'R - 17+ (violence & profanity)' },
    { value: 'r', label: 'R+ - Mild Nudity' },
  ];

  const orderByOptions = [
    { value: 'mal_id', label: 'MAL ID' },
    { value: 'title', label: 'Title' },
    { value: 'start_date', label: 'Start Date' },
    { value: 'end_date', label: 'End Date' },
    { value: 'episodes', label: 'Episodes' },
    { value: 'score', label: 'Score' },
    { value: 'scored_by', label: 'Scored By' },
    { value: 'rank', label: 'Rank' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'members', label: 'Members' },
    { value: 'favorites', label: 'Favorites' },
  ];

  const sortOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' },
  ];

  const popularGenres = [
    { id: '1', name: 'Action' },
    { id: '2', name: 'Adventure' },
    { id: '4', name: 'Comedy' },
    { id: '8', name: 'Drama' },
    { id: '10', name: 'Fantasy' },
    { id: '22', name: 'Romance' },
    { id: '24', name: 'Sci-Fi' },
    { id: '36', name: 'Slice of Life' },
    { id: '37', name: 'Supernatural' },
    { id: '41', name: 'Thriller' },
  ];

  const handleFilterChange = (
    key: keyof SearchFilters,
    value: string | number | boolean | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenreToggle = (genreId: string) => {
    const currentGenres = filters.genres?.split(',').filter(Boolean) || [];
    const newGenres = currentGenres.includes(genreId)
      ? currentGenres.filter((id) => id !== genreId)
      : [...currentGenres, genreId];

    handleFilterChange(
      'genres',
      newGenres.length > 0 ? newGenres.join(',') : undefined
    );
  };

  const handleApplyFilters = () => {
    // Clean up empty filters
    const cleanFilters: SearchFilters = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        cleanFilters[key as keyof SearchFilters] = value;
      }
    });

    dispatch(setSearchFilters(cleanFilters));

    // Navigate to homepage if not already there
    navigate('/');

    // Perform search with filters
    dispatch(
      searchAnime({
        query: searchQuery || '',
        page: 1,
        filters: cleanFilters,
      })
    );

    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({});
    dispatch(setSearchFilters({}));

    // If there's a search query, re-search without filters
    if (searchQuery) {
      dispatch(searchAnime({ query: searchQuery, page: 1 }));
    }
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== '' && v !== null
  ).length;

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex h-[42px] cursor-pointer items-center gap-2 rounded-lg px-4 transition-all ${
          isOpen
            ? 'bg-primary text-foreground'
            : 'bg-card text-foreground hover:bg-primary hover:text-foreground'
        }`}
      >
        <FiFilter className="text-lg" />
        <span className="hidden md:inline">Filter</span>
        {activeFilterCount > 0 && (
          <span
            className={`flex size-5 items-center justify-center rounded-full text-xs transition-all ${
              isOpen
                ? 'text-primary bg-foreground'
                : 'bg-primary group-hover:text-primary text-foreground group-hover:bg-foreground'
            }`}
          >
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Filter Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown Panel */}
          <div className="bg-card absolute top-full right-0 z-50 mt-2 w-[90dvw] max-w-2xl rounded-lg p-6 shadow-xl md:w-[600px]">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-foreground text-xl font-bold">
                Filter Anime
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-foreground cursor-pointer"
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="max-h-[50dvh] space-y-4 overflow-y-auto pr-2">
              {/* Type */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">
                  Type
                </label>
                <select
                  value={filters.type || ''}
                  onChange={(e) =>
                    handleFilterChange('type', e.target.value || undefined)
                  }
                  className="border-muted/30 bg-background text-foreground focus:border-primary w-full rounded-lg border-2 px-3 py-2 focus:outline-none"
                >
                  <option value="">All Types</option>
                  {animeTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">
                  Status
                </label>
                <select
                  value={filters.status || ''}
                  onChange={(e) =>
                    handleFilterChange('status', e.target.value || undefined)
                  }
                  className="border-muted/30 bg-background text-foreground focus:border-primary w-full rounded-lg border-2 px-3 py-2 focus:outline-none"
                >
                  <option value="">All Status</option>
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">
                  Rating
                </label>
                <select
                  value={filters.rating || ''}
                  onChange={(e) =>
                    handleFilterChange('rating', e.target.value || undefined)
                  }
                  className="border-muted/30 bg-background text-foreground focus:border-primary w-full rounded-lg border-2 px-3 py-2 focus:outline-none"
                >
                  <option value="">All Ratings</option>
                  {ratingOptions.map((rating) => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Score Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Min Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={filters.min_score || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        'min_score',
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                    placeholder="0"
                    className="border-muted/30 bg-background text-foreground focus:border-primary w-full rounded-lg border-2 px-3 py-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Max Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={filters.max_score || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        'max_score',
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                    placeholder="10"
                    className="border-muted/30 bg-background text-foreground focus:border-primary w-full rounded-lg border-2 px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Genres */}
              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">
                  Genres
                </label>
                <div className="flex flex-wrap gap-2">
                  {popularGenres.map((genre) => {
                    const isSelected = filters.genres
                      ?.split(',')
                      .includes(genre.id);
                    return (
                      <button
                        key={genre.id}
                        onClick={() => handleGenreToggle(genre.id)}
                        className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-primary text-foreground'
                            : 'bg-background text-foreground hover:bg-muted/20'
                        }`}
                      >
                        {genre.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order By */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Order By
                  </label>
                  <select
                    value={filters.order_by || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        'order_by',
                        e.target.value || undefined
                      )
                    }
                    className="border-muted/30 bg-background text-foreground focus:border-primary w-full rounded-lg border-2 px-3 py-2 focus:outline-none"
                  >
                    <option value="">Default</option>
                    {orderByOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Sort
                  </label>
                  <select
                    value={filters.sort || ''}
                    onChange={(e) =>
                      handleFilterChange('sort', e.target.value || undefined)
                    }
                    className="border-muted/30 bg-background text-foreground focus:border-primary w-full rounded-lg border-2 px-3 py-2 focus:outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SFW Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="sfw"
                  checked={filters.sfw || false}
                  onChange={(e) =>
                    handleFilterChange('sfw', e.target.checked || undefined)
                  }
                  className="border-muted/30 text-primary focus:ring-primary size-4 cursor-pointer rounded"
                />
                <label
                  htmlFor="sfw"
                  className="text-foreground cursor-pointer text-sm font-medium"
                >
                  Safe for Work (Filter out Adult content)
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleApplyFilters}
                className="bg-primary hover:bg-primary/90 text-foreground flex-1 cursor-pointer rounded-lg px-4 py-3 font-semibold transition-all"
              >
                Apply Filters
              </button>
              <button
                onClick={handleClearFilters}
                className="bg-muted/20 text-foreground hover:bg-muted/30 cursor-pointer rounded-lg px-4 py-3 font-semibold transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
