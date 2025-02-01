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
          <button
            onClick={() => void navigate('/Hosting')}
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
            onClick={() => void navigate(`/rooms/${room.roomId}`)}
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

            {/* Hover 시 수정 & 삭제 아이콘 */}
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
