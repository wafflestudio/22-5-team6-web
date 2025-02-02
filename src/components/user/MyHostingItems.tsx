import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/axiosInstance';

import LottieLoader from '../common/constants/lottieLoader';

type Room = {
  roomId: number;
  roomName: string;
  description: string;
  sido: string;
  sigungu: string;
  averageRating: number;
  roomType: string;
  price: number;
  maxOccupancy: number;
  imageUrl: string;
  isLiked: boolean;
};

type RoomResponse = {
  content: Room[];
};

const MyHostingItems = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string>('');
  const [hostId, setHostId] = useState<number | null>(null);
  const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        const profileResponse = await axiosInstance.get<{ userId: number }>(
          '/api/v1/profile',
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
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get<RoomResponse>(
          `/api/v1/rooms/hosting/${hostId}`,
        );
        setRooms(response.data.content);
      } catch (err) {
        console.error('숙소 목록 요청 실패:', err);
        setError('숙소 목록을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchRooms();
  }, [hostId]);

  if (isLoading) return <LottieLoader />;

  const handleDeleteRoom = async () => {
    if (deleteRoomId == null) return;

    const token = localStorage.getItem('token');
    if (token === null || (typeof token === 'string' && token === '')) {
      setError('로그인되지 않았습니다.');
      setIsLoading(false);
      return;
    }

    try {
      await axiosInstance.delete(`/api/v1/rooms/${deleteRoomId}`);

      setRooms((prev) => prev.filter((room) => room.roomId !== deleteRoomId));
      setIsDeleteModalOpen(false);
      setDeleteRoomId(null);
    } catch (err) {
      console.error('숙소 삭제 실패:', err);
      setError('숙소 삭제에 실패했습니다.');
    }
  };

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
    <div className="container mx-auto p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">등록한 숙소</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.roomId}
            className="relative group p-5 bg-white rounded-lg shadow-md cursor-pointer"
            onClick={() => void navigate(`/${room.roomId}`)}
          >
            {/* 숙소 이미지 */}
            <img
              src={room.imageUrl}
              alt={room.roomName}
              className="w-full h-40 object-cover rounded-md mb-2"
            />

            {/* 숙소 정보 */}
            <h2 className="text-lg font-semibold">{room.roomName}</h2>
            <p className="text-sm text-gray-500">
              {room.sido}, {room.sigungu}
            </p>
            <p className="text-sm text-gray-700 mt-2">{room.description}</p>
            <p className="text-md font-bold mt-3">
              ₩ {room.price.toLocaleString()} / 박
            </p>

            {/* Hover시 수정 & 삭제 아이콘 */}
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity">
              <EditOutlinedIcon
                className="w-10 h-10 text-white hover:text-black cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  void navigate(`/EditHosting/${room.roomId}`);
                }}
              />
              <DeleteOutlinedIcon
                className="w-10 h-10 text-white hover:text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteRoomId(room.roomId);
                  setIsDeleteModalOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-4">정말 이 숙소를 삭제하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => void handleDeleteRoom()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                삭제
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyHostingItems;
