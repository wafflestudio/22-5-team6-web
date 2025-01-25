import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Reservation = {
  reservationId: number;
  place: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

type MyReservationItemsResponse = {
  content: Reservation[];
};

type ProfileInfo = {
  userId: number;
  nickname: string;
};

const MyReservationItems = () => {
  const navigate = useNavigate();
  const [pastMyReservationItems, setPastMyReservationItems] = useState<
    Reservation[]
  >([]);
  const [upcomingMyReservationItems, setUpcomingMyReservationItems] = useState<
    Reservation[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyReservationItems = async () => {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        const profileResponse = await axios.get<ProfileInfo>(
          '/api/v1/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const userId = profileResponse.data.userId;

        const MyReservationItemsResponse =
          await axios.get<MyReservationItemsResponse>(
            `/api/v1/reservations/user/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );

        const now = new Date();

        // 지난 예약: endDate가 현재 날짜보다 이전
        const past = MyReservationItemsResponse.data.content.filter(
          (reservation) => {
            return new Date(reservation.endDate) < now;
          },
        );

        // 다가오는 여행: startDate가 현재 날짜와 같거나 이후
        const upcoming = MyReservationItemsResponse.data.content.filter(
          (reservation) => {
            return new Date(reservation.startDate) >= now;
          },
        );

        // 정렬 (startDate 기준 최신순)
        setPastMyReservationItems(
          past.sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
          ),
        );
        setUpcomingMyReservationItems(
          upcoming.sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
          ),
        );

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('데이터를 가져오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    void fetchMyReservationItems();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error !== null) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold my-4">예약 내역</h1>

      {/* 다가오는 여행 */}
      <div className="w-3/4 mb-8">
        <h2 className="text-xl font-semibold mb-4">다가오는 여행</h2>
        {upcomingMyReservationItems.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingMyReservationItems.map((reservation) => (
              <div
                key={reservation.reservationId}
                onClick={(e) => {
                  e.preventDefault();
                  void navigate(`/reservations/${reservation.reservationId}`);
                }}
                className="p-4 bg-white rounded-lg shadow-md"
              >
                <img
                  src={reservation.imageUrl}
                  alt={reservation.place}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold">{reservation.place}</h2>
                <p className="text-sm text-gray-500">
                  {reservation.startDate} ~ {reservation.endDate}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>다가오는 여행이 없습니다.</p>
        )}
      </div>

      {/* 지난 예약 */}
      <div className="w-3/4">
        <h2 className="text-xl font-semibold mb-4">지난 예약</h2>
        {pastMyReservationItems.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {pastMyReservationItems.map((reservation) => (
              <div
                key={reservation.reservationId}
                onClick={() =>
                  void navigate(`/reviews/${reservation.reservationId}`)
                }
                className="p-4 bg-white rounded-lg shadow-md"
              >
                <img
                  src={reservation.imageUrl}
                  alt={reservation.place}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold">{reservation.place}</h2>
                <p className="text-sm text-gray-500">
                  {reservation.startDate} ~ {reservation.endDate}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>지난 예약이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyReservationItems;
