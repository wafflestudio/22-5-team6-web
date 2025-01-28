import axios from 'axios';
import { useEffect, useState } from 'react';

type Reservation = {
  reservationId: number;
  place: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

type UpcomingReservationsProps = {
  userId: number;
  navigate: (path: string) => void;
};

const UpcomingReservations = ({
  userId,
  navigate,
}: UpcomingReservationsProps) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        const response = await axios.get<{ content: Reservation[] }>(
          `/api/v1/reservations/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const now = new Date();
        const upcoming = response.data.content.filter(
          (reservation) => new Date(reservation.startDate) >= now,
        );
        setReservations(upcoming);
      } catch {
        setError('다가오는 여행 데이터를 가져오지 못했습니다.');
      }
    };

    void fetchReservations();
  }, [userId]);

  if (error !== '') return <p className="text-red-500">{error}</p>;
  if (reservations.length === 0)
    return (
      <p className="text-gray-500 ml-2">
        다가오는 여행이 없습니다. 다음 여행 계획을 세워보세요!
      </p>
    );

  return (
    <div>
      <div className="flex w-full scrollbar-hidden overflow-x-auto gap-2">
        {reservations.map((reservation) => (
          <div
            key={reservation.reservationId}
            className="p-4 bg-white content-between rounded-2xl min-w-80 min-h-[224px] border border-gray-300 cursor-pointer"
            onClick={() => {
              navigate(`/reservations/${reservation.reservationId}`);
            }}
          >
            <img
              src={reservation.imageUrl}
              alt={reservation.place}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{reservation.place}</h3>
            <p className="text-sm text-gray-500">
              {reservation.startDate} ~ {reservation.endDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingReservations;
