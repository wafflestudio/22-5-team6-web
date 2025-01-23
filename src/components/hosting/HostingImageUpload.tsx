import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '@/components/home/Topbar/Header';

type LocationState = {
  roomId: number;
  imageUploadUrls: string[];
  totalImages: number;
};

export default function HostingImageUpload() {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUploadUrls, totalImages } = location.state as LocationState;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const newFiles = Array.from(event.target.files);
      const updatedFiles = [...selectedFiles, ...newFiles];

      if (updatedFiles.length !== totalImages) {
        setError(`정확히 ${totalImages}장의 이미지를 선택해주세요.`);
        return;
      }

      const invalidFiles = newFiles.filter(
        (file) => !file.type.startsWith('image/'),
      );
      if (invalidFiles.length > 0) {
        setError('이미지 파일만 업로드 가능합니다.');
        return;
      }

      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

      setError(null);
      setSelectedFiles(updatedFiles);
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setUploadStatus('이미지 업로드 중...');

      const uploadPromises = selectedFiles.map(async (file, index) => {
        if (imageUploadUrls[index] !== undefined) {
          await axios.put(imageUploadUrls[index], file, {
            headers: {
              'Content-Type': file.type,
            },
          });
        } else {
          throw new Error('이미지 업로드 URL이 존재하지 않습니다.');
        }
      });

      await Promise.all(uploadPromises);
      setUploadStatus('모든 이미지 업로드 성공!');

      alert('숙소 이미지가 성공적으로 업로드되었습니다!');
      void navigate('/');
    } catch (err) {
      console.error('업로드 실패:', err);
      setError('이미지 업로드 실패. 다시 시도해주세요.');
      setUploadStatus('');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="h-20 px-10">
        <Header />
      </div>

      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-medium mb-6">숙소 이미지 업로드</h2>

          {/* 안내 메시지 */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              • 정확히 {totalImages}장의 이미지를 선택해주세요.
            </p>
            <p className="text-gray-700">
              • 첫 번째 이미지가 메인 이미지로 사용됩니다.
            </p>
          </div>

          {/* 파일 선택 */}
          <div className="mb-6">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-airbnb file:text-white
                hover:file:bg-airbnb-hover
              "
            />
          </div>

          {/* 이미지 미리보기 */}
          {previewUrls.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">선택된 이미지</h3>
              <div className="flex gap-4 flex-wrap">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Room Image ${index + 1}`}
                      className="w-48 h-auto rounded-lg"
                    />
                    {index === 0 ? (
                      <span className="absolute top-2 left-2 bg-airbnb text-white px-2 py-1 text-xs rounded">
                        대표 사진
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const newFiles = [...selectedFiles];
                          const newPreviews = [...previewUrls];

                          const [selectedFile] = newFiles.splice(index, 1);
                          const [selectedPreview] = newPreviews.splice(
                            index,
                            1,
                          );

                          if (selectedFile !== undefined) {
                            newFiles.unshift(selectedFile);
                          }

                          if (selectedPreview !== undefined) {
                            newPreviews.unshift(selectedPreview);
                          }

                          setSelectedFiles(newFiles);
                          setPreviewUrls(newPreviews);
                        }}
                        className="absolute top-2 right-2 bg-white text-airbnb px-2 py-1 text-xs rounded hover:bg-gray-50"
                      >
                        대표 사진으로 설정
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 상태 메시지 */}
          {uploadStatus !== '' && (
            <div className="mb-4 p-4 bg-blue-50 text-blue-600 rounded-lg">
              {uploadStatus}
            </div>
          )}

          {/* 에러 메시지 */}
          {error != null && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* 업로드 버튼 */}
          <button
            type="button"
            onClick={() => void handleUpload()}
            disabled={isLoading || selectedFiles.length !== totalImages}
            className={`w-full ${
              isLoading || selectedFiles.length !== totalImages
                ? 'bg-gray-400'
                : 'bg-airbnb hover:bg-airbnb-hover'
            } text-white rounded-lg py-3 font-medium transition-colors`}
          >
            {isLoading ? '업로드 중...' : '숙소 등록하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
