import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  UserPlus,
  Chrome,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await loginUser({ email, password });
      console.log("Respuesta backend login:", res);
      setSuccess("Login successful!");
      localStorage.setItem("token", res.token); // Guarda token si quieres manejar sesión
      localStorage.setItem("user", JSON.stringify(res.user)); // guardamos el usuario
      navigate("/"); // redirige al home
    } catch (err: any) {
      setError(err.message);
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
                onClick={() => navigate("/")}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div className="text-2xl font-bold text-cyan-500">
                Graps Running
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/reviews")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Star className="h-6 w-6 text-yellow-500" />
              </button>
              <UserPlus
                onClick={() => navigate("/joinus")}
                className="h-6 w-6 text-gray-600 hover:text-cyan-500 cursor-pointer transition-colors"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Sign In Content */}
      <section className="py-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Chrome className="h-5 w-5 mr-3" />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="h-5 w-5 mr-3" />
                Continue with Email
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign in with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-sm text-center">{success}</p>
              )}

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
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-cyan-600 hover:text-cyan-500"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <button
                  onClick={() => navigate("/joinus")}
                  className="text-cyan-600 hover:text-cyan-500 font-medium"
                >
                  Join Us
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
