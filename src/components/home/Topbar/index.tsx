import { Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import LogoIcon from '@/components/common/LogoIcon';
import LogoText from '@/components/common/LogoText';

import SearchBar from './Search/SearchBar';
const Topbar = () => {
  const navigate = useNavigate();
<<<<<<< HEAD

  const handleLogoClick = () => {
    void navigate(`/`);
  };
=======
>>>>>>> d3fe4e7 (feat: Hosting 페이지 구현 및 메인 페이지 기능 개선)

  return (
    <div className="flex flex-col w-full">
      <div className="h-20 px-10">
        <div className="flex items-center justify-between h-full">
          <div className="flex-1">
            <button
              className="flex items-center gap-1"
<<<<<<< HEAD
              onClick={handleLogoClick}
=======
              onClick={() => {
                void navigate('/');
              }}
>>>>>>> d3fe4e7 (feat: Hosting 페이지 구현 및 메인 페이지 기능 개선)
            >
              <LogoIcon />
              <div className="hidden md:block">
                <LogoText />
              </div>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-end gap-4">
            <button
              className="hover:bg-gray-100 px-4 py-2 rounded-full text-sm"
              onClick={() => {
                void navigate('/hosting');
              }}
            >
              당신의 공간을 에어비앤비하세요
            </button>
            <button className="flex items-center gap-3 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow">
              <Menu size={18} />
              <User size={30} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-10 py-4">
        <SearchBar />
      </div>
    </div>
  );
};

export default Topbar;
