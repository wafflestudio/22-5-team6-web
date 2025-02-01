import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Address = {
  sido: string;
  sigungu: string;
  street: string;
  detail: string;
};

type RoomDetails = {
  wifi: boolean;
  selfCheckin: boolean;
  luggage: boolean;
  tv: boolean;
  bedroom: number;
  bathroom: number;
  bed: number;
};

type Price = {
  perNight: number;
  cleaningFee: number;
  charge: number;
  total: number;
};

type Room = {
  roomId: number;
  roomName: string;
  description: string;
  address: Address;
  roomType: string;
  roomDetails: RoomDetails;
  price: Price;
  maxOccupancy: number;
  imageUrl: string;
};

type RoomResponse = {
  totalPages: number;
  totalElements: number;
  content: Room[];
  number: number;
  first: boolean;
  last: boolean;
};

const MyHostingItems = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string>('');
  const [hostId, setHostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        const profileResponse = await axios.get<{ userId: number }>(
          '/api/v1/profile',
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setHostId(profileResponse.data.userId);
      } catch {
        setError('프로필 정보를 불러오는 데 실패했습니다.');
      }
    };

    void fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (hostId == null) return;

      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        const response = await axios.get<RoomResponse>(
          `/api/v1/rooms/hosting/${hostId}?page=1&size=1&sort=id%2Casc`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setRooms(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch {
        setError('숙소 목록을 불러오는 데 실패했습니다.');
      }
    };

    void fetchRooms();
  }, [hostId, page]);

  if (error !== '') return <p className="text-red-500">{error}</p>;
  if (rooms.length === 0)
    return (
      <div className="flex justify-center">
        <div className="w-3/5 h-full flex flex-col justify-center items-center my-48">
          <p className="text-3xl mb-16 text-gray-700">
            아직 등록된 숙소가 없습니다.
          </p>
          <div className="flex gap-12 mb-12">
            <div className="flex flex-col items-center w-72 text-center">
              <div className="w-5 h-5 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="m17.98 1.9.14.14 13.25 13.25-1.41 1.42-.96-.96v12.58a2 2 0 0 1-1.85 2H5a2 2 0 0 1-2-1.85V15.75l-.96.96-1.41-1.42L13.88 2.04a3 3 0 0 1 4.1-.13zm-2.6 1.47-.09.08L5 13.75 5 28.33h6v-10a2 2 0 0 1 1.85-2H19a2 2 0 0 1 2 1.85v10.15h6V13.75L16.7 3.45a1 1 0 0 0-1.31-.08zM19 18.33h-6v10h6z"></path>
                </svg>
              </div>
              <p>몇 단계만 거치면 숙소를 등록할 수 있어요.</p>
            </div>
            <div className="flex flex-col items-center w-72 text-center">
              <div className="w-5 h-5 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M19 1v2h-2v2.04a13 13 0 0 1 12 12.65V18a13 13 0 1 1-26 0 12.96 12.96 0 0 1 4.1-9.48L5.3 6.71l1.4-1.42 1.97 1.97A12.93 12.93 0 0 1 15 5.04V3h-2V1h6zm-3 6a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm-4.3 3.3 6 6-1.4 1.4-6-6 1.4-1.4zM16 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                </svg>
              </div>
              <p>
                본인의 페이스에 맞게 진행하고, 필요하면 언제든지 내용을
                수정하세요.
              </p>
            </div>
            <div className="flex flex-col items-center w-72 text-center">
              <div className="w-5 h-5 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M26 1a5 5 0 0 1 5 4.78v10.9a5 5 0 0 1-4.78 5H26a5 5 0 0 1-4.78 5h-4l-3.72 4.36-3.72-4.36H6a5 5 0 0 1-4.98-4.56L1 21.9 1 21.68V11a5 5 0 0 1 4.78-5H6a5 5 0 0 1 4.78-5H26zm-5 7H6a3 3 0 0 0-3 2.82v10.86a3 3 0 0 0 2.82 3h4.88l2.8 3.28 2.8-3.28H21a3 3 0 0 0 3-2.82V11a3 3 0 0 0-3-3zm-1 10v2H6v-2h14zm6-15H11a3 3 0 0 0-3 2.82V6h13a5 5 0 0 1 5 4.78v8.9a3 3 0 0 0 3-2.82V6a3 3 0 0 0-2.82-3H26zM15 13v2H6v-2h9z"></path>
                </svg>
              </div>
              <p>프로필에서 내 숙소를 확인할 수 있어요.</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              void navigate('/Hosting');
            }}
            className="w-max mt-6 px-4 py-3 text-white text-md rounded-lg transition-all duration-500 bg-gradient-to-tl from-airbnb-hover from-40% via-[#e8214f] to-airbnb bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            당신의 공간을 에어비앤비하세요
          </button>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">등록한 숙소</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.roomId}
            className="p-5 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
            onClick={() => void navigate(`/rooms/${room.roomId}`)}
          >
            <img
              src={room.imageUrl}
              alt={room.roomName}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{room.roomName}</h2>
            <p className="text-sm text-gray-500">
              {room.address.sido}, {room.address.sigungu}
            </p>
            <p className="text-sm text-gray-700 mt-2">{room.description}</p>
            <p className="text-md font-bold mt-3">
              ₩ {room.price.perNight.toLocaleString()} / 박
            </p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 0));
          }}
          disabled={page === 0}
          className={`px-4 py-2 mr-2 rounded ${page === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-airbnb text-white hover:bg-airbnb-hover'}`}
        >
          이전
        </button>
        <span className="text-lg mx-4">
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => {
            setPage((prev) => Math.min(prev + 1, totalPages - 1));
          }}
          disabled={page >= totalPages - 1}
          className={`px-4 py-2 ml-2 rounded ${page >= totalPages - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-airbnb text-white hover:bg-airbnb-hover'}`}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MyHostingItems;
