import React, { useCallback, useState } from 'react';
import { Upload, FileText, Image, AlertCircle } from 'lucide-react';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  error?: string | null;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onFileUpload, error }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (!file) return;

    if (!isValidFile(file)) {
      return;
    }

    onFileUpload(file);
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    if (!isValidFile(file)) {
      return;
    }

    onFileUpload(file);
  }, [onFileUpload]);

  const isValidFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center space-x-4">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Image className="w-8 h-8 text-green-600" />
            </div>
            <div className="p-3 bg-white rounded-full shadow-sm">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upload Your Prescription
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your prescription image or PDF here, or click to browse
            </p>
            
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose File
            </label>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Supported formats: JPEG, PNG, PDF</p>
            <p>Maximum file size: 10MB</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Tips for Best Results:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure the prescription is clearly visible and well-lit</li>
          <li>• Avoid shadows or glare on the document</li>
          <li>• Make sure all text is readable and not blurry</li>
          <li>• For PDFs, ensure they contain searchable text</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadSection;