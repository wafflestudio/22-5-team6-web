import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

import accuracy from '@/components/roomdetail/accuracy.svg';
import checkin from '@/components/roomdetail/checkin.svg';
import clean from '@/components/roomdetail/clean.svg';
import type { reviewType } from '@/types/reviewType';

const ReviewModal = ({ onClose }: { onClose: () => void }) => {
  const reviews: reviewType[] = [
    {
      name: '연정',
      joined: '에어비앤비 가입 기간 4개월',
      date: '2024년 11월',
      content:
        '고택체험으로 선택한 숙소였는데 아이들이랑 편안히 쉬다왔어요. 여행지가 안동이라 거리감이 있어 오래 머무르지못해 아쉬움. 깔끔하고 따뜻해서 모두를 만족한 숙소였어요.',
      hostReply:
        '토향고택을 찾아주시고 좋은 후기를 남겨주셔서 정말 감사드립니다.^^ 늘 건강하시고 행복하세요~~',
    },
    {
      name: 'Seung-Ho',
      joined: '에어비앤비 가입 기간 3년',
      date: '2024년 8월',
      content:
        '방문할 때마다 한결같은 편안함을 제공하는 한적하고 아름다운 자연환경 속의 숙소입니다.',
      hostReply:
        '토향고택을 찾아주시고 좋은 후기를 남겨주셔서 정말 감사드립니다.^^ 늘 건강하시고 행복하세요~~',
    },
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 배경 스크롤 비활성화
    return () => {
      document.body.style.overflow = 'auto'; // 모달 닫힐 때 스크롤 복원
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      {/* 배경 클릭 시 닫힘 */}
      <div className="inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* 모달 내용 */}
      <div className="flex flex-col bg-white rounded-lg shadow-lg w-[70%] h-[80%] p-6 z-60">
        {/* 헤더 */}
        <CloseIcon
          className="cursor-pointer rounded-full hover:bg-gray-100"
          onClick={onClose}
          style={{ fontSize: 15, marginBottom: 8 }}
        />
        <div className="flex w-full h-full">
          {/* 왼쪽 섹션 */}
          <div className="flex-[35%] pr-8 w-full h-full overflow-y-auto">
            {/* 상단 평점 */}
            <div className="flex items-center justify-center">
              <img
                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png"
                alt="왼쪽 월계수"
                className="w-16 h-24"
              />
              <h3 className="text-4xl font-bold text-center pb-6">4.92</h3>
              <img
                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png"
                alt="오른쪽 월계수"
                className="w-16 h-24"
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">게스트 선호</p>
              <p className="text-xs text-center text-gray-700">
                평점, 후기, 신뢰도 기준
                <br />
                에어비앤비에서 가장 사랑받는 숙소
              </p>
            </div>

            {/* 전체 평점 */}
            <div className="mt-6">
              <h4 className="text-sm font-medium">전체 평점</h4>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mt-1">
                  <span className="text-xs font-bold w-4">{rating}</span>
                  <div className="flex-1 h-1 bg-gray-200 mx-2">
                    <div
                      className="h-1 bg-black rounded-lg"
                      style={{ width: `${rating * 20}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* 세부 평점 */}
            <div className="flex flex-col gap-4 mt-6">
              <div className="border-b pb-2 flex items-center">
                <img src={clean} alt="청결도" className="w-5 h-5 mr-2" />
                <span className="text-sm">청결도</span>
                <span className="ml-auto text-xs font-bold">4.9</span>
              </div>
              <div className="border-b pb-2 flex items-center">
                <img src={accuracy} alt="정확도" className="w-5 h-5 mr-2" />
                <span className="text-sm">정확도</span>
                <span className="ml-auto text-xs font-bold">5.0</span>
              </div>
              <div className="border-b pb-2 flex items-center">
                <img src={checkin} alt="체크인" className="w-5 h-5 mr-2" />
                <span className="text-sm">체크인</span>
                <span className="ml-auto text-xs font-bold">5.0</span>
              </div>
              <div className="border-b pb-2 flex items-center">
                <ChatBubbleOutlineIcon className="w-5 h-5 mr-2" />
                <span className="text-sm">의사소통</span>
                <span className="ml-auto text-xs font-bold">5.0</span>
              </div>
            </div>
          </div>

          {/* 오른쪽 후기 목록 */}
          <div className="flex-[65%] w-full h-full overflow-y-auto">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="rounded-md mx-2 p-5 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 text-center leading-8 text-sm">
                    {review.name !== '' && review.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h5 className="font-medium">{review.name}</h5>
                    <p className="text-xs text-gray-500">{review.joined}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">{review.content}</p>
                {review.hostReply !== '' && (
                  <div className="mt-2 ml-4 border-l-2 border-gray-300 pl-2 text-xs text-gray-600">
                    {review.hostReply}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
