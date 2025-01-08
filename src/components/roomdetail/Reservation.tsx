import ErrorIcon from '@mui/icons-material/Error';
import FlagIcon from '@mui/icons-material/Flag';

import clock from '@/components/roomdetail/clock.svg'

const Reservation = () => {
  return (
    <div className="flex flex-col items-center w-full h-fit mt-8">
      {/* Date Selection Section */}
      <div className="flex flex-col items-center rounded-lg p-4 w-full shadow-xl border">
        <div className="flex justify-between w-full">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">체크인</label>
            <input
              type="text"
              value="2025. 1. 7."
              readOnly
              className="mt-1 block w-full border border-red-700 rounded-tl-md py-2 px-3 text-gray-700 bg-white cursor-pointer"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">체크아웃</label>
            <input
              type="text"
              value="2025. 1. 12."
              readOnly
              className="mt-1 block w-full border border-red-700 rounded-tr-md py-2 px-3 text-gray-700 bg-white cursor-pointer"
            />
          </div>
        </div>
        <div className="my-4 w-full">
          <label className="block text-sm font-medium text-gray-700">인원</label>
          <select className="block mt-1 w-full border rounded-bl-md rounded-br-md py-2 px-3 bg-white cursor-pointer">
            <option>게스트 1명</option>
          </select>
        </div>
        <div className="flex items-center text-red-600 text-xs mb-4">
          <ErrorIcon className="mr-2" />
          선택하신 날짜는 이용이 불가능합니다.
        </div>
        <button className="w-full py-2 px-4 bg-[#D70466] text-white rounded-lg hover:bg-[#E31C5F] cursor-pointer">날짜 변경</button>
      </div>

      {/* Reservation Expiration Section */}
      <div className="flex w-full p-4 my-8 border border-gray-200 rounded-md">
        <div>
        <img src={clock} className="mr-3 text-[#D70466] w-[40px] h-[40px] snap-center"/>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center text-gray-700">
            예약이&nbsp;<span className="font-medium">3시간 후에 마감됩니다</span>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            호스트가 해당 날짜에 대한 예약 수락을 곧 중단할 예정입니다.
          </p>
        </div>
      </div>
      {/* Report Section */}
      <button className="mt-2 flex items-center text-sm text-[#6A6A6A] hover:underline cursor-pointer">
        <FlagIcon className="mr-1" />
        숙소 신고하기
      </button>
    </div>
  );
};

export default Reservation;
