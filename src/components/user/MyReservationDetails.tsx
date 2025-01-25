import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type ReservationDetail = {
  reservationId: number;
  roomId: number;
  startDate: string;
  endDate: string;
  place: string;
  numberOfGuests: number;
  imageUrl: string;
};

const MyReservationDetails = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservation, setReservation] = useState<ReservationDetail | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservationDetail = async () => {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
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

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error !== null) {
    return <p className="text-red-500">{error}</p>;
  }

  if (reservation === null) {
    return <p>예약 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold my-4">{reservation.place}</h1>
      <img
        src={reservation.imageUrl}
        alt={reservation.place}
        className="w-3/4 h-64 object-cover rounded-lg shadow-md"
      />
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-3/4">
        <p className="text-lg font-semibold">
          여행 기간: {reservation.startDate} ~ {reservation.endDate}
        </p>
        <p className="mt-2 text-gray-700">
          게스트 수: {reservation.numberOfGuests}명
        </p>
        <p className="mt-2 text-gray-700">객실 ID: {reservation.roomId}</p>
      </div>
    </div>
  );
};

export default MyReservationDetails;
