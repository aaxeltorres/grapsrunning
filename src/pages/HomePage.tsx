import React, { useState, useEffect } from 'react';
import {
  Activity,
  Bot,
  Brain,
  Calendar,
  ChevronRight,
  Cpu,
  MapPin,
  Menu,
  MessageCircle,
  Star,
  User,
  Users,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserMenu from "../components/UserMenu";

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  errorMessage?: string;
  errorTriggered?: boolean;
  resetErrorTrigger?: () => void;
  onJoinUsClick?: () => void;
  onSignInClick?: () => void;
}

const HomePage: React.FC<Props> = ({
  isMenuOpen,
  setIsMenuOpen,
  errorMessage,
  errorTriggered,
  resetErrorTrigger,
  onJoinUsClick,
  onSignInClick
}) => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    console.log("errorMessage recibido en HomePage:", errorMessage);
    if (errorTriggered && errorMessage && errorMessage.trim() !== "") {
      setFadeOut(false); // resetea fade-out
      setShowError(false);
      setTimeout(() => setShowError(true), 0);

      const fadeTimer = setTimeout(() => {
        setFadeOut(true); // activa animación fade-out
      }, 2500); // empieza a desvanecerse antes de ocultar

      const hideTimer = setTimeout(() => {
        setShowError(false);
        setFadeOut(false);
        if (resetErrorTrigger) resetErrorTrigger(); // resetea trigger después de mostrar
      }, 3000); // oculta completamente

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [errorMessage, errorTriggered, resetErrorTrigger]);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-gray-100 py-2 px-4 text-center text-sm">
        <p className="text-gray-700">
          Train smarter with AI Coach Mike. Personalized coaching for every runner.
        </p>
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
              <div className="hidden md:flex items-center space-x-6 text-sm relative">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help</a>
                <button
                  onClick={onJoinUsClick}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Join Us
                </button>
                <button
                  onClick={onSignInClick}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </button>

                {/* Floating Error Message */}
                {showError && (
                  <div
                    className={`absolute top-full mt-1 bg-white z-10 border border-red-400 rounded shadow-lg px-3 py-1 transition-opacity duration-500 ${
                      fadeOut ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <p className="text-red-500 font-semibold text-sm shake">
                      {errorMessage?.split("|")[0]}
                    </p>
                  </div>
                )}
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
              <button onClick={() => navigate('/best-spots')} className="text-gray-900 hover:text-cyan-500 font-medium transition-colors">Best Spots</button>
              <button onClick={() => navigate('/events')} className="text-gray-900 hover:text-cyan-500 font-medium transition-colors">Upcoming Events</button>
              <button onClick={() => navigate('/about')} className="text-gray-900 hover:text-cyan-500 font-medium transition-colors">About Us</button>
              <button
                onClick={() => navigate('/ai-mike')}
                className="text-gray-900 hover:text-cyan-500 font-medium transition-colors flex items-center"
              >
                <Bot className="h-4 w-4 mr-1" /> AI Coach Mike
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/reviews')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Star className="h-6 w-6 text-yellow-500" />
              </button>
              <UserMenu />
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <button onClick={() => { navigate('/best-spots'); setIsMenuOpen(false); }} className="block py-2 text-gray-900 hover:text-cyan-500 w-full text-left">Best Spots</button>
              <button onClick={() => { navigate('/events'); setIsMenuOpen(false); }} className="block py-2 text-gray-900 hover:text-cyan-500 w-full text-left">Upcoming Events</button>
              <button onClick={() => { navigate('/about'); setIsMenuOpen(false); }} className="block py-2 text-gray-900 hover:text-cyan-500 w-full text-left">About Us</button>
              <button
                onClick={() => navigate('/ai-mike')}
                className="text-gray-900 hover:text-cyan-500 font-medium transition-colors flex items-center"
              >
                <Bot className="h-4 w-4 mr-1" /> AI Coach Mike
              </button>
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
            <h1 className="text-6xl md:text-8xl font-black leading-none">
              AI PERSONAL
              <span className="block text-cyan-400">TRAINER</span>
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
              onClick={() => navigate('/best-spots')}
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
};

export default HomePage;
