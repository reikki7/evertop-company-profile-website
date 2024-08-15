import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        alert("A password reset link has been sent to your email.");
        navigate("/login-admin");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="font-helvetica min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Lapa Kata Sandi
        </h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleForgotPassword}>
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
          <button
            type="submit"
            className="w-full bg-[#0d923a] hover:bg-[#236439] duration-150 text-white font-bold py-2 px-4 rounded"
          >
            Reset Kata Sandi
          </button>
        </form>
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-500 hover:bg-gray-700 duration-150 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
