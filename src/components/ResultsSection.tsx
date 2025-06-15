import React from 'react';
import { FileText, Pill, Activity, Brain, User, AlertTriangle } from 'lucide-react';
import { PrescriptionData } from '../types';

interface ResultsSectionProps {
  data: PrescriptionData;
  onMedicineSelect: (medicine: string) => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ data, onMedicineSelect }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Extracted Text */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Extracted Text</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
            {data.extractedText}
          </div>
        </div>
      </div>

      {/* Main Analysis */}
      <div className="lg:col-span-2 space-y-6">
        {/* Diagnosis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Diagnosis</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Primary Diagnosis</h4>
                <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {Math.round(data.diagnosis.confidence * 100)}% confidence
                </span>
              </div>
              <p className="text-lg text-purple-700 font-medium">{data.diagnosis.primary}</p>
            </div>
            
            {data.diagnosis.secondary.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Secondary Conditions</h4>
                <div className="flex flex-wrap gap-2">
                  {data.diagnosis.secondary.map((condition, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Medicines */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Pill className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Prescribed Medicines</h3>
          </div>
          
          <div className="space-y-4">
            {data.medicines.map((medicine, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors cursor-pointer"
                onClick={() => onMedicineSelect(medicine.name)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">{medicine.name}</h4>
                    <p className="text-green-600 font-medium">{medicine.dosage} - {medicine.frequency}</p>
                    <p className="text-gray-600 mt-1">{medicine.purpose}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details →
                  </button>
                </div>
                
                {medicine.warnings.length > 0 && (
                  <div className="mt-3 flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700">
                      {medicine.warnings[0]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms & Doctor Notes */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Symptoms</h3>
            </div>
            <div className="space-y-2">
              {data.symptoms.map((symptom, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-700">{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">Doctor's Notes</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{data.doctorNotes}</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-700">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;