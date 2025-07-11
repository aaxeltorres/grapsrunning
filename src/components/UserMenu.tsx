import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, LogOut, User as UserIcon } from "lucide-react";

export default function UserMenu() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Verificación del token en el backend
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            // Token inválido o expirado → cerrar sesión en frontend
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
            return;
          }
          const data = await res.json();
          setUser(data.user || null);
          localStorage.setItem("user", JSON.stringify(data.user));
        })
        .catch((err) => {
          console.error("Error verificando token:", err);
          setUser(null);
        });
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await fetch("http://localhost:5000/api/users/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error cerrando sesión:", error);
      }
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  if (!user) {
    return (
      <UserIcon
        onClick={() => navigate("/signin")}
        className="h-6 w-6 text-gray-600 hover:text-cyan-500 cursor-pointer transition-colors"
      />
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <UserIcon
        className="h-6 w-6 text-gray-600 hover:text-cyan-500 cursor-pointer transition-colors"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div
          className="absolute right-0 mt-2 w-60 bg-white border-2 border-gray-500 rounded-lg shadow-lg z-50 overflow-hidden
                     transform origin-top transition-all duration-200 ease-out
                     opacity-0 scale-y-0 animate-slideDown"
        >
          {/* Nombre del usuario */}
          <div className="px-4 py-3 text-gray-800 font-semibold border-b-2 border-gray-300">
            {user.name}
          </div>

          {/* Botón Configuración */}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/settings");
            }}
            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings className="h-5 w-5 mr-3 text-gray-600" />
            <span className="whitespace-nowrap">Configuración o soporte</span>
          </button>

          {/* Botón Cerrar sesión */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="whitespace-nowrap">Cerrar sesión</span>
          </button>
        </div>
      )}
    </div>
  );
}
