import type { roomType } from '@/types/roomType';

interface InfoProps {
  data: roomType;
}
const Info = ({data}: InfoProps) => {
  return (
    <div className="flex flex-col items-center w-full h-fit">
      <div className="w-full overflow-hidden text-xl break-words">
        <span className="font-semibold">
          {data.location.town}, {data.location.suburb},&nbsp;
        </span>
        {data.location.country}의&nbsp;{data.type1}
      </div>
      <div className="w-full overflow-hidden text-base break-words">
        최대 인원&nbsp;{data.maxOccupancy}명&nbsp;&middot;&nbsp;침실&nbsp;{data.bedroom}개&nbsp;&middot;&nbsp;침대&nbsp;{data.bed}개&nbsp;&middot;&nbsp;욕실&nbsp;{data.bathroom}개
      </div>
    </div>
  )
}

export default Info;