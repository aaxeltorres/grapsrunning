import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

const VerifyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const isSuccess = location.pathname.includes("success");

  useEffect(() => {
    const verifyToken = async () => {
      // Solo llamamos al backend si la URL tiene un token (no estamos ya en /success o /error)
      if (token) {
        try {
          const res = await fetch(
            `https://grapsrunning-backend-production.up.railway.app/api/users/verify/${token}`
          );

          if (res.ok) {
            navigate("/verify/success");
          } else {
            navigate("/verify/error");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          navigate("/verify/error");
        }
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-50 border-b-4 border-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-700 hover:text-cyan-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">GR</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Graps Running
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div className="bg-gray-50 border-2 border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                <Mail className="w-12 h-12 text-white" />
              </div>
              {isSuccess && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {isSuccess ? "Cuenta verificada ✅" : "Error en la verificación ❌"}
          </h1>

          <p className="text-gray-600 mb-6">
            {isSuccess
              ? "Cuenta verificada con éxito"
              : "Token inválido o expirado"}
          </p>

          {isSuccess && (
            <button
              onClick={() => navigate("/signin")}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg"
            >
              Ir a Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
