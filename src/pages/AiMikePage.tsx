import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AiMikeWidget from '../components/AiMikeWidget';

const AiMikePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div className="text-2xl font-bold text-cyan-500">AI Coach Mike</div>
            </div>
          </div>
        </div>
      </header>

      {/* Chatbot ocupando todo el resto de la pantalla */}
      <section className="flex-grow">
        <div className="relative w-full h-[calc(100vh-4rem)]">
          <div className="absolute inset-0">
            <AiMikeWidget />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiMikePage;
