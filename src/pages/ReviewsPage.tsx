import React from 'react';
import { ArrowLeft, Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReviewsPage: React.FC = () => {
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

      {/* Reviews Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-5xl font-bold text-gray-900">Share Us Your Experience</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Share your experience with Graps Running and AI Coach Mike
            </p>
          </div>

          {/* Write Review Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-8 w-8 text-yellow-400 cursor-pointer hover:text-yellow-500"
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  rows={4}
                  placeholder="Share your experience with AI Coach Mike and Graps Running..."
                />
              </div>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Submit Review
              </button>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-cyan-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">Maria Rodriguez</h4>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-gray-700">
                "AI Coach Mike has completely transformed my running routine! The personalized training plans are incredible,
                and the real-time feedback during runs keeps me motivated. Best running app I've ever used!"
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                    J
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">John Smith</h4>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <p className="text-gray-700">
                "Great app with amazing AI features. The route recommendations are spot on, and I love how Mike adapts
                to my progress. Only wish there were more social features to connect with other runners."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;
