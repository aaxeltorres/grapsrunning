import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Heart, 
  User, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Info,
  Play,
  Trophy,
  Users,
  Target,
  Activity,
  Zap,
  ChevronRight,
  Bot,
  Brain,
  Cpu,
  Navigation,
  Clock,
  Star,
  Thermometer,
  Wind,
  Mountain,
  Trees,
  Building,
  ArrowLeft
} from 'lucide-react';

interface RunningSpot {
  id: number;
  name: string;
  distance: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  terrain: string;
  rating: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [userLocation, setUserLocation] = useState('New York');
  const [selectedCity, setSelectedCity] = useState('New York');

  // Mock data for different cities
  const citySpots: Record<string, RunningSpot[]> = {
    'Amsterdam': [
      {
        id: 1,
        name: 'Vondelpark Circuit',
        distance: '4.7 miles',
        difficulty: 'Easy',
        terrain: 'Paved paths',
        rating: 4.8,
        description: 'Amsterdam\'s most popular park with beautiful tree-lined paths and peaceful ponds.',
        features: ['Flat terrain', 'Shade', 'Water fountains', 'Cafes nearby'],
        icon: <Trees className="h-5 w-5" />,
        image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 2,
        name: 'Amstel River Route',
        distance: '8.2 miles',
        difficulty: 'Moderate',
        terrain: 'Mixed surfaces',
        rating: 4.6,
        description: 'Scenic riverside running with views of historic Amsterdam architecture.',
        features: ['River views', 'Historic buildings', 'Bridges', 'Photo opportunities'],
        icon: <Navigation className="h-5 w-5" />,
        image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 3,
        name: 'Amsterdamse Bos Trail',
        distance: '12 miles',
        difficulty: 'Hard',
        terrain: 'Forest trails',
        rating: 4.7,
        description: 'Large forest park with varied terrain and challenging trail routes.',
        features: ['Forest trails', 'Hills', 'Wildlife', 'Multiple routes'],
        icon: <Mountain className="h-5 w-5" />,
        image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ],
    'New York': [
      {
        id: 4,
        name: 'Central Park Loop',
        distance: '6.1 miles',
        difficulty: 'Easy',
        terrain: 'Paved paths',
        rating: 4.8,
        description: 'The classic NYC running experience with scenic views and well-maintained paths.',
        features: ['Water fountains', 'Restrooms', 'Mile markers', 'Shade'],
        icon: <Trees className="h-5 w-5" />,
        image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 5,
        name: 'Brooklyn Bridge to Manhattan Bridge',
        distance: '4.2 miles',
        difficulty: 'Moderate',
        terrain: 'Mixed surfaces',
        rating: 4.6,
        description: 'Urban running with stunning bridge views and waterfront paths.',
        features: ['City views', 'Bridge crossings', 'Waterfront', 'Photo spots'],
        icon: <Building className="h-5 w-5" />,
        image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 6,
        name: 'Hudson River Greenway',
        distance: '11 miles',
        difficulty: 'Easy',
        terrain: 'Paved bike path',
        rating: 4.7,
        description: 'Long, flat route perfect for distance training with river views.',
        features: ['Flat terrain', 'River views', 'Bike path', 'Multiple entry points'],
        icon: <Navigation className="h-5 w-5" />,
        image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ],
    'Buenos Aires': [
      {
        id: 7,
        name: 'Puerto Madero Waterfront',
        distance: '5.8 miles',
        difficulty: 'Easy',
        terrain: 'Paved waterfront',
        rating: 4.9,
        description: 'Modern waterfront district with stunning skyline views and wide pedestrian paths.',
        features: ['Skyline views', 'Modern architecture', 'Flat terrain', 'Well-lit'],
        icon: <Building className="h-5 w-5" />,
        image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 8,
        name: 'Bosques de Palermo',
        distance: '7.3 miles',
        difficulty: 'Moderate',
        terrain: 'Park paths',
        rating: 4.7,
        description: 'Large urban park with lakes, rose gardens, and tree-lined running paths.',
        features: ['Lakes', 'Rose garden', 'Shade', 'Multiple loops'],
        icon: <Trees className="h-5 w-5" />,
        image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 9,
        name: 'Costanera Sur Ecological Reserve',
        distance: '9.1 miles',
        difficulty: 'Hard',
        terrain: 'Nature trails',
        rating: 4.5,
        description: 'Natural reserve with diverse wildlife and challenging terrain along the Rio de la Plata.',
        features: ['Wildlife viewing', 'River views', 'Nature trails', 'Bird watching'],
        icon: <Mountain className="h-5 w-5" />,
        image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  };

  const cities = ['Amsterdam', 'New York', 'Buenos Aires'];

  useEffect(() => {
    // Simulate getting user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use reverse geocoding to get the city
          // For demo purposes, we'll keep it as New York
          setUserLocation('New York');
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const currentSpots = citySpots[selectedCity] || citySpots['New York'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderBestSpotsPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage('home')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div className="text-2xl font-bold text-cyan-500">Graps Running</div>
            </div>

            <div className="flex items-center space-x-4">
              <Heart className="h-6 w-6 text-gray-600 hover:text-cyan-500 cursor-pointer transition-colors" />
              <User className="h-6 w-6 text-gray-600 hover:text-cyan-500 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* Best Spots Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Best Running Spots</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the perfect running routes in your city, curated by AI Coach Mike and local runners
            </p>
            
            {/* Location Selector */}
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

          {/* Running Spots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentSpots.map((spot) => (
              <div key={spot.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={spot.image} 
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">{spot.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{spot.name}</h3>
                    <div className="text-cyan-500">
                      {spot.icon}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Navigation className="h-4 w-4 mr-1" />
                      {spot.distance}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(spot.difficulty)}`}>
                      {spot.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">{spot.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Terrain: {spot.terrain}</p>
                    <div className="flex flex-wrap gap-2">
                      {spot.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                      {spot.features.length > 3 && (
                        <span className="text-cyan-500 text-xs">+{spot.features.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  
                  <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI Recommendations */}
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

  const renderHomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-gray-100 py-2 px-4 text-center text-sm">
        <p className="text-gray-700">Train smarter with AI Coach Mike. Personalized coaching for every runner.</p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Navigation */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center space-x-6">
                <div className="text-xl font-bold text-gray-900">Graps Running</div>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Join Us</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Sign In</a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-cyan-500">Graps Running</div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setCurrentPage('best-spots')}
                className="text-gray-900 hover:text-cyan-500 font-medium transition-colors"
              >
                Best Spots
              </button>
              <a href="#events" className="text-gray-900 hover:text-cyan-500 font-medium transition-colors">Upcoming Events</a>
              <a href="#about" className="text-gray-900 hover:text-cyan-500 font-medium transition-colors">About Us</a>
              <a href="#chat" className="text-gray-900 hover:text-cyan-500 font-medium transition-colors flex items-center">
                <Bot className="h-4 w-4 mr-1" />
                AI Coach Mike
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Heart className="h-6 w-6 text-gray-600 hover:text-cyan-500 cursor-pointer transition-colors" />
              <User className="h-6 w-6 text-gray-600 hover:text-cyan-500 cursor-pointer transition-colors" />
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <button 
                onClick={() => {
                  setCurrentPage('best-spots');
                  setIsMenuOpen(false);
                }}
                className="block py-2 text-gray-900 hover:text-cyan-500 w-full text-left"
              >
                Best Spots
              </button>
              <a href="#events" className="block py-2 text-gray-900 hover:text-cyan-500">Upcoming Events</a>
              <a href="#about" className="block py-2 text-gray-900 hover:text-cyan-500">About Us</a>
              <a href="#chat" className="block py-2 text-gray-900 hover:text-cyan-500 flex items-center">
                <Bot className="h-4 w-4 mr-1" />
                AI Coach Mike
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-slate-800 to-cyan-900"></div>
        <img 
          src="https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
          alt="Runner on track with AI coaching technology"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70"
        />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Bot className="h-16 w-16 text-cyan-400 mr-4" />
            <h1 className="text-6xl md:text-8xl font-black leading-none">
              AI COACH
              <span className="block text-cyan-400">MIKE</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Start your challenge with AI. Personalized training, real-time guidance, unlimited potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center">
              <Brain className="h-5 w-5 mr-2" />
              Start with AI Mike
            </button>
            <button 
              onClick={() => setCurrentPage('best-spots')}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              Explore Best Spots
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your AI-Powered Running Companion</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet Mike, your personal AI coach that adapts to your style, goals, and progress
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="bg-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors">
                <MapPin className="h-8 w-8 text-cyan-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Routes</h3>
              <p className="text-gray-600">AI-curated running routes optimized for your fitness level and training goals.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <Brain className="h-8 w-8 text-blue-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Coaching</h3>
              <p className="text-gray-600">Real-time guidance and personalized training plans that evolve with your progress.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
                <Calendar className="h-8 w-8 text-purple-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Race Events</h3>
              <p className="text-gray-600">Find races that match your training level with AI-powered recommendations.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
              <div className="bg-teal-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500 transition-colors">
                <MessageCircle className="h-8 w-8 text-teal-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">24/7 Support</h3>
              <p className="text-gray-600">Chat with Mike anytime for motivation, advice, and instant training adjustments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Coach Mike Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Bot className="h-12 w-12 text-cyan-500 mr-4" />
                <h2 className="text-4xl font-bold text-gray-900">Meet AI Coach Mike</h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Your personal AI running coach that learns from every step you take. Mike analyzes your performance, 
                adapts your training, and provides real-time motivation to help you achieve your goals.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-cyan-500 p-2 rounded-lg mr-4">
                    <Cpu className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Adaptive Intelligence</h3>
                    <p className="text-gray-600">Learns your patterns and adjusts training in real-time</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-lg mr-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Personalized Plans</h3>
                    <p className="text-gray-600">Custom training programs based on your goals and progress</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-teal-500 p-2 rounded-lg mr-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instant Feedback</h3>
                    <p className="text-gray-600">Real-time coaching and motivation during your runs</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-8 rounded-3xl">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Bot className="h-8 w-8 text-cyan-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">AI Coach Mike</h3>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-cyan-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">"Great pace today! Let's increase your interval training by 10% next week."</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">"Your heart rate recovery is improving. Ready for a longer run tomorrow?"</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-500">94%</div>
                    <div className="text-sm text-gray-500">Goal Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">7:32</div>
                    <div className="text-sm text-gray-500">Target Pace</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-500">12</div>
                    <div className="text-sm text-gray-500">Days Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Bot className="h-12 w-12 text-white mr-4" />
            <h2 className="text-4xl font-bold text-white">Ready to Train with AI Coach Mike?</h2>
          </div>
          <p className="text-xl text-cyan-100 mb-8">
            Join thousands of runners who've transformed their performance with personalized AI coaching
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center">
              <Brain className="h-5 w-5 mr-2" />
              Start AI Training
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center">
              Learn More
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-2xl font-bold text-cyan-500 mr-2">Graps Running</div>
                <Bot className="h-6 w-6 text-cyan-400" />
              </div>
              <p className="text-gray-400 mb-4">
                Your ultimate AI-powered running companion with Coach Mike guiding every step of your journey.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
                  <Users className="h-5 w-5" />
                </div>
                <div className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
                  <Bot className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">AI Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Coach Mike</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Smart Route Planning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Performance Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Adaptive Training</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Join Groups</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Challenges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Leaderboards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Graps Running. All rights reserved. Powered by AI Coach Mike.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  if (currentPage === 'best-spots') {
    return renderBestSpotsPage();
  }

  return renderHomePage();
}

export default App;