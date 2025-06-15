import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Star, Clock, Navigation, User, Award, Building } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  distance: number;
  address: string;
  phone: string;
  availability: string;
  acceptsInsurance: string[];
  languages: string[];
  yearsExperience: number;
  education: string;
  certifications: string[];
  hospitalAffiliation: string;
}

const DoctorFinder: React.FC = () => {
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (location) params.append('location', location);
      if (specialty) params.append('specialty', specialty);
      
      const response = await fetch(`http://localhost:3001/api/doctors/nearby?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      
      const data = await response.json();
      setDoctors(data.doctors || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load doctors');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearch = () => {
    fetchDoctors();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="w-6 h-6 text-red-600" />
        <h2 className="text-2xl font-bold text-gray-900">Find Nearby Doctors</h2>
        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Maharashtra</span>
      </div>

      {/* Search Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city (e.g., Mumbai, Pune)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialty
          </label>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Specialties</option>
            <option value="internal">Internal Medicine</option>
            <option value="endocrinology">Endocrinology</option>
            <option value="cardiology">Cardiology</option>
            <option value="family">Family Medicine</option>
            <option value="gastroenterology">Gastroenterology</option>
            <option value="psychiatry">Psychiatry</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="dermatology">Dermatology</option>
          </select>
        </div>
        <div className="flex items-end">
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search Doctors'}
          </button>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg h-64 mb-6 flex items-center justify-center border border-blue-200">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <p className="text-blue-800 font-medium">Maharashtra Healthcare Network</p>
          <p className="text-sm text-blue-600 mt-1">Showing qualified doctors across Maharashtra</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Doctor List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Healthcare Providers in Maharashtra
          </h3>
          <span className="text-sm text-gray-600">
            {doctors.length} doctors found
          </span>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-8">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No doctors found matching your criteria</p>
          </div>
        ) : (
          doctors.map((doctor) => (
            <div key={doctor.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors bg-gradient-to-r from-white to-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-xl font-semibold text-gray-900">{doctor.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                      <span className="text-sm text-gray-500">({doctor.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  <p className="text-blue-600 font-medium text-lg mb-2">{doctor.specialty}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Navigation className="w-4 h-4" />
                        <span>{doctor.distance} km away</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{doctor.availability}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{doctor.phone}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Award className="w-4 h-4" />
                        <span>{doctor.yearsExperience} years experience</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Building className="w-4 h-4" />
                        <span>{doctor.hospitalAffiliation}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{doctor.address}</p>
                  
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Education:</p>
                    <p className="text-sm text-gray-600">{doctor.education}</p>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.map((lang, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Certifications:</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.certifications.map((cert, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Insurance Accepted:</p>
                    <div className="flex flex-wrap gap-1">
                      {doctor.acceptsInsurance.map((insurance, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {insurance}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-6">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Book Appointment
                  </button>
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    View Profile
                  </button>
                  <button className="px-6 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorFinder;