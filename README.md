# AI Prescription Assistant

A comprehensive full-stack web application that leverages artificial intelligence to analyze prescription images and PDFs, providing users with detailed medicine information, potential diagnoses, and nearby healthcare provider recommendations.

## 🚀 Features

### Core AI Capabilities
- **Advanced OCR Text Extraction**: AI-powered text extraction from prescription images and PDFs using Tesseract.js
- **Free AI API Integration**: Uses Hugging Face and Groq free APIs for enhanced prescription analysis
- **Enhanced Medicine Database**: Comprehensive Indian medicine database including popular brands like Crocin, Dolo, Combiflam
- **Smart Diagnosis Prediction**: AI-powered diagnosis based on identified medicines and symptoms
- **Maharashtra Doctors Database**: Qualified doctors from Mumbai, Pune, Thane, and other Maharashtra cities
- **Real-time Processing**: Live status updates during AI analysis pipeline

### User Interface
- **Drag & Drop Upload**: Intuitive file upload with support for JPEG, PNG, and PDF files
- **Real-time Processing**: Live status updates during AI analysis pipeline
- **Interactive Results**: Detailed prescription analysis with expandable medicine information
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Beautiful, production-ready interface with smooth animations

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **Multer** for file upload handling
- **Tesseract.js** for OCR text extraction
- **Sharp** for image processing
- **pdf2pic** for PDF to image conversion

### AI Services
- **Hugging Face API** (Free tier) - Primary AI analysis
- **Groq API** (Free tier) - Fallback AI analysis
- **Enhanced Local Analysis** - Fallback when APIs are unavailable
- **Indian Medicine Database** - Comprehensive local medicine information

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Free API keys from Hugging Face and/or Groq (optional but recommended)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-prescription-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (Optional but recommended)**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your free API keys:
   - Get Hugging Face API key: https://huggingface.co/settings/tokens
   - Get Groq API key: https://console.groq.com/keys

4. **Create uploads directory**
   ```bash
   mkdir uploads
   ```

5. **Start the application**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev
   
   # Or start them separately:
   # Frontend (port 5173)
   npm run dev:frontend
   
   # Backend (port 3001)
   npm run dev:backend
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🤖 AI Integration

### Free AI APIs Used

1. **Hugging Face Inference API** (Primary)
   - Free tier available with rate limits
   - Uses models like DialoGPT for text analysis
   - Excellent for medicine identification and analysis

2. **Groq API** (Fallback)
   - Fast inference with Llama models
   - Free tier with generous limits
   - High-quality medical text analysis

3. **Enhanced Local Analysis** (Final Fallback)
   - Comprehensive Indian medicine database
   - Pattern matching for medicine identification
   - Works offline without API dependencies

### Getting Free API Keys

#### Hugging Face (Recommended)
1. Visit https://huggingface.co/join
2. Create a free account
3. Go to https://huggingface.co/settings/tokens
4. Create a new token with "Read" permissions
5. Add to your `.env` file as `HUGGINGFACE_API_KEY`

#### Groq (Alternative)
1. Visit https://console.groq.com/
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Add to your `.env` file as `GROQ_API_KEY`

## 🏥 Maharashtra Healthcare Network

The application includes a comprehensive database of qualified doctors from Maharashtra:

- **Mumbai**: Kokilaben Hospital, Nanavati Hospital, Lilavati Hospital, Fortis Mulund
- **Pune**: Ruby Hall Clinic, Deenanath Mangeshkar Hospital, Sahyadri Hospital
- **Thane**: Jupiter Hospital
- **Coverage**: 8+ specialties including Internal Medicine, Cardiology, Endocrinology

Each doctor profile includes:
- Education and certifications
- Hospital affiliations
- Insurance acceptance
- Languages spoken
- Years of experience
- Contact information

## 💊 Enhanced Medicine Database

### Indian Medicine Brands Supported
- **Crocin** (Paracetamol) - Pain and fever relief
- **Dolo** (Paracetamol) - Fever reduction
- **Combiflam** (Ibuprofen + Paracetamol) - Pain and inflammation
- **Pantoprazole** - Acid reflux treatment
- **Metformin** - Diabetes management
- **Azithromycin** - Antibiotic
- **Amlodipine** - Blood pressure control
- **Atorvastatin** - Cholesterol management

### Medicine Information Includes
- Generic and brand names
- Dosage and frequency
- Purpose and category
- Side effects and warnings
- Drug interactions
- Contraindications
- Monitoring requirements
- Cost information (in INR)

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```

### Prescription Analysis (Enhanced with AI)
```
POST /api/analyze-prescription
Content-Type: multipart/form-data
Body: prescription file (image/PDF)
```

### Medicine Information
```
GET /api/medicine/:name
```

### Maharashtra Doctors
```
GET /api/doctors/nearby?location=&specialty=&radius=
```

## 🎯 Usage Guide

1. **Upload Prescription**
   - Drag and drop a prescription image or PDF
   - Supported formats: JPEG, PNG, PDF (max 10MB)
   - Works best with clear, well-lit images

2. **AI Processing Stages**
   - **OCR Extraction**: Text extraction from image/PDF
   - **AI Analysis**: Free API analysis of prescription content
   - **Medicine Identification**: Indian medicine database matching
   - **Diagnosis & Recommendations**: AI-powered health insights

3. **Review Results**
   - View extracted prescription text
   - Explore identified medicines with detailed information
   - Review AI-generated diagnosis and confidence scores
   - Read personalized health recommendations

4. **Find Healthcare Providers**
   - Search Maharashtra doctors by specialty and location
   - View comprehensive doctor profiles
   - Access contact information and availability

## 🚦 Production Deployment

For production deployment:

1. **Set up environment variables**
   - Add your AI API keys
   - Configure production database if needed
   - Set up proper CORS origins

2. **Build the application**
   ```bash
   npm run build
   ```

3. **Deploy backend and frontend**
   - Backend: Deploy to services like Railway, Render, or Heroku
   - Frontend: Deploy to Vercel, Netlify, or similar

4. **Configure AI APIs**
   - Monitor API usage and rate limits
   - Set up error handling and fallbacks
   - Consider upgrading to paid tiers for production

## 🔒 Security & Compliance

- File upload validation and size limits
- CORS configuration for secure requests
- Input sanitization and error handling
- API key security (environment variables)
- HIPAA compliance considerations for production
- Secure file cleanup after processing

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Important Notes

- **Free AI APIs**: The application uses free AI APIs with rate limits
- **Fallback System**: Multiple fallback mechanisms ensure reliability
- **Indian Focus**: Optimized for Indian medicines and Maharashtra doctors
- **Educational Purpose**: Not intended for actual medical diagnosis
- **Privacy**: Files are automatically deleted after processing
- **Offline Capability**: Works without AI APIs using local analysis

## 🚀 Future Enhancements

- **Real-time AI Streaming**: Stream AI responses for better UX
- **Voice Input**: Add voice-to-text prescription input
- **Multi-language Support**: Support for regional Indian languages
- **Telemedicine Integration**: Connect with doctors for consultations
- **Prescription History**: User accounts and prescription tracking
- **Mobile App**: React Native mobile application
- **Advanced Analytics**: Usage analytics and insights dashboard

## 📞 Support

For technical support or questions about the AI Prescription Assistant application, please refer to the documentation or contact the development team.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Disclaimer**: This application is for educational and demonstration purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical decisions. The AI analysis is supplementary and should not be used as the sole basis for medical decisions.