export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  sideEffects: string[];
  warnings: string[];
}

export interface Diagnosis {
  primary: string;
  secondary: string[];
  confidence: number;
}

export interface PrescriptionData {
  extractedText: string;
  medicines: Medicine[];
  symptoms: string[];
  diagnosis: Diagnosis;
  doctorNotes: string;
  recommendations: string[];
}

export type ProcessingStage = 'idle' | 'extracting' | 'analyzing' | 'diagnosing' | 'researching' | 'completed';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  distance: string;
  address: string;
  phone: string;
  availability: string;
}