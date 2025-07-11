import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MailCheck } from 'lucide-react';

const VerifyNoticePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extraer el email desde query params
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
                <MailCheck className="h-12 w-12 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Verify Your Email
            </h1>
            <p className="text-gray-600 mb-6">
              {email ? (
                <>
                  We’ve sent a verification link to <br />
                  <span className="font-semibold text-gray-800">{email}</span>
                </>
              ) : (
                'We’ve sent you a verification email. Please check your inbox.'
              )}
            </p>
            <p className="text-sm text-gray-500 mb-8">
              If you don’t see the email in your inbox, check your spam or junk folder.
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

export default VerifyNoticePage;
