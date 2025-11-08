import { FaStar } from 'react-icons/fa';
import type { Anime } from '../../types/anime';

interface AnimeCardProps {
  anime: Anime;
  onClick: (animeId: number) => void;
}

const AnimeCard = ({ anime, onClick }: AnimeCardProps) => {
  return (
    <div
      onClick={() => onClick(anime.mal_id)}
      className="group bg-card cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:brightness-110"
    >
      <div className="relative aspect-2/3 overflow-hidden">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {anime.score && (
          <div className="bg-background/70 absolute top-2 right-2 flex items-center gap-1 rounded-lg px-2 py-1 backdrop-blur-sm">
            <FaStar className="text-xs text-yellow-400" />
            <span className="text-foreground text-xs font-semibold">
              {anime.score.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-foreground mb-1 line-clamp-2 truncate text-sm font-semibold">
          {anime.title}
        </h3>
        <div className="text-foreground/60 flex items-center justify-between text-xs">
          <span>{anime.type}</span>
          {anime.year && <span>{anime.year}</span>}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
