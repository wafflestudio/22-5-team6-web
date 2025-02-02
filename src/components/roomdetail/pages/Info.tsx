import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import crownleft from '@/assets/icons/roomdetail/crownleft.svg';
import crownright from '@/assets/icons/roomdetail/crownright.svg';
import superhost from '@/assets/icons/superhost.svg';
import { ACCOMMODATION_TYPES } from '@/components/common/constants/accommodationTypes';
import {
  CheckinIcon,
  LuggageIcon,
  TvIcon,
  WifiIcon,
} from '@/components/common/constants/icons';
import ReviewModal from '@/components/roomdetail/modals/ReviewModal';
import type { roomType } from '@/types/roomType';

interface InfoProps {
  data: roomType;
}

const Info = ({ data }: InfoProps) => {
  const navigate = useNavigate();
  const matchingItem = ACCOMMODATION_TYPES.find(
    (item) => item.type === data.roomType,
  );
  const issuperhost = data.isSuperhost;
  const isluggage = data.roomDetails.luggage;
  const ischeckin = data.roomDetails.selfCheckin;
  const iswifi = data.roomDetails.wifi;
  const istv = data.roomDetails.tv;
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-start w-full h-fit mt-8 pr-8">
      <div className="w-full overflow-hidden text-xl break-words">
        <span className="font-semibold">
          {data.address.street}, {data.address.sigungu},&nbsp;
        </span>
        한국의&nbsp;{data.address.detail}
      </div>
      <div className="w-full overflow-hidden text-base break-words mt-1">
        최대 인원&nbsp;{data.maxOccupancy}명&nbsp;&middot;&nbsp;침실&nbsp;
        {data.roomDetails.bedroom}개&nbsp;&middot;&nbsp;침대&nbsp;
        {data.roomDetails.bed}
        개&nbsp;&middot;&nbsp;욕실&nbsp;{data.roomDetails.bathroom}개
      </div>
      <div className="flex justify-between border border-gray-300 rounded-md p-6 w-full my-8">
        <div className="flex justify-center align-center gap-1 flex-1 border-r border-r-gray-300">
          <img src={crownleft} className="basis-1/10" />
          <div className="text-sm text-center">
            게스트<br></br>선호
          </div>
          <img src={crownright} className="basis-1/10" />
        </div>
        <div className="flex flex-col flex-1 items-center border-r border-r-gray-300">
          <div>{data.averageRating}</div>
          <div className="flex">
            <StarIcon className="" style={{ width: '10px', height: '10px' }} />
            <StarIcon className="" style={{ width: '10px', height: '10px' }} />
            <StarIcon className="" style={{ width: '10px', height: '10px' }} />
            <StarIcon className="" style={{ width: '10px', height: '10px' }} />
            <StarIcon className="" style={{ width: '10px', height: '10px' }} />
          </div>
        </div>
        <div className="text-center flex-1">
          <span className="font-semibold">{data.reviewCount}</span>개<br></br>
          <div
            onClick={() => {
              setIsReviewOpen(true);
            }}
            className="text-xs underline cursor-pointer"
          >
            후기
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 w-full h-fit pb-[30px] border-b border-b-gray-300 gap-4">
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          {matchingItem !== undefined ? (
            <>
              <img
                src={matchingItem.imageUrl}
                alt={matchingItem.label}
                className="h-6 w-6 opacity-60"
              />
              <div className="opacity-60 text-sm">{matchingItem.label}</div>
            </>
          ) : (
            <>
              <PhotoSizeSelectActualIcon />
              <div>정보 없음</div>
            </>
          )}
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          <img src={superhost} className="h-6 w-6 opacity-60" />
          <div className="opacity-60 text-sm">
            {issuperhost ? '슈퍼호스트' : '훌륭한 호스트'}
          </div>
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          <img src={LuggageIcon} className="h-6 w-6 opacity-60" />
          <div className="opacity-60 text-sm">
            {isluggage ? '여행 가방 보관 가능' : '여행 가방 보관 불가'}
          </div>
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          <img src={CheckinIcon} className="h-6 w-6 opacity-60" />
          <div className="opacity-60 text-sm">
            {ischeckin ? '셀프체크인' : '편의성이 뛰어난 체크인 절차'}
          </div>
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          <img src={TvIcon} className="h-6 w-6 opacity-60" />
          <div className="opacity-60 text-sm">{istv ? 'TV' : 'TV 없음'}</div>
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          <img src={WifiIcon} className="h-6 w-6 opacity-60" />
          <div className="opacity-60 text-sm">
            {iswifi ? '와이파이' : '와이파이 없음'}
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-start w-fit h-fit py-4 px-8 cursor-pointer"
        onClick={() => {
          void navigate(`/profile/${data.hostId}`);
        }}
      >
        <div className="mr-5 bg-gray-300 p-4 rounded-full">
          <PhotoSizeSelectActualIcon className="text-white" />
        </div>
        <div>
          <div>호스트: {data.hostName}&nbsp;님</div>
          <div className="text-sm text-gray-600">
            {issuperhost ? '슈퍼호스트' : '훌륭한 호스트'}
          </div>
        </div>
      </div>
      <div className="w-full h-fit border-t border-t-gray-300 text-wrap px-4 py-8">
        {data.description}
      </div>
      {isReviewOpen && (
        <ReviewModal
          data={data}
          onClose={() => {
            setIsReviewOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Info;
