import React from 'react';
import { ArrowLeft, Star, User, Calendar, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Events Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="h-12 w-12 text-cyan-500 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">Upcoming Events</h1>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-16">
            <div className="flex items-center justify-center mb-8">
              <Bot className="h-16 w-16 text-cyan-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
            <p className="text-xl text-gray-600 mb-8">
              We're working with AI Coach Mike to organize amazing running events for our community.
            </p>
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No events available yet</h3>
              <p className="text-gray-700 mb-6">
                Stay tuned! We'll be announcing exciting running events, AI-powered challenges,
                and community meetups very soon.
              </p>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Notify Me When Events Are Available
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
