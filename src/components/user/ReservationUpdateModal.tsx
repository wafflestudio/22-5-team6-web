import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/axiosInstance';
import BaseModal from '@/components/common/Modal/BaseModal';
import { useSearch } from '@/components/home/context/SearchContext';

import RoomCalendarModal from '../roomdetail/roomCalendarModal';

type ReservationUpdateModalProps = {
  roomId: number;
  reservationId: string;
  onClose: () => void;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
};

const ReservationUpdateModal: React.FC<ReservationUpdateModalProps> = ({
  roomId,
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
  } = useSearch();
  const [error, setError] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(numberOfGuests);
  const [maxOccupancy, setMaxOccupancy] = useState<number | null>(null);

  useEffect(() => {
    setCheckIn(new Date(startDate));
    setCheckOut(new Date(endDate));
    setGuests(numberOfGuests);

    const fetchMaxOccupancy = async () => {
      try {
        const response = await axiosInstance.get<{ maxOccupancy: number }>(
          `/api/v1/rooms/main/${roomId}`,
        );
        setMaxOccupancy(response.data.maxOccupancy);
      } catch (err) {
        console.error('최대 숙박 인원 정보를 불러오는 데 실패했습니다.', err);
        setError('최대 숙박 인원 정보를 불러오는 데 실패했습니다.');
      }
    };

    void fetchMaxOccupancy();
  }, [roomId, startDate, endDate, numberOfGuests, setCheckIn, setCheckOut]);

  const navigate = useNavigate();

  const handleGuestChange = (delta: number) => {
    setGuests((prev) => {
      if (delta > 0 && maxOccupancy !== null && prev >= maxOccupancy) {
        return prev;
      }
      return Math.max(1, prev + delta);
    });
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
      await axiosInstance.put(`/api/v1/reservations/${reservationId}`, {
        startDate: dayjs(checkIn).format('YYYY-MM-DD'),
        endDate: dayjs(checkOut).format('YYYY-MM-DD'),
        numberOfGuests: guests,
      });

      alert('예약이 성공적으로 변경되었습니다.');
      onClose();
      void navigate('/MyReservations');
    } catch (err) {
      setError('예약 수정 중 문제가 발생했습니다. 다시 시도해주세요.');
      console.error(err);
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
              disabled={maxOccupancy !== null && guests >= maxOccupancy}
              className={`w-8 h-8 rounded-full border flex items-center justify-center
                ${maxOccupancy !== null && guests >= maxOccupancy ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-gray-400 text-gray-400 hover:border-gray-700 hover:text-gray-700'}
              `}
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
          <RoomCalendarModal id={roomId} onClose={closeModal} />
        </BaseModal>
      </div>
    </div>
  );
};

export default ReservationUpdateModal;
