import { useNavigate } from 'react-router-dom';
import Search from './Search';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="h-20 bg-[#11111B]">
      <div className="container flex h-full items-center justify-between gap-12">
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => navigate('/')}
        >
          <img src="/anime.ico" alt="AnimeRadar Logo" className="size-8" />
          <h1 className="text-primary hidden text-2xl font-semibold md:block">
            AnimeRadar
          </h1>
        </div>
        <div className="max-w-md flex-1">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Header;
