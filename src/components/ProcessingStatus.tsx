import React from 'react';
import { Brain, FileText, Search, Microscope, CheckCircle } from 'lucide-react';
import { ProcessingStage } from '../types';

interface ProcessingStatusProps {
  stage: ProcessingStage;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ stage }) => {
  const stages = [
    {
      id: 'extracting',
      title: 'Extracting Text',
      description: 'Using AI-powered OCR to extract text from your prescription',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'analyzing',
      title: 'Analyzing Content',
      description: 'Identifying medicines, dosages, and medical information',
      icon: Microscope,
      color: 'purple'
    },
    {
      id: 'diagnosing',
      title: 'AI Diagnosis',
      description: 'Using machine learning to predict potential conditions',
      icon: Brain,
      color: 'green'
    },
    {
      id: 'researching',
      title: 'Research & Recommendations',
      description: 'Gathering comprehensive medicine information and recommendations',
      icon: Search,
      color: 'orange'
    }
  ];

  const getStageIndex = (currentStage: ProcessingStage) => {
    if (currentStage === 'completed') return stages.length;
    return stages.findIndex(s => s.id === currentStage);
  };

  const currentIndex = getStageIndex(stage);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Analyzing Your Prescription
        </h2>
        <p className="text-lg text-gray-600">
          Our AI is processing your prescription through multiple stages
        </p>
      </div>

      <div className="space-y-6">
        {stages.map((stageInfo, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isPending = index > currentIndex;

          const colorClasses = {
            blue: {
              bg: isActive ? 'bg-blue-100' : isCompleted ? 'bg-green-50' : 'bg-gray-50',
              border: isActive ? 'border-blue-200' : isCompleted ? 'border-green-200' : 'border-gray-200',
              icon: isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400',
              text: isActive ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-500'
            },
            purple: {
              bg: isActive ? 'bg-purple-100' : isCompleted ? 'bg-green-50' : 'bg-gray-50',
              border: isActive ? 'border-purple-200' : isCompleted ? 'border-green-200' : 'border-gray-200',
              icon: isActive ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-400',
              text: isActive ? 'text-purple-900' : isCompleted ? 'text-green-900' : 'text-gray-500'
            },
            green: {
              bg: isActive ? 'bg-green-100' : isCompleted ? 'bg-green-50' : 'bg-gray-50',
              border: isActive ? 'border-green-200' : isCompleted ? 'border-green-200' : 'border-gray-200',
              icon: isActive ? 'text-green-600' : isCompleted ? 'text-green-600' : 'text-gray-400',
              text: isActive ? 'text-green-900' : isCompleted ? 'text-green-900' : 'text-gray-500'
            },
            orange: {
              bg: isActive ? 'bg-orange-100' : isCompleted ? 'bg-green-50' : 'bg-gray-50',
              border: isActive ? 'border-orange-200' : isCompleted ? 'border-green-200' : 'border-gray-200',
              icon: isActive ? 'text-orange-600' : isCompleted ? 'text-green-600' : 'text-gray-400',
              text: isActive ? 'text-orange-900' : isCompleted ? 'text-green-900' : 'text-gray-500'
            }
          };

          const colors = colorClasses[stageInfo.color as keyof typeof colorClasses];

          return (
            <div
              key={stageInfo.id}
              className={`p-6 rounded-xl border-2 transition-all duration-500 ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className={`w-8 h-8 ${colors.icon}`} />
                  ) : (
                    <stageInfo.icon className={`w-8 h-8 ${colors.icon} ${isActive ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold ${colors.text}`}>
                    {stageInfo.title}
                    {isActive && <span className="ml-2 text-sm">Processing...</span>}
                    {isCompleted && <span className="ml-2 text-sm">✓ Complete</span>}
                  </h3>
                  <p className={`mt-1 ${colors.text} opacity-80`}>
                    {stageInfo.description}
                  </p>
                </div>
                
                {isActive && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin opacity-50"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {stage === 'completed' && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-100 text-green-800 rounded-full border border-green-200">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Analysis Complete!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;