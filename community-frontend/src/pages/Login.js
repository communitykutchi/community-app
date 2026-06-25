import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // ✅ CLEAN PAYLOAD (BACKEND COMPATIBLE)
            const response = await API.post("/auth/login", {
                mobile: identifier, // 👈 IMPORTANT FIX
                password,
            });
            if (response.data.success) {
                const token = response.data.token;
                // store token
                localStorage.setItem("token", token);
                // attach token for future requests
                API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                navigate("/");
            }
            else {
                setError(response.data.message || "Login failed");
            }
        }
        catch (err) {
            setError(err.response?.data?.message || "Server error");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "w-full max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-center text-blue-600", children: "Member Login" }), _jsxs("form", { className: "flex flex-col gap-4 text-gray-700", onSubmit: handleSubmit, children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("label", { children: "Mobile Number or Email" }), _jsx("input", { type: "text", placeholder: "03XX-XXXXXXX or you@example.com", className: "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400", required: true, value: identifier, onChange: (e) => setIdentifier(e.target.value) })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { children: "Password" }), _jsx("input", { type: "password", placeholder: "Enter your password", className: "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400", required: true, value: password, onChange: (e) => setPassword(e.target.value) })] }), error && (_jsx("p", { className: "text-red-500 text-sm", children: error })), _jsx("button", { type: "submit", disabled: loading, className: "bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition", children: loading ? "Logging in..." : "Login" })] })] }));
}
