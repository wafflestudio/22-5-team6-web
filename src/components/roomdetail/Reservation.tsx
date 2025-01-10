import ErrorIcon from '@mui/icons-material/Error';
import FlagIcon from '@mui/icons-material/Flag';
import axios from 'axios';

import BaseModal from '@/components/common/Modal/BaseModal';
import { useSearch } from '@/components/home/context/SearchContext';
import CalendarModal from '@/components/home/Topbar/Search/modals/CalendarModal';
import GuestsModal from '@/components/home/Topbar/Search/modals/GuestsModal';
import clock from '@/components/roomdetail/clock.svg';
import type { roomType } from '@/types/roomType';

interface InfoProps {
  data: roomType;
}

const Reservation = ({ data }: InfoProps) => {
  const { checkIn, checkOut, guests, currentModal, openModal, closeModal } =
    useSearch();

  const handleReservation = async () => {
    if (data.id === 0 || checkIn == null || checkOut == null || guests <= 0) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    const token = localStorage.getItem('token') as string;
    const reservationData = {
      roomId: data.id,
      startDate: checkIn.toISOString().split('T')[0],
      endDate: checkOut.toISOString().split('T')[0],
      numberOfGuests: guests,
    };
    console.log('전송할 데이터:', reservationData);
    try {
      const response = await axios.post(
        '/api/v1/reservations',
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 필요한 경우 토큰을 추가
            'Content-Type': 'application/json',
          },
        },
      );
      console.debug('응답 데이터:', response.data);

      if (response.status === 200) {
        alert('예약이 성공적으로 완료되었습니다!');
      }
    } catch (error) {
      console.error('예약 요청 실패:', error);
      alert('예약 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full h-fit mt-8">
        {/* Date Selection Section */}
        <div className="flex flex-col items-center rounded-lg p-4 w-full shadow-xl border">
          <div className="flex justify-between gap-4 w-full">
            <div className="w-full">
              <button
                onClick={() => {
                  openModal('calendar');
                }}
                className="flex flex-col items-start mt-1 w-full border border-red-700 rounded-md py-2 px-3 text-gray-700 bg-white cursor-pointer"
              >
                <span className="text-xs font-medium text-red-700">체크인</span>
                <span className="text-sm text-black">
                  {checkIn !== null
                    ? checkIn.toLocaleDateString()
                    : '날짜 추가'}
                </span>
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() => {
                  openModal('calendar');
                }}
                className="flex flex-col items-start mt-1 w-full border border-red-700 rounded-md py-2 px-3 text-gray-700 bg-white cursor-pointer"
              >
                <span className="text-xs font-medium text-red-700">
                  체크아웃
                </span>
                <span className="text-sm text-black">
                  {checkOut !== null
                    ? checkOut.toLocaleDateString()
                    : '날짜 추가'}
                </span>
              </button>
            </div>
          </div>
          <div className="my-4 w-full">
            <button
              onClick={() => {
                openModal('guests');
              }}
              className="flex flex-col items-start mt-1 w-full border border-gray-300 rounded-md py-2 px-3 bg-white cursor-pointer text-gray-700"
            >
              <span className="block text-xs font-medium text-gray-700">
                인원
              </span>
              <span className="text-sm text-gray-700">
                {guests > 0 ? `게스트 ${guests}명` : '게스트 추가'}
              </span>
            </button>
          </div>
          <div className="flex items-center text-red-600 text-xs mb-4">
            <ErrorIcon className="mr-2" />
            선택하신 날짜는 이용이 불가능합니다.
          </div>
          <button
            className="w-full py-2 px-4 bg-[#D70466] text-white rounded-lg hover:bg-[#E31C5F] cursor-pointer"
            onClick={() => {
              void handleReservation();
            }}
          >
            예약하기
          </button>
        </div>

        {/* Reservation Expiration Section */}
        <div className="flex w-full p-4 my-8 border border-gray-200 rounded-md">
          <div className="mr-3">
            <img
              src={clock}
              className="text-[#D70466] w-[40px] h-[40px] snap-center"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="text-gray-700">
              예약이&nbsp;3시간 후에 마감됩니다
            </div>
            <p className="text-sm text-gray-500 text-start mt-2">
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
      <BaseModal
        isOpen={currentModal === 'calendar'}
        onClose={closeModal}
        title="날짜 선택"
      >
        <CalendarModal onClose={closeModal} />
      </BaseModal>
      <BaseModal
        isOpen={currentModal === 'guests'}
        onClose={closeModal}
        title="인원 선택"
      >
        <GuestsModal onClose={closeModal} />
      </BaseModal>
    </>
  );
};

export default Reservation;
