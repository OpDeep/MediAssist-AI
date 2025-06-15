import React, { useState } from 'react';
import { FileText, Brain, MapPin, Pill } from 'lucide-react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ProcessingStatus from './components/ProcessingStatus';
import ResultsSection from './components/ResultsSection';
import MedicineInfo from './components/MedicineInfo';
import DoctorFinder from './components/DoctorFinder';
import Footer from './components/Footer';
import { PrescriptionData, ProcessingStage } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle');
  const [prescriptionData, setPrescriptionData] = useState<PrescriptionData | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setCurrentStep('processing');
    setProcessingStage('extracting');
    setError(null);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('prescription', file);

      // Simulate processing stages
      const stages: ProcessingStage[] = ['extracting', 'analyzing', 'diagnosing', 'researching'];
      
      // Show processing stages with realistic timing
      let stageIndex = 0;
      const stageInterval = setInterval(() => {
        if (stageIndex < stages.length) {
          setProcessingStage(stages[stageIndex]);
          stageIndex++;
        }
      }, 2000);

      // Start the analysis
      const response = await fetch('http://localhost:3001/api/analyze-prescription', {
        method: 'POST',
        body: formData,
      });

      // Clear the stage interval
      clearInterval(stageInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze prescription');
      }

      const result = await response.json();
      
      console.log('API Response:', result);

      // Ensure we have the required data structure
      const prescriptionData: PrescriptionData = {
        extractedText: result.extractedText || 'No text extracted',
        medicines: result.medicines || [],
        symptoms: result.symptoms || [],
        diagnosis: result.diagnosis || { primary: 'Unable to determine', secondary: [], confidence: 0.5 },
        doctorNotes: result.doctorNotes || 'No additional notes available',
        recommendations: result.recommendations || ['Consult your healthcare provider']
      };

      setPrescriptionData(prescriptionData);
      setProcessingStage('completed');
      
      // Small delay before showing results
      setTimeout(() => {
        setCurrentStep('results');
      }, 1000);

    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze prescription');
      setCurrentStep('upload');
      setProcessingStage('idle');
    }
  };

  const handleReset = () => {
    setCurrentStep('upload');
    setProcessingStage('idle');
    setPrescriptionData(null);
    setSelectedMedicine(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'upload' && (
          <div className="space-y-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                AI Prescription Assistant
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Upload your prescription image or PDF and let our AI analyze it to provide 
                comprehensive medicine information, potential diagnoses, and nearby healthcare providers.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">OCR Extraction</h3>
                <p className="text-sm text-gray-600">Advanced AI extracts text from images and PDFs</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <Brain className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">NLP Analysis</h3>
                <p className="text-sm text-gray-600">Identifies medicines, dosages, and symptoms</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <Pill className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Drug Information</h3>
                <p className="text-sm text-gray-600">Comprehensive medicine details and interactions</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <MapPin className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Doctor Finder</h3>
                <p className="text-sm text-gray-600">Locate nearby healthcare providers</p>
              </div>
            </div>
            
            <UploadSection onFileUpload={handleFileUpload} error={error} />
          </div>
        )}

        {currentStep === 'processing' && (
          <ProcessingStatus stage={processingStage} />
        )}

        {currentStep === 'results' && prescriptionData && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Analyze New Prescription
              </button>
            </div>
            
            <ResultsSection 
              data={prescriptionData} 
              onMedicineSelect={setSelectedMedicine}
            />
            
            {selectedMedicine && (
              <MedicineInfo 
                medicine={prescriptionData.medicines.find(m => m.name === selectedMedicine)!}
                onClose={() => setSelectedMedicine(null)}
              />
            )}
            
            <DoctorFinder />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;