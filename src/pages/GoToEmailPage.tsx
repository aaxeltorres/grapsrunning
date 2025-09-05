import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

const GoToEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-lg">
                <Mail className="h-12 w-12 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email</h1>
            <p className="text-gray-600 mb-6">
              {email ? (
                <>
                  We’ve sent a verification link to <br />
                  <span className="font-semibold text-gray-800">{email}</span>
                </>
              ) : (
                "We’ve sent you a verification email."
              )}
            </p>

            <p className="text-sm text-gray-500 mb-8">
              Please check your inbox or spam folder to complete the verification.
            </p>

            <button
              onClick={() => navigate('/signin')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GoToEmailPage;
