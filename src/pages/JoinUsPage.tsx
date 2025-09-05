import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  User,
  UserPlus,
  Chrome,
  Mail,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const JoinUsPage: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName || !email || !password || !confirmPassword) {
      return setError('Please fill in all fields');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      const response = await registerUser({ name: fullName, email, password });

      console.log("Register response:", response);

      if (response?.status === 201) {
        setSuccess('Account created! Please check your email to verify your account.');
        const emailForRedirect = email;

        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // ⏳ Espera 2 segundos mostrando el mensaje antes de redirigir
        setTimeout(() => {
          navigate(`/goto-email?email=${encodeURIComponent(emailForRedirect)}`);
        }, 2000);
      } else {
        setError(response?.msg || "Registration failed");
      }
    } catch (err: any) {
      setError(err.message || 'User already exists');
    } finally {
      setLoading(false);
    }
  };

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

      {/* Join Us Content */}
      <section className="py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <UserPlus className="h-12 w-12 text-cyan-500 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900">Join Us</h1>
            </div>
            <p className="text-lg text-gray-600">
              Create your account and start training with AI Coach Mike
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            {/* Social Sign Up */}
            <div className="space-y-4 mb-6">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Chrome className="h-5 w-5 mr-3" />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="h-5 w-5 mr-3" />
                Continue with Email
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or create account with email
                </span>
              </div>
            </div>

            {/* Email Sign Up Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-12"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-12"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading && <Loader2 className="animate-spin mr-2 h-5 w-5" />}
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/signin')}
                  className="text-cyan-600 hover:text-cyan-500 font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUsPage;
