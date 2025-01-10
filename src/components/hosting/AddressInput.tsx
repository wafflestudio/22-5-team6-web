import { useState } from 'react';

import {
  getDistricts,
  SIDO_LIST,
} from '@/components/common/constants/koreanDistricts';

type Address = {
  sido: string; // 시/도
  sigungu: string; // 시/군/구
  street: string; // 도로명 주소
  detail: string; // 상세 주소
};

type AddressInputProps = {
  onAddressChange: (address: Address) => void;
};

export default function AddressInput({ onAddressChange }: AddressInputProps) {
  const [address, setAddress] = useState<Address>({
    sido: '',
    sigungu: '',
    street: '',
    detail: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const newAddress = { ...address, [name]: value };
    // sido가 변경되면 sigungu 초기화
    if (name === 'sido') {
      newAddress.sigungu = '';
    }
    setAddress(newAddress);
    onAddressChange(newAddress);
  };

  // 선택된 시/도의 시/군/구 목록 가져오기
  const sigunguList = address.sido !== '' ? getDistricts(address.sido) : [];

  return (
    <div className="space-y-4">
      {/* 시/도 선택 (드롭다운) */}
      <div>
        <select
          name="sido"
          value={address.sido}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent bg-white"
        >
          <option value="">시/도 선택</option>
          {SIDO_LIST.map((sido) => (
            <option key={sido} value={sido}>
              {sido}
            </option>
          ))}
        </select>
      </div>

      {/* 시/군/구 선택 (드롭다운) */}
      <div>
        <select
          name="sigungu"
          value={address.sigungu}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent bg-white"
        >
          <option value="">시/군/구 선택</option>
          {sigunguList.map((sigungu) => (
            <option key={sigungu} value={sigungu}>
              {sigungu}
            </option>
          ))}
        </select>
      </div>

      {/* 도로명 주소 */}
      <input
        type="text"
        name="street"
        value={address.street}
        onChange={handleChange}
        placeholder="도로명 주소 (예: 동일로 216길)"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent"
      />

      {/* 상세 주소 */}
      <input
        type="text"
        name="detail"
        value={address.detail}
        onChange={handleChange}
        placeholder="상세 주소 (예: 92, 대영빌딩 1층)"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent"
      />
    </div>
  );
}
