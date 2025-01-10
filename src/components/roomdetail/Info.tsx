import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import StarIcon from '@mui/icons-material/Star';

import { ACCOMMODATION_TYPES } from '@/components/common/constants/accommodationTypes';
import checkin from '@/components/roomdetail/checkin.svg';
import crownleft from '@/components/roomdetail/crownleft.svg';
import crownright from '@/components/roomdetail/crownright.svg';
import luggage from '@/components/roomdetail/luggage.svg';
import superhost from '@/components/roomdetail/superhost.svg';
import tv from '@/components/roomdetail/tv.svg';
import wifi from '@/components/roomdetail/wifi.svg';
import type { roomType } from '@/types/roomType';

interface InfoProps {
  data: roomType;
}

const Info = ({ data }: InfoProps) => {
  const matchingItem = ACCOMMODATION_TYPES.find(
    (item) => item.label === data.type2,
  );
  const issuperhost = data.isSuperhost;
  const isluggage = data.isLuggage;
  const ischeckin = data.isSelfcheckin;
  const iswifi = data.isWifi;
  const istv = data.isTv;
  return (
    <div className="flex flex-col items-start w-full h-fit mt-8 pr-8">
      <div className="w-full overflow-hidden text-xl break-words">
        <span className="font-semibold">
          {data.location.town}, {data.location.suburb},&nbsp;
        </span>
        {data.location.country}의&nbsp;{data.type1}
      </div>
      <div className="w-full overflow-hidden text-base break-words mt-1">
        최대 인원&nbsp;{data.maxOccupancy}명&nbsp;&middot;&nbsp;침실&nbsp;
        {data.bedroom}개&nbsp;&middot;&nbsp;침대&nbsp;{data.bed}
        개&nbsp;&middot;&nbsp;욕실&nbsp;{data.bathroom}개
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
          <div>{data.avgrating}</div>
          <div className="flex">
            <StarIcon className="" style={{ width: '10px', height: '10px' }} />
            <StarIcon className="" style={{ width: '10px', height: '10px' }} />
            <StarIcon className="" style={{ width: '10px', height: '10px' }} />
            <StarIcon className="" style={{ width: '10px', height: '10px' }} />
            <StarIcon className="" style={{ width: '10px', height: '10px' }} />
          </div>
        </div>
        <div className="text-center flex-1">
          <span className="font-semibold">{data.reviewcount}</span>개<br></br>
          <div className="text-xs underline">후기</div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 w-full h-fit pb-[30px] border-b border-b-gray-300 gap-4">
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          {matchingItem !== undefined ? (
            <>
              <img
                src={matchingItem.imageUrl}
                alt={matchingItem.label}
                className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity"
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
          <img
            src={superhost}
            className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity"
          />
          <div className="opacity-60 text-sm">
            {issuperhost ? '슈퍼호스트' : '훌륭한 호스트'}
          </div>
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          <img
            src={luggage}
            className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity"
          />
          <div className="opacity-60 text-sm">
            {isluggage ? '여행 가방 보관 가능' : '여행 가방 보관 풀가'}
          </div>
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          <img
            src={checkin}
            className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity"
          />
          <div className="opacity-60 text-sm">
            {ischeckin ? '셀프체크인' : '편의성이 뛰어난 체크인 절차'}
          </div>
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          <img
            src={tv}
            className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity"
          />
          <div className="opacity-60 text-sm">{istv ? 'TV' : 'TV 없음'}</div>
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          <img
            src={wifi}
            className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity"
          />
          <div className="opacity-60 text-sm">
            {iswifi ? '와이파이' : '와이파이 없음'}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start w-full h-fit py-4 px-8 border-b border-b-gray-300">
        <div className="mr-5 bg-gray-300 p-4 rounded-full">
          <PhotoSizeSelectActualIcon className="text-white" />
        </div>
        <div>
          <div>호스트: {data.host.username}&nbsp;님</div>
          <div className="text-sm text-gray-600">
            {issuperhost ? '슈퍼호스트' : '훌륭한 호스트'}
          </div>
        </div>
      </div>
      <div className="w-full h-fit text-wrap px-4 py-8">{data.info}</div>
    </div>
  );
};

export default Info;
