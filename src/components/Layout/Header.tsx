import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="h-20 bg-[#11111B]">
      <div className="container flex h-full items-center gap-3">
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => navigate('/')}
        >
          <img src="/anime.ico" alt="AnimeRadar Logo" className="size-8" />
          <h1 className="text-primary text-2xl font-semibold">AnimeRadar</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
