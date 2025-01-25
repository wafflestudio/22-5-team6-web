import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getLabelByType } from '@/components/common/constants/accommodationTypes';
import Header from '@/components/home/Topbar/Header';
import type {
  Address,
  Price,
  RoomApiResponse,
  RoomDetails,
  RoomType,
} from '@/types/room';

import AccommodationType from './AccommodationType';
import AddressInput from './AddressInput';
import ImageUpload from './ImageUpload';
import PriceInput from './PriceInput';
import RoomDetailsInput from './RoomDetailsInput';

export default function HostingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [address, setAddress] = useState<Address>({
    sido: '',
    sigungu: '',
    street: '',
    detail: '',
  });
  const [price, setPrice] = useState<Price>({
    perNight: '',
    cleaningFee: '',
    charge: '',
    total: '',
  });
  const [roomDetails, setRoomDetails] = useState<RoomDetails>({
    wifi: false,
    selfCheckin: false,
    luggage: false,
    TV: false,
    bedroom: '',
    bathroom: '',
    bed: '',
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const validateStep = (step: number) => {
    setError(null);

    switch (step) {
      case 1:
        if (roomType == null) {
          setError('숙소 타입을 선택해주세요.');
          return false;
        }
        if (
          address.sido === '' ||
          address.sigungu === '' ||
          address.street === '' ||
          address.detail === ''
        ) {
          setError('주소를 모두 입력해주세요.');
          return false;
        }
        break;

      case 2:
        if (roomName === '') {
          setError('숙소 이름을 입력해주세요.');
          return false;
        }
        if (description === '') {
          setError('숙소 설명을 입력해주세요.');
          return false;
        }
        if (
          roomDetails.bedroom === '' ||
          roomDetails.bathroom === '' ||
          roomDetails.bed === ''
        ) {
          setError('숙소 시설 정보를 모두 입력해주세요.');
          return false;
        }
        if (selectedImages.length === 0) {
          setError('최소 1개 이상의 이미지를 선택해주세요.');
          return false;
        }
        break;

      case 3:
        if (price.perNight === '' || price.cleaningFee === '') {
          setError('가격 정보를 모두 입력해주세요.');
          return false;
        }
        if (maxOccupancy === '') {
          setError('최대 수용 인원을 입력해주세요.');
          return false;
        }
        break;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (token == null) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await axios.post(
        '/api/v1/rooms',
        {
          roomName,
          description,
          roomType,
          address: {
            sido: address.sido,
            sigungu: address.sigungu,
            street: address.street,
            detail: address.detail,
          },
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = response.data as RoomApiResponse;

      const uploadPromises = selectedImages.map(async (file, index) => {
        if (responseData.imageUploadUrlList[index] == null) {
          throw new Error('이미지 업로드 URL이 존재하지 않습니다.');
        }

        await axios.put(responseData.imageUploadUrlList[index], file, {
          headers: {
            'Content-Type': file.type,
          },
        });
      });

      await Promise.all(uploadPromises);

      alert('숙소를 성공적으로 등록했습니다!');
      void navigate('/');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="h-20 px-10">
        <Header />
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-airbnb transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / 3) * 100}%`,
          }}
        />
      </div>

      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Step Title */}
          <h1 className="text-2xl font-semibold mb-8">
            {currentStep}단계 |{' '}
            {currentStep === 1
              ? '숙소 정보를 알려주세요'
              : currentStep === 2
                ? '숙소의 매력을 돋보이게 하세요'
                : currentStep === 3
                  ? '등록을 완료하세요'
                  : '등록 전 정보를 확인하세요'}
          </h1>

          {currentStep === 1 && (
            <>
              {/* 숙소 타입 선택 */}
              <div className="mb-8">
                <label className="block text-lg font-medium mb-3">
                  숙소 타입
                </label>
                <AccommodationType
                  selectedType={roomType}
                  onTypeSelect={setRoomType}
                />
              </div>

              {/* 위치 정보 */}
              <div className="mb-8">
                <label className="block text-lg font-medium mb-3">위치</label>
                <AddressInput onAddressChange={setAddress} />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* 숙소 이름 입력 */}
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">
                  숙소 이름
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => {
                    setRoomName(e.target.value);
                  }}
                  maxLength={32}
                  placeholder="숙소의 특징을 잘 나타내는 이름을 지어주세요"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent"
                />
                <div className="text-right mt-1 text-sm text-gray-500">
                  {roomName.length}/32
                </div>
              </div>

              {/* 숙소 설명 입력 */}
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">
                  숙소 설명
                </label>
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

              {/* 숙소 시설*/}
              <div className="mb-8">
                <label className="block text-lg font-medium mb-2">
                  숙소 시설
                </label>
                <RoomDetailsInput
                  details={roomDetails}
                  onDetailsChange={setRoomDetails}
                />
              </div>

              {/* 이미지 업로드 */}
              <div className="mb-8">
                <label className="block text-lg font-medium mb-2">
                  숙소 이미지
                </label>
                <ImageUpload onImagesChange={setSelectedImages} />
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              {/* 요금 설정 */}
              <div className="mb-8">
                <label className="block text-lg font-medium mb-3">
                  요금 설정
                </label>
                <PriceInput price={price} onPriceChange={setPrice} />
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
            </>
          )}

          {currentStep === 4 && (
            <div className="space-y-8">
              {/* 기본 정보 섹션 */}
              <section className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  기본 정보
                </h2>
                <div className="grid gap-4">
                  <div className="flex items-baseline">
                    <span className="w-24 text-gray-600">숙소 타입</span>
                    <span className="font-medium">
                      {roomType !== null ? getLabelByType(roomType) : ''}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="w-24 text-gray-600 mb-2">주소</span>
                    <div className="font-medium ml-6">
                      <p>
                        {address.sido} {address.sigungu} {address.street}{' '}
                        {address.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 상세 정보 섹션 */}
              <section className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  상세 정보
                </h2>
                <div className="grid gap-4">
                  <div className="flex items-baseline">
                    <span className="w-24 text-gray-600">숙소 이름</span>
                    <span className="font-medium">{roomName}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="w-24 text-gray-600 mb-2">숙소 설명</span>
                    <p className="font-medium ml-6 whitespace-pre-wrap">
                      {description}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="w-24 text-gray-600 mb-2">시설 정보</span>
                    <div className="font-medium ml-6 grid grid-cols-2 gap-2">
                      <span>침실 {roomDetails.bedroom}개</span>
                      <span>침대 {roomDetails.bed}개</span>
                      <span>욕실 {roomDetails.bathroom}개</span>
                      {roomDetails.wifi && <span>와이파이</span>}
                      {roomDetails.selfCheckin && <span>셀프 체크인</span>}
                      {roomDetails.luggage && <span>짐 보관</span>}
                      {roomDetails.TV && <span>TV</span>}
                    </div>
                  </div>
                </div>
              </section>

              {/* 이미지 섹션 */}
              <section className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  숙소 이미지
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {selectedImages.map((file, index) => (
                    <div key={file.name} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {index === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-airbnb text-white text-xs rounded">
                          대표 사진
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  총 {selectedImages.length}개의 이미지가 업로드됩니다.
                </p>
              </section>

              {/* 요금 정보 섹션 */}
              <section className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  요금 정보
                </h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-gray-600">1박 요금</span>
                      <span className="font-medium">
                        {Number(price.perNight).toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-gray-600">청소비</span>
                      <span className="font-medium">
                        {Number(price.cleaningFee).toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-gray-600">수수료</span>
                      <span className="font-medium">
                        {Number(price.charge).toLocaleString()}원
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-baseline justify-between">
                      <span className="text-gray-900 font-medium">총 금액</span>
                      <span className="text-xl font-semibold text-airbnb">
                        {Number(price.total).toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 최대 수용 인원 섹션 */}
              <section className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  수용 인원
                </h2>
                <div className="flex items-baseline">
                  <span className="text-gray-600">최대 수용 가능</span>
                  <span className="font-medium ml-4">{maxOccupancy}명</span>
                </div>
              </section>
            </div>
          )}
          {/* 에러 메시지 */}
          {error != null && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* 버튼 */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium
                ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              이전
            </button>

            <button
              type="button"
              onClick={
                currentStep === 4 ? () => void handleSubmit() : handleNext
              }
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg font-medium
                ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-airbnb hover:bg-airbnb-hover'
                } text-white`}
            >
              {isLoading
                ? '처리 중...'
                : currentStep === 4
                  ? '숙소 등록하기'
                  : '다음'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
