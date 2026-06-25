import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ CLEAN PAYLOAD (BACKEND COMPATIBLE)
      const response = await API.post("/auth/login", {
        mobile: identifier,   // 👈 IMPORTANT FIX
        password,
      });

      if (response.data.success) {
        const token = response.data.token;

        // store token
        localStorage.setItem("token", token);

        // attach token for future requests
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        navigate("/");
      } else {
        setError(response.data.message || "Login failed");
      }

    } catch (err: any) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Member Login
      </h2>

      <form className="flex flex-col gap-4 text-gray-700" onSubmit={handleSubmit}>

        <div className="flex flex-col">
          <label>Mobile Number or Email</label>
          <input
            type="text"
            placeholder="03XX-XXXXXXX or you@example.com"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
}