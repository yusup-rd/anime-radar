import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAnimeDetails, clearSelectedAnime } from '../store/animeSlice';
import { FaStar, FaPlay, FaArrowLeft } from 'react-icons/fa';
import DetailPageSkeleton from '../components/Skeleton/DetailPageSkeleton';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedAnime, loading, error } = useAppSelector(
    (state) => state.anime
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetails(parseInt(id)));
    }

    return () => {
      dispatch(clearSelectedAnime());
    };
  }, [id, dispatch]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="border-primary/20 bg-card mx-auto max-w-md rounded-lg border px-6 py-8 text-center">
          <p className="text-primary text-lg font-bold">Error</p>
          <p className="text-foreground mt-2">{error}</p>
          <button
            onClick={handleBackClick}
            className="bg-primary hover:bg-primary/90 text-foreground mt-6 cursor-pointer rounded-lg px-6 py-3 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!selectedAnime) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted text-xl">Anime not found</p>
          <button
            onClick={handleBackClick}
            className="bg-primary hover:bg-primary/90 text-foreground mt-6 cursor-pointer rounded-lg px-6 py-3 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative h-[70dvh] w-full overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src={selectedAnime.images.jpg.large_image_url}
            alt={selectedAnime.title}
            className="h-full w-full object-cover object-center"
          />
          <div className="from-background via-background/60 absolute inset-0 bg-linear-to-t to-transparent"></div>
          <div className="from-background absolute inset-0 bg-linear-to-r via-transparent to-transparent"></div>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="bg-background/50 text-foreground hover:bg-primary/70 absolute top-4 left-4 z-12 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm transition-all md:top-8 md:left-8"
        >
          <FaArrowLeft />
          <span className="hidden md:inline">Back</span>
        </button>

        {/* Hero Content */}
        <div className="absolute right-0 bottom-0 left-0 z-10 container px-4 pb-12 md:px-8">
          <div className="max-w-3xl">
            <h1 className="text-foreground mb-3 text-4xl font-bold drop-shadow-lg md:text-6xl">
              {selectedAnime.title}
            </h1>

            {selectedAnime.title_english &&
              selectedAnime.title_english !== selectedAnime.title && (
                <p className="mb-2 text-xl text-gray-200 drop-shadow-md md:text-2xl">
                  {selectedAnime.title_english}
                </p>
              )}

            {/* Meta Info */}
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm md:text-base">
              {selectedAnime.score && (
                <div className="text-foreground flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">
                    {selectedAnime.score.toFixed(1)}
                  </span>
                </div>
              )}
              {selectedAnime.year && (
                <span className="text-gray-300">{selectedAnime.year}</span>
              )}
              {selectedAnime.episodes && (
                <span className="text-gray-300">
                  {selectedAnime.episodes} Episodes
                </span>
              )}
              {selectedAnime.type && (
                <span className="bg-foreground/20 text-foreground rounded px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                  {selectedAnime.type}
                </span>
              )}
              {selectedAnime.status && (
                <span className="text-gray-300">{selectedAnime.status}</span>
              )}
            </div>

            {/* Synopsis Preview */}
            {selectedAnime.synopsis && (
              <p className="mb-6 line-clamp-3 text-base text-gray-200 drop-shadow-md md:text-lg">
                {selectedAnime.synopsis}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={selectedAnime.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground hover:bg-foreground/90 text-background flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all md:px-8"
              >
                <FaPlay />
                <span>View on MAL</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container px-4 py-12 md:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Full Synopsis */}
            {selectedAnime.synopsis && (
              <div className="mb-8">
                <h2 className="text-foreground mb-4 text-2xl font-bold">
                  Synopsis
                </h2>
                <p className="text-muted leading-relaxed">
                  {selectedAnime.synopsis}
                </p>
              </div>
            )}

            {/* Background */}
            {selectedAnime.background && (
              <div className="mb-8">
                <h2 className="text-foreground mb-4 text-2xl font-bold">
                  Background
                </h2>
                <p className="text-muted leading-relaxed">
                  {selectedAnime.background}
                </p>
              </div>
            )}

            {/* Genres */}
            {selectedAnime.genres.length > 0 && (
              <div className="mb-8">
                <h2 className="text-foreground mb-4 text-2xl font-bold">
                  Genres
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedAnime.genres.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="bg-card text-foreground hover:bg-primary hover:text-foreground cursor-default rounded-lg px-4 py-2 text-sm font-medium transition-all"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-foreground mb-4 text-xl font-bold">
                Information
              </h2>
              <div className="space-y-4">
                {selectedAnime.rank && (
                  <div>
                    <p className="text-muted text-sm">Rank</p>
                    <p className="text-foreground text-lg font-semibold">
                      #{selectedAnime.rank}
                    </p>
                  </div>
                )}

                {selectedAnime.score && (
                  <div>
                    <p className="text-muted text-sm">Score</p>
                    <p className="text-foreground text-lg font-semibold">
                      {selectedAnime.score.toFixed(2)} / 10
                    </p>
                  </div>
                )}

                {selectedAnime.episodes && (
                  <div>
                    <p className="text-muted text-sm">Episodes</p>
                    <p className="text-foreground text-lg font-semibold">
                      {selectedAnime.episodes}
                    </p>
                  </div>
                )}

                {selectedAnime.duration && (
                  <div>
                    <p className="text-muted text-sm">Duration</p>
                    <p className="text-foreground text-lg font-semibold">
                      {selectedAnime.duration}
                    </p>
                  </div>
                )}

                {selectedAnime.aired.string && (
                  <div>
                    <p className="text-muted text-sm">Aired</p>
                    <p className="text-foreground text-lg font-semibold">
                      {selectedAnime.aired.string}
                    </p>
                  </div>
                )}

                {selectedAnime.season && selectedAnime.year && (
                  <div>
                    <p className="text-muted text-sm">Season</p>
                    <p className="text-foreground text-lg font-semibold capitalize">
                      {selectedAnime.season} {selectedAnime.year}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Studios Card */}
            {selectedAnime.studios.length > 0 && (
              <div className="bg-card rounded-lg p-6">
                <h2 className="text-foreground mb-4 text-xl font-bold">
                  Studios
                </h2>
                <div className="space-y-2">
                  {selectedAnime.studios.map((studio) => (
                    <div
                      key={studio.mal_id}
                      className="bg-background text-foreground rounded-lg px-3 py-2"
                    >
                      {studio.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
