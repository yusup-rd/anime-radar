import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaThumbsUp } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTopAnime, fetchRecommendedAnime } from '../store/animeSlice';
import Pagination from '../components/Layout/Pagination';
import AnimeCard from '../components/Card/AnimeCard';
import AnimeSwiper from '../components/Layout/AnimeSwiper';
import AnimeCardSkeleton from '../components/Skeleton/AnimeCardSkeleton';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    searchResults,
    topAnime,
    recommendedAnime,
    loading,
    error,
    currentPage,
    totalPages,
    hasNextPage,
    searchQuery,
    searchFilters,
  } = useAppSelector((state) => state.anime);

  // Check if filters are active
  const hasActiveFilters = Object.keys(searchFilters).length > 0;
  const showSearchResults = searchQuery || hasActiveFilters;

  // Fetch top and recommended anime on mount
  useEffect(() => {
    if (topAnime.length === 0) {
      dispatch(fetchTopAnime());
    }
    if (recommendedAnime.length === 0) {
      dispatch(fetchRecommendedAnime());
    }
  }, [dispatch, topAnime.length, recommendedAnime.length]);

  // Handle anime card click
  const handleAnimeClick = (animeId: number) => {
    navigate(`/anime/${animeId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        {/* Search results */}
        {showSearchResults && (
          <>
            {/* Loading State */}
            {loading && (
              <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(12)].map((_, i) => (
                  <AnimeCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mx-auto max-w-2xl rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}

            {/* Results Grid */}
            {!loading && searchResults.length > 0 && (
              <>
                <h2 className="text-foreground mb-6 text-3xl font-bold">
                  {searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : 'Filtered Results'}
                </h2>
                <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {searchResults.map((anime) => (
                    <AnimeCard
                      key={anime.mal_id}
                      anime={anime}
                      onClick={handleAnimeClick}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  hasNextPage={hasNextPage}
                  searchQuery={searchQuery}
                />
              </>
            )}

            {/* Empty State */}
            {!loading && searchResults.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-foreground text-xl">
                  {searchQuery
                    ? `No anime found for "${searchQuery}"`
                    : 'No anime found with these filters'}
                </p>
                <p className="text-foreground/60 mt-2">
                  Try{' '}
                  {searchQuery
                    ? 'searching with different keywords'
                    : 'adjusting your filters'}
                </p>
              </div>
            )}
          </>
        )}

        {/* Default homepage */}
        {!showSearchResults && (
          <>
            {/* Hero Section */}
            <div className="mb-12 text-center">
              <h1 className="text-foreground mb-4 text-5xl font-bold">
                Discover Your Next Favorite Anime
              </h1>
              <p className="text-foreground/70 text-xl">
                Search through thousands of anime titles
              </p>
            </div>

            {/* Top Anime Swiper */}
            <AnimeSwiper
              title="Top Anime"
              icon={<FaTrophy className="text-primary" />}
              animeList={topAnime}
              onAnimeClick={handleAnimeClick}
              loading={topAnime.length === 0}
            />

            {/* Recommended Anime Swiper */}
            <AnimeSwiper
              title="Recommended Anime"
              icon={<FaThumbsUp className="text-primary" />}
              animeList={recommendedAnime}
              onAnimeClick={handleAnimeClick}
              loading={recommendedAnime.length === 0}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
