import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Footer from '@/components/home/Footer';
import Header from '@/components/home/Topbar/Header';
import CancelModal from '@/components/user/CancelReservationModal';
import MyReservationDetails from '@/components/user/MyReservationDetails';
import ReservationUpdateModal from '@/components/user/profile/ReservationUpdateModal';

type ReservationDetail = {
  reservationId: number;
  roomId: number;
  startDate: string;
  endDate: string;
  place: string;
  price: number;
  numberOfGuests: number;
  imageUrl: string;
};

const ReservationDetails = () => {
  const navigate = useNavigate();
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservation, setReservation] = useState<ReservationDetail | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservationDetail = async () => {
      const token = localStorage.getItem('token');
      if (token === null) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      if (reservationId === undefined) {
        setError('예약 ID가 유효하지 않습니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<ReservationDetail>(
          `/api/v1/reservations/${reservationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setReservation(response.data);
      } catch (err) {
        console.error(err);
        setError('예약 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    void fetchReservationDetail();
  }, [reservationId]);

  const handleCancelReservation = async () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    if (reservationId === undefined) {
      setError('예약 ID가 유효하지 않습니다.');
      setLoading(false);
      return;
    }

    try {
      await axios.delete(`/api/v1/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('예약이 성공적으로 취소되었습니다.');
      void navigate('/MyReservations');
    } catch (err) {
      console.error(err);
      alert('예약 취소 중 오류가 발생했습니다.');
    } finally {
      setIsModalOpen(false);
    }
  };

  if (error !== null) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <div className="flex p-20 justify-center min-h-screen bg-white gap-16">
        {loading ? (
          <p>로딩 중...</p>
        ) : reservation !== null ? (
          <MyReservationDetails reservation={reservation} />
        ) : (
          <p className="text-red-500">예약 정보를 찾을 수 없습니다.</p>
        )}
        <div>
          <p className="text-xl">예약 변경 및 취소</p>
          <div
            onClick={() => {
              setIsUpdateModalOpen(true);
            }}
            className="flex items-center w-[500px] p-8 mt-6 bg-white border border-gray-300 cursor-pointer"
          >
            <OtherHousesOutlinedIcon className="mr-4 w-12 h-12 text-airbnb/75" />
            <div>
              <p className="text-xl mb-2">예약 변경하기</p>
              <p className="text-gray-500">여행 날짜, 게스트 수 변경.</p>
            </div>
          </div>
          <div
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="flex items-center w-[500px] p-8 mt-4 bg-white border border-gray-300 cursor-pointer"
          >
            <CancelOutlinedIcon className="mr-4 w-12 h-12 text-airbnb/75" />
            <p className="text-xl">예약 취소하기</p>
          </div>
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <CancelModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          onConfirm={() => void handleCancelReservation()}
        />
      )}

      {isUpdateModalOpen && reservation !== null && (
        <ReservationUpdateModal
          reservationId={reservation.reservationId.toString()}
          startDate={reservation.startDate}
          endDate={reservation.endDate}
          numberOfGuests={reservation.numberOfGuests}
          onClose={() => {
            setIsUpdateModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ReservationDetails;
