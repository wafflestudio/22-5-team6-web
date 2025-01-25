import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseModal from '@/components/common/Modal/BaseModal';
import { useRoomSearch } from '@/components/home/context/RoomSearchContext';
import CalendarModal from '@/components/home/Topbar/SearchBar/modals/CalendarModal';

type ReservationUpdateModalProps = {
  reservationId: string;
  onClose: () => void;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
};

const ReservationUpdateModal: React.FC<ReservationUpdateModalProps> = ({
  reservationId,
  onClose,
  startDate,
  endDate,
  numberOfGuests,
}) => {
  const {
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
    openModal,
    closeModal,
    currentModal,
  } = useRoomSearch();
  const [error, setError] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(numberOfGuests);

  useEffect(() => {
    setCheckIn(new Date(startDate));
    setCheckOut(new Date(endDate));
    setGuests(numberOfGuests);
  }, [startDate, endDate, numberOfGuests, setCheckIn, setCheckOut]);

  const navigate = useNavigate();

  const handleGuestChange = (delta: number) => {
    setGuests((prev) => Math.max(1, prev + delta));
  };

  const handleUpdateReservation = async () => {
    if (checkIn === null || checkOut === null) {
      setError('체크인 및 체크아웃 날짜를 선택해주세요.');
      return;
    }

    const token = localStorage.getItem('token');
    if (token === null) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      await axios.put(
        `/api/v1/reservations/${reservationId}`,
        {
          startDate: dayjs(checkIn).format('YYYY-MM-DD'),
          endDate: dayjs(checkOut).format('YYYY-MM-DD'),
          numberOfGuests: guests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert('예약이 성공적으로 변경되었습니다.');
      onClose();
      void navigate('/MyReservations');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError('해당 날짜는 예약할 수 없습니다. 다른 날짜를 선택해주세요.');
      } else {
        console.error(err);
        setError('예약 수정 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 w-[400px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex w-full justify-between items-center mb-4">
          <h3 className="text-xl font-bold">예약 변경</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <ClearOutlinedIcon />
          </button>
        </div>
        <hr className="w-full mb-6 border-t border-gray-300" />

        {error !== null && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}

        {/* 날짜 선택 버튼 */}
        <div className="mb-8">
          <label className="block text-md font-medium mb-4">
            체크인 및 체크아웃
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                openModal('calendar');
              }}
              className="p-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              <span className="block text-sm font-medium">체크인</span>
              <span className="block text-sm text-gray-500">
                {checkIn !== null
                  ? dayjs(checkIn).format('YYYY-MM-DD')
                  : '날짜 선택'}
              </span>
            </button>
            <button
              onClick={() => {
                openModal('calendar');
              }}
              className="p-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              <span className="block text-sm font-medium">체크아웃</span>
              <span className="block text-sm text-gray-500">
                {checkOut !== null
                  ? dayjs(checkOut).format('YYYY-MM-DD')
                  : '날짜 선택'}
              </span>
            </button>
          </div>
        </div>

        {/* 숙박 인원 수정 */}
        <div className="flex justify-between items-center mb-8">
          <label className="text-md">숙박 인원</label>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => {
                handleGuestChange(-1);
              }}
              className="w-8 h-8 rounded-full border border-gray-400 text-gray-400 hover:border-gray-700 hover:text-gray-700 flex items-center justify-center"
            >
              -
            </button>
            <span className="text-lg">{guests}명</span>
            <button
              onClick={() => {
                handleGuestChange(1);
              }}
              className="w-8 h-8 rounded-full border border-gray-400 text-gray-400 hover:border-gray-700 hover:text-gray-700 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              void handleUpdateReservation();
            }}
            className="w-full px-4 py-2 bg-airbnb text-white rounded hover:bg-airbnb-hover"
          >
            예약 변경하기
          </button>
        </div>

        {/* CalendarModal */}
        <BaseModal
          isOpen={currentModal === 'calendar'}
          onClose={closeModal}
          title="날짜 선택"
        >
          <CalendarModal onClose={closeModal} />
        </BaseModal>
      </div>
    </div>
  );
};

export default ReservationUpdateModal;
