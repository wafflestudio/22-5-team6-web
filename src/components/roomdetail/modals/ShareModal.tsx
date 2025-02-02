import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import LinkIcon from '@mui/icons-material/Link';
import MessageIcon from '@mui/icons-material/Message';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import SendIcon from '@mui/icons-material/Send';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useEffect, useState } from 'react';

interface ShareModalProps {
  onClose: () => void; // 닫기 핸들러
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    const currentLink = window.location.href;
    void navigator.clipboard.writeText(currentLink).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // 3초 후 알림 숨기기
    });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 배경 스크롤 비활성화
    return () => {
      document.body.style.overflow = 'auto'; // 모달 닫힐 때 스크롤 복원
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      {/* 배경 클릭 시 닫힘 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* 모달 내용 */}
      <div className="relative bg-white rounded-lg shadow-lg w-[50%] h-fit p-6 z-60 overflow-y-auto max-h-[80%]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-lg font-semibold">숙소 공유하기</h2>
          {/* 닫기 버튼 */}
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          {/* Image Section */}
          <div className="flex items-center space-x-4">
            <PhotoSizeSelectActualIcon className="text-gray-700 w-16 h-16" />
            <div>
              <h3 className="text-sm font-medium">게스트용 별채</h3>
              <p className="text-sm text-gray-500">
                Bonghwa-eup, Bonghwa-gun · ★4.92 · 침실 1개 · 침대 1개 · 욕실
                1개
              </p>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <button
              className="flex justify-start gap-4 items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
              onClick={handleCopyLink}
            >
              <LinkIcon className="text-gray-700 w-6 h-6" />
              <span className="text-sm">링크 복사</span>
            </button>
            {copied && (
              <div className="fixed top-[80px] mt-2 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                링크가 복사되었습니다!
              </div>
            )}
            <button className="flex justify-start gap-4 items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              <EmailIcon className="text-gray-700 w-6 h-6" />
              <span className="text-sm">이메일</span>
            </button>
            <button className="flex justify-start gap-4 items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              <MessageIcon className="text-gray-700 w-6 h-6" />
              <span className="text-sm">메시지</span>
            </button>
            <button className="flex justify-start gap-4 items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              <WhatsAppIcon className="text-gray-700 w-6 h-6" />
              <span className="text-sm">왓츠앱</span>
            </button>
            <button className="flex justify-start gap-4 items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              <SendIcon className="text-gray-700 w-6 h-6" />
              <span className="text-sm">메신저</span>
            </button>
            <button className="flex justify-start gap-4 items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              <FacebookIcon className="text-gray-700 w-6 h-6" />
              <span className="text-sm">페이스북</span>
            </button>
            <button className="flex justify-start gap-4 items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              <TwitterIcon className="text-gray-700 w-6 h-6" />
              <span className="text-sm">트위터</span>
            </button>
            <button className="flex justify-start gap-4 items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              <InsertPageBreakIcon className="text-gray-700 w-6 h-6" />
              <span className="text-sm">삽입</span>
            </button>
            <button className="flex justify-start gap-4 items-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              <MoreHorizIcon className="text-gray-700 w-6 h-6" />
              <span className="text-sm">옵션 더 보기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
