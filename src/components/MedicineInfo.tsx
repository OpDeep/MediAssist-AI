import React from 'react';
import { X, Pill, AlertTriangle, Info, Clock } from 'lucide-react';
import { Medicine } from '../types';

interface MedicineInfoProps {
  medicine: Medicine;
  onClose: () => void;
}

const MedicineInfo: React.FC<MedicineInfoProps> = ({ medicine, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Pill className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">{medicine.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Dosage Information */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Dosage Instructions</h3>
            </div>
            <div className="space-y-2">
              <p className="text-green-800"><strong>Dosage:</strong> {medicine.dosage}</p>
              <p className="text-green-800"><strong>Frequency:</strong> {medicine.frequency}</p>
              <p className="text-green-800"><strong>Purpose:</strong> {medicine.purpose}</p>
            </div>
          </div>

          {/* Side Effects */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Common Side Effects</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {medicine.sideEffects.map((effect, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-md">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-800 text-sm">{effect}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-gray-900">Important Warnings</h3>
            </div>
            <div className="space-y-2">
              {medicine.warnings.map((warning, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-amber-50 rounded-md border border-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-amber-800 text-sm">{warning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Additional Information</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Storage:</strong> Store at room temperature, away from moisture and heat.</p>
              <p><strong>Interactions:</strong> Consult your doctor about drug interactions.</p>
              <p><strong>Emergency:</strong> Contact your healthcare provider if you experience severe side effects.</p>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="text-red-800 text-sm">
              <strong>Disclaimer:</strong> This information is for educational purposes only. 
              Always follow your doctor's instructions and consult healthcare professionals 
              for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineInfo;