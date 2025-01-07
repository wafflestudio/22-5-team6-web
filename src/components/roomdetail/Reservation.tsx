import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorIcon from '@mui/icons-material/Error';
import FlagIcon from '@mui/icons-material/Flag';

const Reservation = () => {
  return (
    <div className="flex flex-col items-center p-4 w-full h-[400px]">
      {/* Date Selection Section */}
      <div className="rounded-lg p-4 w-full max-w-md shadow-xl">
        <div className="flex justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">체크인</label>
            <input
              type="text"
              value="2025. 1. 7."
              readOnly
              className="mt-1 block w-full border border-red-700 rounded-tl-md py-2 px-3 text-gray-700 bg-white cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">체크아웃</label>
            <input
              type="text"
              value="2025. 1. 12."
              readOnly
              className="mt-1 block w-full border border-red-700 rounded-tr-md py-2 px-3 text-gray-700 bg-white cursor-pointer"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">인원</label>
          <select className="block w-full border rounded-bl-md rounded-br-md py-2 px-3 bg-white cursor-pointer">
            <option>인원게스트 1명</option>
          </select>
        </div>
        <div className="flex items-center text-red-600 text-sm mb-4">
          <ErrorIcon className="mr-2" />
          선택하신 날짜는 이용이 불가능합니다.
        </div>
        <button className="w-full py-2 px-4 bg-[#D70466] text-white rounded-lg hover:bg-[#E31C5F] cursor-pointer">날짜 변경</button>
      </div>

      {/* Reservation Expiration Section */}
      <div className="mt-6 flex items-center text-gray-700">
        <AccessTimeIcon className="mr-2" />
        예약이&nbsp;<span className="font-medium">3시간 후에 마감됩니다</span>
      </div>
      <p className="text-sm text-gray-500 text-center mt-2">
        호스트가 해당 날짜에 대한 예약 수락을 곧 중단할 예정입니다.
      </p>

      {/* Report Section */}
      <button className="mt-4 flex items-center text-sm text-[#6A6A6A] hover:underline cursor-pointer">
        <FlagIcon className="mr-1" />
        숙소 신고하기
      </button>
    </div>
  );
};

export default Reservation;
