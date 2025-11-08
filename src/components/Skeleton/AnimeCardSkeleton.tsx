const AnimeCardSkeleton = () => {
  return (
    <div className="bg-card overflow-hidden rounded-xl shadow-lg">
      {/* Image skeleton */}
      <div className="bg-foreground/10 relative aspect-2/3 animate-pulse">
        {/* Rating badge skeleton */}
        <div className="bg-foreground/20 absolute top-2 right-2 h-6 w-14 animate-pulse rounded-lg" />
      </div>
      {/* Content skeleton */}
      <div className="space-y-2 p-3">
        {/* Title skeleton - 2 lines */}
        <div className="space-y-1">
          <div className="bg-foreground/10 h-4 w-full animate-pulse rounded" />
          <div className="bg-foreground/10 h-4 w-3/4 animate-pulse rounded" />
        </div>
        {/* Meta info skeleton */}
        <div className="flex items-center justify-between">
          <div className="bg-foreground/10 h-3 w-16 animate-pulse rounded" />
          <div className="bg-foreground/10 h-3 w-12 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};

export default AnimeCardSkeleton;
