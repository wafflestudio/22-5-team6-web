import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axiosInstance from '@/axiosInstance';
import type { RoomType } from '@/types/room';

import AccommodationType from '../hosting/AccommodationType';
import PriceInput from '../hosting/PriceInput';
import RoomDetailsInput from '../hosting/RoomDetailsInput';
import UpdateAddressInput from './UpdateAddressInput';

type RoomUpdateResponse = {
  roomId: number;
  hostId: number;
  hostName: string;
  roomName: string;
  description: string;
  roomType: string;
  address: {
    sido: string;
    sigungu: string;
    street: string;
    detail: string;
  };
  roomDetails: {
    wifi: boolean;
    selfCheckin: boolean;
    luggage: boolean;
    TV: boolean;
    bedroom: number;
    bathroom: number;
    bed: number;
  };
  price: {
    perNight: number;
    cleaningFee: number;
    charge: number;
    total: number;
  };
  maxOccupancy: number;
  averageRating: number;
  reviewCount: number;
  isSuperHost: boolean;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  imageUrlList: string[];
};

export default function EditHostingForm() {
  const { roomId } = useParams();
  const validRoomId = roomId ?? '';
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [address, setAddress] = useState({
    sido: '',
    sigungu: '',
    street: '',
    detail: '',
  });
  const [roomDetails, setRoomDetails] = useState({
    wifi: false,
    selfCheckin: false,
    luggage: false,
    TV: false,
    bedroom: '',
    bathroom: '',
    bed: '',
  });
  const [price, setPrice] = useState({
    perNight: '',
    cleaningFee: '',
    charge: '',
    total: '',
  });
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** 기존 숙소 정보 불러오기 */
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axiosInstance.get<RoomUpdateResponse>(
          `/api/v1/rooms/main/${validRoomId}`,
        );
        const data = response.data;

        setRoomName(data.roomName);
        setDescription(data.description);
        setRoomType(data.roomType as RoomType);
        setAddress(data.address);
        setRoomDetails({
          wifi: data.roomDetails.wifi,
          selfCheckin: data.roomDetails.selfCheckin,
          luggage: data.roomDetails.luggage,
          TV: data.roomDetails.TV,
          bedroom: data.roomDetails.bedroom.toString(),
          bathroom: data.roomDetails.bathroom.toString(),
          bed: data.roomDetails.bed.toString(),
        });
        setPrice({
          perNight: data.price.perNight.toString(),
          cleaningFee: data.price.cleaningFee.toString(),
          charge: data.price.charge.toString(),
          total: data.price.total.toString(),
        });
        setMaxOccupancy(data.maxOccupancy.toString());
        setSelectedImages(data.imageUrlList);
        setExistingImages(data.imageUrlList);
      } catch (err) {
        console.error('숙소 정보를 불러오는 데 실패했습니다:', err);
        setError('숙소 정보를 불러오는 데 실패했습니다.');
      }
    };

    if (validRoomId !== '') {
      void fetchRoomData();
    }
  }, [validRoomId]);

  /** 숙소 수정 요청 */
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await axiosInstance.put(`/api/v1/rooms/${validRoomId}`, {
        roomName,
        description,
        roomType,
        address,
        roomDetails: {
          wifi: roomDetails.wifi,
          selfCheckin: roomDetails.selfCheckin,
          luggage: roomDetails.luggage,
          TV: roomDetails.TV,
          bedroom: Number(roomDetails.bedroom),
          bathroom: Number(roomDetails.bathroom),
          bed: Number(roomDetails.bed),
        },
        price: {
          perNight: Number(price.perNight),
          cleaningFee: Number(price.cleaningFee),
          charge: Number(price.charge),
          total: Number(price.total),
        },
        maxOccupancy: Number(maxOccupancy),
        imageSlot: selectedImages.length,
      });

      alert('숙소가 성공적으로 수정되었습니다!');
      void navigate('/MyHosting');
    } catch (err) {
      console.error('숙소 정보를 불러오는 데 실패했습니다:', err);
      setError('숙소 수정에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-semibold mb-8">숙소 정보 수정</h1>

        {/* 숙소 이미지 */}
        <div className="mb-12">
          <label className="block text-lg font-medium mb-2">숙소 이미지</label>
          <p className="text-sm text-gray-500">이미지는 수정할 수 없어요.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {existingImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Existing ${index}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* 숙소 타입 선택 */}
        <div className="mb-12">
          <label className="block text-lg font-medium mb-3">숙소 타입</label>
          <AccommodationType
            selectedType={roomType}
            onTypeSelect={setRoomType}
          />
        </div>

        {/* 주소 입력 */}
        <div className="mb-12">
          <label className="block text-lg font-medium mb-3">위치</label>
          <UpdateAddressInput
            onAddressChange={setAddress}
            initialAddress={address}
          />
        </div>

        <hr className="w-full mb-8 border-t border-2 border-rose-200" />

        {/* 숙소 이름 입력 */}
        <div className="mb-12">
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">숙소 이름</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              maxLength={32}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb"
            />
          </div>

          {/* 숙소 설명 입력 */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">숙소 설명</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              maxLength={500}
              className="w-full px-4 py-3 h-32 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb"
            />
          </div>

          {/* 숙소 시설 정보 입력 */}
          <label className="block text-lg font-medium mb-2">숙소 시설</label>
          <RoomDetailsInput
            details={roomDetails}
            onDetailsChange={setRoomDetails}
          />
        </div>

        <hr className="w-full mb-8 border-t border-2 border-rose-200" />

        {/* 요금 설정 */}
        <div className="mb-12">
          <label className="block text-lg font-medium mb-5">요금 설정</label>
          <PriceInput price={price} onPriceChange={setPrice} />
        </div>

        {/* 최대 수용 인원 */}
        <div className="mb-12">
          <label className="block text-lg font-medium mb-2">
            최대 수용 인원
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              value={maxOccupancy}
              onChange={(e) => {
                setMaxOccupancy(e.target.value);
              }}
              min="1"
              max="100"
              className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-4 text-gray-500">명</span>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error !== '' && <p className="text-red-500">{error}</p>}

        {/* 수정 버튼 */}
        <button
          onClick={() => void handleSubmit()}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-airbnb text-white rounded-lg hover:bg-airbnb-hover"
        >
          {isLoading ? '로딩 중...' : '숙소 정보 수정하기'}
        </button>
      </div>
    </div>
  );
}
