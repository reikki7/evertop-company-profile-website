import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const api_domain = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${api_domain}/admin-login`, {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/admin");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "An error occurred during login");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-helvetica bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Kata Sandi
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#0d923a] hover:bg-[#236439] duration-150 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
            <Link
              to="/forgot-password"
              className="inline-block align-baseline font-bold text-sm text-[#0d923a] hover:text-[#236439] duration-150"
            >
              Lupa Kata Sandi?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
