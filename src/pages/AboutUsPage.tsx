import React from 'react';
import {
  ArrowLeft,
  Star,
  User,
  Bot,
  Users,
  Target,
  Zap,
  Trophy,
  Activity,
  Play,
  Thermometer,
  Brain,
  MapPin,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-stone-100 to-stone-300">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div className="text-2xl font-bold text-cyan-500">Graps Running</div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/reviews')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
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

      {/* About Us Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Bot className="h-16 w-16 text-cyan-500 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">About Us</h1>
            </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Graps Running, ready to start your change with us?
              </h2>
          </div>

          {/* Who We Are Section */}
          <div className="bg-gradient-to-r from-cyan-300 to-blue-500 rounded-3xl p-[1px] shadow-lg mb-12">
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-cyan-500 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">Who We Are?</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Graps Running is a revolutionary project focused on physical and mental well-being through sports and AI...
              </p>
            </div>
          </div>

          {/* Our Goal Section */}
          <div className="bg-gradient-to-r from-cyan-300 to-blue-500 rounded-3xl p-[1px] shadow-lg mb-12">
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-blue-500 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">What Is Our Goal?</h3>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Graps Running, our goal is to help you achieve your perfect transformation...
                </p>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">We Can Help You With:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center"><Zap className="h-5 w-5 text-cyan-500 mr-3" />Physical transformation</div>
                    <div className="flex items-center"><Trophy className="h-5 w-5 text-cyan-500 mr-3" />Race preparation</div>
                    <div className="flex items-center"><Activity className="h-5 w-5 text-cyan-500 mr-3" />Improving running form</div>
                    <div className="flex items-center"><Play className="h-5 w-5 text-cyan-500 mr-3" />Starting a sport routine</div>
                    <div className="flex items-center"><Star className="h-5 w-5 text-cyan-500 mr-3" />Nutrition guidance</div>
                    <div className="flex items-center"><Star className="h-5 w-5 text-cyan-500 mr-3" />Personal best improvement</div>
                    <div className="flex items-center"><Thermometer className="h-5 w-5 text-cyan-500 mr-3" />Injury rehabilitation</div>
                    <div className="flex items-center"><Brain className="h-5 w-5 text-cyan-500 mr-3" />Mental wellness</div>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  We want your experience with us to be effective, transformative...
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">ARE YOU READY?!</h3>
            <div className="flex items-center justify-center mb-6">
              <Bot className="h-12 w-12 text-white mr-4" />
              <span className="text-2xl font-semibold">WE ARE READY TO HELP YOU 🏃</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center">
                <Brain className="h-5 w-5 mr-2" />
                Start with AI Coach Mike
              </button>
              <button 
                onClick={() => navigate('/best-spots')}
                className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Explore Best Spots
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
