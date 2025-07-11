// src/services/authService.ts

// Usamos variable de entorno para la URL base
const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (formData: {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  height?: number;
  weight?: number;
}) => {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Error registering user");
  }

  return data;
};

export const loginUser = async (formData: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Error logging in");
  }

  return data;
};
