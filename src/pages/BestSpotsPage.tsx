import React, { useState } from 'react';
import { ArrowLeft, Star, User, MapPin, Bot, Target, Mountain, Clock } from 'lucide-react';
import { RunningSpot } from '../types/RunningSpot';
import { citySpots, cities } from '../data/citySpots';
import SpotCard from "../components/spots/SpotCard";
import { useNavigate } from 'react-router-dom';

const BestSpotsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('Amsterdam');

  const currentSpots: RunningSpot[] = citySpots[selectedCity] || [];
  console.log('Selected City:', selectedCity);
  console.log('Current Spots:', currentSpots);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => navigate('/')} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div className="text-2xl font-bold text-cyan-500">Graps Running</div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/reviews')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Star className="h-6 w-6 text-yellow-500" />
              </button>
              <User
                onClick={() => navigate('/signin')}
                className="h-6 w-6 text-gray-600 hover:text-cyan-500 cursor-pointer transition-colors"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Best Running Spots</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the perfect running routes in your city, curated by AI Coach Mike and local runners
            </p>

            {/* City Selector */}
            <div className="flex items-center justify-center mb-8">
              <MapPin className="h-5 w-5 text-cyan-500 mr-2" />
              <span className="text-gray-700 mr-4">Select your city:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Spots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentSpots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} getDifficultyColor={getDifficultyColor} />
            ))}
          </div>

          {/* AI Coach Recommendations */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Bot className="h-8 w-8 text-cyan-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">AI Coach Mike's Recommendations</h3>
              </div>
              <p className="text-gray-600">Based on your running history and preferences in {selectedCity}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <Target className="h-6 w-6 text-green-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">For Beginners</h4>
                </div>
                <p className="text-sm text-gray-600">Start with flat, paved routes under 5 miles. Focus on building endurance gradually.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <Mountain className="h-6 w-6 text-orange-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">Hill Training</h4>
                </div>
                <p className="text-sm text-gray-600">Incorporate elevation changes to build strength and improve your running economy.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <Clock className="h-6 w-6 text-blue-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">Long Runs</h4>
                </div>
                <p className="text-sm text-gray-600">Choose scenic routes over 8 miles for your weekly long run training sessions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestSpotsPage;
