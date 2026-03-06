import { useState } from 'react';
import { Upload, Check, X } from 'lucide-react';
import { uploadImages } from '../../lib/storage';

interface UploadedImage {
  name: string;
  url: string;
}

export function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    setUploading(true);
    setError(null);

    try {
      const urls = await uploadImages(Array.from(files));
      const newImages = Array.from(files).map((file, idx) => ({
        name: file.name,
        url: urls[idx],
      }));
      setUploadedImages([...uploadedImages, ...newImages]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Images</h2>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors mb-6">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-gray-700 font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                {uploading ? 'Uploading...' : 'Select multiple images'}
              </p>
            </div>
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
            <X className="w-5 h-5" />
            {error}
          </div>
        )}

        {uploadedImages.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Uploaded Images:</h3>
            {uploadedImages.map((img, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded border border-gray-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{img.name}</p>
                    <p className="text-xs text-gray-500 break-all mt-1">{img.url}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(img.url)}
                    className="flex-shrink-0 px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {uploadedImages.length > 0 && !uploading && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded flex items-center gap-2 text-green-700">
            <Check className="w-5 h-5" />
            All images uploaded successfully!
          </div>
        )}
      </div>
    </div>
  );
}
