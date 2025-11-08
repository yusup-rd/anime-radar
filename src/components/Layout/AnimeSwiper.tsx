import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Anime } from '../../types/anime';
import AnimeCard from '../Card/AnimeCard';

interface AnimeSwiperProps {
  title: string;
  icon?: React.ReactNode;
  animeList: Anime[];
  onAnimeClick: (animeId: number) => void;
  loading?: boolean;
}

const AnimeSwiper = ({
  title,
  icon,
  animeList,
  onAnimeClick,
  loading,
}: AnimeSwiperProps) => {
  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-foreground mb-6 flex items-center gap-3 text-3xl font-bold">
          {icon}
          {title}
        </h2>
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-foreground/10 h-96 w-64 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-foreground mb-6 flex items-center gap-3 text-3xl font-bold">
        {icon}
        {title}
      </h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {animeList.map((anime) => (
          <SwiperSlide key={anime.mal_id}>
            <AnimeCard anime={anime} onClick={onAnimeClick} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AnimeSwiper;
