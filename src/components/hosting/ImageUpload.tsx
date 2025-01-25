// components/hosting/ImageUpload.tsx
import { useState } from 'react';

type ImageUploadProps = {
  onImagesChange: (files: File[]) => void;
};

export default function ImageUpload({ onImagesChange }: ImageUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files == null) return;

    const imageFiles = Array.from(files);
    setSelectedFiles(imageFiles);
    onImagesChange(imageFiles);
  };

  const handleSetAsMain = (index: number) => {
    const newFiles = [...selectedFiles];
    const [selectedFile] = newFiles.splice(index, 1);
    if (selectedFile !== undefined) {
      newFiles.unshift(selectedFile);
      setSelectedFiles(newFiles);
      onImagesChange(newFiles);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onImagesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <div className="space-y-2">
          <p className="text-gray-600">클릭하여 이미지를 업로드하세요</p>
          {selectedFiles.length > 0 && (
            <p className="text-sm text-airbnb">
              {selectedFiles.length}개의 이미지가 선택됨
            </p>
          )}
        </div>
      </label>

      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {selectedFiles.map((file, index) => (
            <div key={file.name} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center space-x-2">
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        handleSetAsMain(index);
                      }}
                      className="px-3 py-1 bg-white text-gray-800 rounded text-sm hover:bg-gray-100"
                    >
                      대표 이미지로 설정
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveImage(index);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              </div>
              {index === 0 && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-airbnb text-white text-xs rounded">
                  대표 사진
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
