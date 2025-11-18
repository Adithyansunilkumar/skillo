<<<<<<< HEAD
const API_URL = import.meta.env.VITE_API_URL;
=======
const API_URL = "http://localhost:5000/api/auth";
>>>>>>> 3ec38f4cb1d614cad8845798508b10b112e50afd

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return res.json();
}
