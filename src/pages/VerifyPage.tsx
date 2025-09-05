import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/verify/error", { replace: true });
        return;
      }

      try {
        const res = await fetch(
          `https://grapsrunning-backend-production.up.railway.app/api/users/verify/${token}`
        );

        if (res.ok) {
          setStatus("success");
          navigate("/verify/success", { replace: true });
        } else {
          setStatus("error");
          navigate("/verify/error", { replace: true });
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setStatus("error");
        navigate("/verify/error", { replace: true });
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        {status === "loading" && <p className="text-gray-600">Verifying...</p>}
        {status === "success" && <p className="text-green-600">Verified!</p>}
        {status === "error" && <p className="text-red-600">Verification failed.</p>}
      </div>
    </div>
  );
};

export default VerifyPage;
