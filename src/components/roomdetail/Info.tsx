import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';

import {filterItems} from '@/components/home/FilterBar/index'
import crownleft from '@/components/roomdetail/crownleft.svg'
import crownright from '@/components/roomdetail/crownright.svg'
import type { roomType } from '@/types/roomType';

interface InfoProps {
  data: roomType;
}

interface RoomInfo {
  label: string;
  svg: React.JSX.Element;
}
const roomIcons: RoomInfo[] = [
{
  label: '슈퍼호스트',
  svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 20px; width: 20px; fill: currentcolor;"><path d="M16 17a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM25.67.33a2 2 0 0 1 2 1.85v6.54a2 2 0 0 1-.97 1.7l-.14.08-9.67 4.84a2 2 0 0 1-1.61.07l-.17-.07-9.67-4.84a2 2 0 0 1-1.1-1.62V2.33a2 2 0 0 1 1.84-2h.15zm0 2H6.33v6.39L16 13.55l9.67-4.83z"></path></svg>,
},
{
  label: '여행 가방 보관 가능',
  svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 20px; width: 20px; fill: currentcolor;"><path d="M30 29v2H2v-2zM20 1a2 2 0 0 1 2 1.85V5h3a5 5 0 0 1 5 4.78V22a5 5 0 0 1-4.78 5H7a5 5 0 0 1-5-4.78V10a5 5 0 0 1 4.78-5H10V3a2 2 0 0 1 1.85-2H12zm5 6H7a3 3 0 0 0-3 2.82V22a3 3 0 0 0 2.82 3H25a3 3 0 0 0 3-2.82V10a3 3 0 0 0-3-3zm-8 2v9.5l3.3-3.3 1.4 1.42-4.64 4.65-.11.1a1.5 1.5 0 0 1-1.9 0l-.11-.1-4.65-4.65 1.42-1.41L15 18.5V9zm3-6h-8v2h8z"></path></svg>,
},
{
  label: '편의성이 뛰어난 체크인 절차',
  svg:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 20px; width: 20px; fill: currentcolor;"><path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z"></path></svg>,
}
]

const Info = ({data}: InfoProps) => {
  const matchingItem = filterItems.find((item) => item.label === data.type2);
  const superhostIcon = roomIcons.find((icon) => icon.label === '슈퍼호스트');
  const luggage = roomIcons.find((icon) => icon.label === '여행 가방 보관 가능');
  const convenient = roomIcons.find((icon) => icon.label === '편의성이 뛰어난 체크인 절차');
  return (
    <div className="flex flex-col items-start w-full h-fit mt-8 pr-8">
      <div className="w-full overflow-hidden text-xl break-words">
        <span className="font-semibold">
          {data.location.town}, {data.location.suburb},&nbsp;
        </span>
        {data.location.country}의&nbsp;{data.type1}
      </div>
      <div className="w-full overflow-hidden text-base break-words mt-1">
        최대 인원&nbsp;{data.maxOccupancy}명&nbsp;&middot;&nbsp;침실&nbsp;{data.bedroom}개&nbsp;&middot;&nbsp;침대&nbsp;{data.bed}개&nbsp;&middot;&nbsp;욕실&nbsp;{data.bathroom}개
      </div>
      <div className="flex justify-between border border-gray-300 rounded-md p-6 w-full my-8">
        <div className="flex justify-center align-center gap-1 flex-1 border-r border-r-gray-300">
          <img src={crownleft} />
          <div className="text-center">게스트<br></br>선호</div>
          <img src={crownright} />
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
          <span className="font-semibold">
            {data.reviewcount}
          </span>
          개<br></br>
          <div className="text-xs underline">후기</div>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 w-full h-[150px] my-4 border-b border-b-gray-300">
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          {matchingItem !== undefined ? (<>
          <img 
            src={matchingItem.imageUrl} 
            alt={matchingItem.label} 
            className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity"
          />
          <div className="opacity-60 text-sm">{matchingItem.label}</div></>
          ) : (<>
          <PhotoSizeSelectActualIcon />
          <div>정보 없음</div></>)}
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          {data.superhost && superhostIcon !== undefined ? (<>
            <div className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity">
              {superhostIcon.svg}
            </div>
            <div className="opacity-60 text-sm">{superhostIcon.label}</div>
          </>) : null}
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          {data.superhost && luggage !== undefined ? (<>
            <div className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity">
              {luggage.svg}
            </div>
            <div className="opacity-60 text-sm">{luggage.label}</div>
          </>) : null}
        </div>
        <div className="col-span-1 row-span-1 flex gap-2 items-center px-4">
          {data.superhost && convenient !== undefined ? (<>
            <div className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity">
              {convenient.svg}
            </div>
            <div className="opacity-60 text-sm">{convenient.label}</div>
          </>) : null}
        </div>
      </div>
      <div className="flex w-full h-[100px] my-4 border-b border-b-gray-300">

      </div>
      <div className="">

      </div>
    </div>
  )
}

export default Info;