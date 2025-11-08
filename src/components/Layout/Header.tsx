import { useNavigate } from 'react-router-dom';
import Search from './Search';
import Filter from './Filter';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 h-20 bg-[#11111B] shadow-lg">
      <div className="container flex h-full items-center justify-between gap-4">
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => navigate('/')}
        >
          <img src="/anime.ico" alt="AnimeRadar Logo" className="size-8" />
          <h1 className="text-primary hidden text-2xl font-semibold md:block">
            AnimeRadar
          </h1>
        </div>
        <div className="flex max-w-md flex-1 items-center gap-3">
          <div className="flex-1">
            <Search />
          </div>
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default Header;
