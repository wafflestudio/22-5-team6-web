// components/hosting/HostingForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoIcon from '@/components/common/LogoIcon';

import { createHosting } from '../../api/hosting';
import AccommodationType from './AccommodationType';
import AddressInput from './AddressInput';
// import ImageUpload from './ImageUpload';

type Address = {
  sido: string; // 시/도
  sigungu: string; // 시/군/구
  street: string; // 도로명 주소
  detail: string; // 상세 주소
};

// type ImageFile = {
// file: File;
// preview: string;
// isCover: boolean;
// }

export default function HostingForm() {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  //   const [images, setImages] = useState<ImageFile[]>([]);
  const [maxOccupancy, setMaxOccupancy] = useState<string>('');
  const [address, setAddress] = useState<Address>({
    sido: '',
    sigungu: '',
    street: '',
    detail: '',
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const responseData = await createHosting({
        type,
        address,
        // images,
        name,
        description,
        price,
        maxOccupancy,
      });

      if (responseData.id !== '') {
        // 성공 처리
        console.error('숙소 등록 성공');
        setIsLoading(false);
        // 여기서 다른 페이지로 이동하거나 성공 메시지를 표시할 수 있습니다
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '오류가 발생했습니다.';
      setError(errorMessage);
      console.error('숙소 등록 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-200 z-50">
        <div className="max-w-screen-xl mx-auto h-full px-6 flex items-center">
          <button
            className="flex items-center gap-1"
            onClick={() => {
              void navigate('/');
            }}
          >
            <LogoIcon />
          </button>
        </div>
      </header>

      <div className="w-full max-w-2xl mx-auto p-6 mt-20">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* 숙소 타입 선택 */}
          <div className="mb-8">
            <label className="block text-lg font-medium mb-3">숙소 타입</label>
            <AccommodationType selectedType={type} onTypeSelect={setType} />
          </div>

          {/* 위치 정보 */}
          <div className="mb-8">
            <label className="block text-lg font-medium mb-3">위치</label>
            <AddressInput onAddressChange={setAddress} />
          </div>

          {/* <div className="mb-8">
              <label className="block text-lg font-medium mb-3">
                  숙소 사진
              </label>
              <ImageUpload onImagesChange={setImages} />
          </div> */}

          {/* 숙소 이름 입력 */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">숙소 이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              maxLength={32}
              placeholder="숙소의 특징을 잘 나타내는 이름을 지어주세요"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent"
            />
            <div className="text-right mt-1 text-sm text-gray-500">
              {name.length}/32
            </div>
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
              placeholder="숙소에 대해 자세히 설명해주세요"
              className="w-full px-4 py-3 h-32 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent resize-none"
            />
            <div className="text-right mt-1 text-sm text-gray-500">
              {description.length}/500
            </div>
          </div>

          {/* 요금 설정 */}
          <div className="mb-8">
            <label className="block text-lg font-medium mb-2">1박 요금</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                ₩
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="1박 요금을 입력해주세요"
                min="0"
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* 최대 수용 인원 설정 */}
          <div className="mb-8">
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
                placeholder="숙소 최대 수용 인원을 입력해주세요"
              />
              <span className="absolute right-4 text-gray-500">명</span>
            </div>
          </div>

          {/* 에러 메시지 표시 */}
          {error != null && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* 버튼 */}
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={isLoading}
            className={`w-full ${
              isLoading ? 'bg-gray-400' : 'bg-airbnb hover:bg-airbnb-hover'
            } text-white rounded-lg py-3 font-medium transition-colors`}
          >
            {isLoading ? '등록 중...' : '숙소 등록하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
