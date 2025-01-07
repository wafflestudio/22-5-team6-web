import { Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import LogoIcon from '@/components/common/LogoIcon';
import LogoText from '@/components/common/LogoText';

import SearchBar from './Search/SearchBar';
const Topbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    void navigate(`/`)
  }

  return (
    <div className="flex flex-col w-full">
      <div className="h-20 px-10">
        <div className="flex items-center justify-between h-full">
          <div className="flex-1">
            <button className="flex items-center gap-1" onClick={handleLogoClick}>
              <LogoIcon />
              <div className="hidden md:block">
                <LogoText />
              </div>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-end gap-4">
            <button className="hover:bg-gray-100 px-4 py-2 rounded-full text-sm">
              당신의 공간을 에어비앤비하세요
            </button>
            <button className="flex items-center gap-3 border rounded-full p-2 hover:shadow-md">
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
