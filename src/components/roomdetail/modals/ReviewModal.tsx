import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import accuracy from '@/assets/icons/reviews/accuracy.svg';
import clean from '@/assets/icons/reviews/clean.svg';
import { CheckinIcon } from '@/components/common/constants/icons';
import type { roomType } from '@/types/roomType';

import { useReview } from '../contexts/ReviewContext';

interface ReviewProps {
  data: roomType;
  onClose: () => void;
}

const ReviewModal = ({ onClose, data }: ReviewProps) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const options = ['최신순', '오래된순', '높은 평점순', '낮은 평점순'];
  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // 선택한 값을 버튼에 표시
    setIsModalOpen(false); // 모달 닫기
  };

  const { isLoading, error, initReviews, reviewData } = useReview();

  useEffect(() => {
    void initReviews(data, selectedOption, page);
  }, [initReviews, data, selectedOption, page]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      {/* 배경 클릭 시 닫힘 */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* 모달 내용 */}
      <div className="relative flex flex-col bg-white rounded-lg shadow-lg w-[70%] h-[80%] p-6 z-60">
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
              <h3 className="text-4xl font-bold text-center pb-6">
                {data.averageRating}
              </h3>
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
                <img src={CheckinIcon} alt="체크인" className="w-5 h-5 mr-2" />
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
          {reviewData === null ? (
            <div className="">리뷰 데이터 없음</div>
          ) : (
            <>
              <div className="flex-[65%] w-full h-full overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div className="text-xl ml-8 w-fit h-fit">
                    후기{' '}
                    <span className="font-bold w-fit h-fit">
                      {reviewData.totalElements}
                    </span>
                    개
                  </div>
                  <button
                    className="border border-gray-300 rounded-full py-2 px-3 w-fit h-fit text-sm text-center"
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                    }}
                  >
                    <KeyboardArrowDownIcon className="w-5 h-5 mr-2 text-center" />
                    {selectedOption}
                  </button>
                </div>
                {isModalOpen && (
                  <div className="absolute right-5 top-20 mt-2 w-40 bg-white border rounded-xl shadow-md">
                    {options.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          handleOptionClick(option);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                {reviewData.content.map((review, index) => (
                  <div
                    key={index}
                    className="rounded-md mx-2 p-5 cursor-pointer hover:bg-gray-100"
                  >
                    <div
                      className="flex items-center"
                      onClick={() => void navigate(`/profile/${review.userId}`)}
                    >
                      {review.profileImage !== '' ? (
                        <img
                          src={review.profileImage}
                          className="w-8 h-8 rounded-full bg-gray-300 text-center leading-8 text-sm"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 text-center leading-8 text-sm">
                          {review.nickname.charAt(0)}
                        </div>
                      )}

                      <div className="ml-3">
                        <h5 className="font-medium">
                          {review.nickname}&nbsp;&middot;&nbsp;{review.rating}
                        </h5>
                        <p className="text-xs text-gray-500">
                          숙박 일시&nbsp;{review.startDate}~{review.endDate}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{review.content}</p>
                  </div>
                ))}
                {reviewData.totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setPage(page - 1);
                      }}
                      disabled={page === 0}
                      className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      이전
                    </button>

                    {Array.from({ length: reviewData.totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setPage(i);
                        }}
                        className={`rounded-lg px-4 py-2 ${
                          page === i
                            ? 'bg-black text-white'
                            : 'border hover:bg-gray-100'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setPage(page + 1);
                      }}
                      disabled={page === reviewData.totalPages - 1}
                      className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      다음
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {error !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50">
          에러: {error}
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50">
          서버에서 데이터를 가져오는 중...
        </div>
      )}
    </div>
  );
};

export default ReviewModal;
