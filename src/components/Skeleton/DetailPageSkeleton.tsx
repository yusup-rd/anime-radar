const DetailPageSkeleton = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner Skeleton */}
      <div className="relative h-[70dvh] w-full overflow-hidden">
        {/* Background Skeleton */}
        <div className="bg-card/30 absolute inset-0"></div>

        {/* Back Button Skeleton */}
        <div className="absolute top-4 left-4 z-10 md:top-8 md:left-8">
          <div className="bg-card h-10 w-24 animate-pulse rounded-full"></div>
        </div>

        {/* Hero Content Skeleton */}
        <div className="absolute right-0 bottom-0 left-0 z-10 container px-4 pb-12 md:px-8">
          <div className="max-w-3xl space-y-4">
            {/* Title Skeleton */}
            <div className="bg-card h-12 w-3/4 animate-pulse rounded md:h-16"></div>

            {/* Subtitle Skeleton */}
            <div className="bg-card h-6 w-1/2 animate-pulse rounded md:h-8"></div>

            {/* Meta Info Skeleton */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-card h-6 w-16 animate-pulse rounded"></div>
              <div className="bg-card h-6 w-16 animate-pulse rounded"></div>
              <div className="bg-card h-6 w-24 animate-pulse rounded"></div>
              <div className="bg-card h-6 w-20 animate-pulse rounded"></div>
              <div className="bg-card h-6 w-28 animate-pulse rounded"></div>
            </div>

            {/* Synopsis Skeleton */}
            <div className="space-y-2">
              <div className="bg-card h-4 w-full animate-pulse rounded"></div>
              <div className="bg-card h-4 w-full animate-pulse rounded"></div>
              <div className="bg-card h-4 w-3/4 animate-pulse rounded"></div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="bg-card h-12 w-40 animate-pulse rounded-lg md:w-48"></div>
              <div className="bg-card h-12 w-40 animate-pulse rounded-lg md:w-48"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section Skeleton */}
      <div className="container px-4 py-12 md:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            {/* Synopsis Section */}
            <div className="mb-8">
              <div className="bg-card mb-4 h-8 w-32 animate-pulse rounded"></div>
              <div className="space-y-2">
                <div className="bg-card h-4 w-full animate-pulse rounded"></div>
                <div className="bg-card h-4 w-full animate-pulse rounded"></div>
                <div className="bg-card h-4 w-full animate-pulse rounded"></div>
                <div className="bg-card h-4 w-full animate-pulse rounded"></div>
                <div className="bg-card h-4 w-3/4 animate-pulse rounded"></div>
              </div>
            </div>

            {/* Background Section */}
            <div className="mb-8">
              <div className="bg-card mb-4 h-8 w-40 animate-pulse rounded"></div>
              <div className="space-y-2">
                <div className="bg-card h-4 w-full animate-pulse rounded"></div>
                <div className="bg-card h-4 w-full animate-pulse rounded"></div>
                <div className="bg-card h-4 w-2/3 animate-pulse rounded"></div>
              </div>
            </div>

            {/* Genres Section */}
            <div className="mb-8">
              <div className="bg-card mb-4 h-8 w-24 animate-pulse rounded"></div>
              <div className="flex flex-wrap gap-2">
                <div className="bg-card h-8 w-20 animate-pulse rounded-lg"></div>
                <div className="bg-card h-8 w-24 animate-pulse rounded-lg"></div>
                <div className="bg-card h-8 w-28 animate-pulse rounded-lg"></div>
                <div className="bg-card h-8 w-20 animate-pulse rounded-lg"></div>
                <div className="bg-card h-8 w-32 animate-pulse rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-card rounded-lg p-6">
              <div className="bg-background mb-4 h-6 w-32 animate-pulse rounded"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index}>
                    <div className="bg-background mb-1 h-4 w-16 animate-pulse rounded"></div>
                    <div className="bg-background h-6 w-24 animate-pulse rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Studios Card */}
            <div className="bg-card rounded-lg p-6">
              <div className="bg-background mb-4 h-6 w-24 animate-pulse rounded"></div>
              <div className="space-y-2">
                <div className="bg-background h-10 w-full animate-pulse rounded-lg"></div>
                <div className="bg-background h-10 w-full animate-pulse rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageSkeleton;
