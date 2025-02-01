import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LottieLoader from '@/components/common/constants/lottieLoader';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Topbar/Header';
import MyReservationDetails from '@/components/user/MyReservationDetails';
import ReviewForm from '@/components/user/ReviewForm';

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

const Review = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservation, setReservation] = useState<ReservationDetail | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (error !== null) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <div className="flex p-20 justify-center min-h-screen gap-16">
        {loading ? (
          <LottieLoader />
        ) : reservation !== null ? (
          <MyReservationDetails reservation={reservation} />
        ) : (
          <p className="text-red-500">예약 정보를 찾을 수 없습니다.</p>
        )}
        <ReviewForm />
      </div>
      <Footer />
    </>
  );
};

export default Review;
