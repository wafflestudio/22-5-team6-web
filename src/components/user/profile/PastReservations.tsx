import axios from 'axios';
import { useEffect, useState } from 'react';

import visited from '@/assets/icons/visited.svg';
import LogoIconBlack from '@/assets/Logo/LocoIconBlack';

type Reservation = {
  reservationId: number;
  place: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

type PastReservationsProps = {
  userId: number;
};

const PastReservations = ({ userId }: PastReservationsProps) => {
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
        const past = response.data.content.filter(
          (reservation) => new Date(reservation.endDate) < now,
        );
        setReservations(past);
      } catch {
        setError('지난 예약 데이터를 가져오지 못했습니다.');
      }
    };

    void fetchReservations();
  }, [userId]);

  if (error !== '') return <p className="text-red-500">{error}</p>;
  if (reservations.length === 0)
    return <p className="text-gray-500 ml-2">아직 방문한 여행지가 없습니다.</p>;

  return (
    <div>
      <div className="flex w-full scrollbar-hidden overflow-x-auto gap-2">
        {reservations.map((reservation) => (
          <div
            key={reservation.reservationId}
            className="flex flex-col items-center p-4 bg-white content-between rounded-2xl min-w-60 min-h-32 border-4 border-rose-200"
          >
            <h3 className="mb-2 text-lg text-rose-400 font-semibold">
              {reservation.place}
            </h3>
            <div className="flex items-center gap-6">
              <span className="text-rose-400">KOR</span>
              <img
                src={visited}
                alt={'이전 여행지'}
                className="w-16 h-16 fill-rose-400"
              />
              <div className="w-6 h-6 fill-rose-400">
                <LogoIconBlack />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastReservations;
