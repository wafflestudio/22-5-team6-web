import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import logo from '@/../assets/logo.png';

const Topbar = () => {
  return (
  <div className="w-full flex justify-between items-center">
    {/* Left: Logo */}
    <img
      src={logo}
      alt="Airbnb Logo"
      className="h-[40px] ml-[30px] mr-[60px] my-[20px]"
    />

    {/* Center: Search Bar */}
    <div className="flex items-center border rounded-full shadow-md px-4 py-2 space-x-2">
      <div className="flex flex-col text-sm px-[8px] border-r-[0.5px]">
        <span className="text-gray-500 font-normal text-xs">여행지</span>
        <span className="text-gray-500">여행지 검색</span>
      </div>
      <div className="flex flex-col text-sm px-[8px] border-r-[0.5px]">
        <span className="text-gray-500 font-normal text-xs">체크인</span>
        <span className="text-gray-500">날짜 추가</span>
      </div>
      <div className="flex flex-col text-sm px-[8px] border-r-[0.5px]">
        <span className="text-gray-500 font-normal text-xs">체크아웃</span>
        <span className="text-gray-500">날짜 추가</span>
      </div>
      <div className="flex flex-col text-sm px-[8px]">
        <span className="text-gray-500 font-normal text-xs">여행자</span>
        <span className="text-gray-500">게스트 추가</span>
      </div>
      <button className="bg-[#FF416A] text-white p-2 rounded-full flex justify-center items-center">
        <SearchIcon style={{ width: 20, height: 20 }} />
      </button>
    </div>

    {/* Right: Icons */}
    <div className="flex items-center space-x-4 mr-[10px]">
      <span className="text-sm font-medium">당신의 공간을 에어비앤비하세요</span>
      <LanguageIcon style={{ width: 20, height: 20 }} />
      <div className="flex items-center space-x-2 border rounded-full px-2 py-1">
        <MenuIcon style={{ width: 20, height: 20 }} />
        <AccountCircleIcon style={{ width: 24, height: 24 }} />
      </div>
    </div>
  </div>
  );
};

export default Topbar;
