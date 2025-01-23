import FlagIcon from '@mui/icons-material/Flag';
import { useState } from 'react';

import clock from '@/assets/icons/reservation/clock.svg';
import BaseModal from '@/components/common/Modal/BaseModal';
import { useRoomSearch } from '@/components/home/context/RoomSearchContext';
import RoomGuestsModal from '@/components/roomdetail/RoomGuestsModal';
import type { roomType } from '@/types/roomType';

import RoomCalendarModal from './roomCalendarModal';

interface InfoProps {
  data: roomType;
}

type roomReservationResponseType = {
  reservationId: number;
};

const Reservation = ({ data }: InfoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkIn, checkOut, guests, currentModal, openModal, closeModal } =
    useRoomSearch();

  const handleReservation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (token == null) {
        throw new Error('로그인이 필요합니다.');
      }
      console.debug(data);
      if (
        data.roomId === 0 ||
        checkIn == null ||
        checkOut == null ||
        guests <= 0
      ) {
        throw new Error('모든 필드를 입력해주세요.');
      }

      const sendData = {
        roomId: data.roomId,
        startDate: checkIn.toISOString().split('T')[0],
        endDate: checkOut.toISOString().split('T')[0],
        numberOfGuests: guests,
      };

      const response = await fetch('/api/v1/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sendData),
      });

      console.debug(sendData);

      if (!response.ok) {
        throw new Error('숙소 예약에 실패했습니다.');
      }
      const responseData =
        (await response.json()) as roomReservationResponseType;
      alert(
        `숙소가 성공적으로 예약되었습니다! ID: ${responseData.reservationId}`,
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
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

          {/* 에러 메시지 표시 */}
          {error != null && (
            <div className="mb-4 p-2 bg-red-50 text-red-700 rounded-sm text-sm">
              {error}
            </div>
          )}

          <button
            className="w-full py-2 px-4 bg-[#D70466] text-white rounded-lg hover:bg-[#E31C5F] cursor-pointer"
            disabled={isLoading}
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
        <RoomCalendarModal id={data.roomId} onClose={closeModal} />
      </BaseModal>
      <BaseModal
        isOpen={currentModal === 'guests'}
        onClose={closeModal}
        title="인원 선택"
      >
        <RoomGuestsModal
          maxOccupancy={data.maxOccupancy}
          onClose={closeModal}
        />
      </BaseModal>
    </>
  );
};

export default Reservation;
