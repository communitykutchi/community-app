import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import API from "../api/axios.js";
export default function Feed() {
    const [text, setText] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const loadPosts = async () => {
        try {
            setFetching(true);
            setError("");
            const response = await API.get("/posts/all");
            setPosts(response.data);
        }
        catch (err) {
            setError(err.response?.data?.message || "Unable to load posts.");
        }
        finally {
            setFetching(false);
        }
    };
    useEffect(() => {
        loadPosts();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        if (!text.trim()) {
            setError("Please enter something to post.");
            return;
        }
        try {
            setLoading(true);
            const response = await API.post("/posts/create", { text: text.trim() });
            setPosts((existing) => [response.data, ...existing]);
            setText("");
        }
        catch (err) {
            setError(err.response?.data?.message || "Unable to create post.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "w-full max-w-3xl mx-auto space-y-6", children: [_jsxs("div", { className: "rounded-lg bg-white p-6 shadow-lg", children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-800", children: "Create New Post" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Write something for the community feed." }), _jsxs("form", { onSubmit: handleSubmit, className: "mt-5 space-y-4", children: [_jsx("textarea", { value: text, onChange: (e) => setText(e.target.value), rows: 5, placeholder: "Share your update...", className: "w-full rounded-lg border border-gray-300 p-4 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" }), error && _jsx("div", { className: "text-sm text-red-600", children: error }), _jsx("button", { type: "submit", disabled: loading, className: "inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60", children: loading ? "Posting..." : "Post" })] })] }), _jsxs("div", { className: "rounded-lg bg-white p-6 shadow-lg", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Community Feed" }), fetching && _jsx("span", { className: "text-sm text-gray-500", children: "Loading..." })] }), posts.length === 0 && !fetching ? (_jsx("div", { className: "mt-6 text-center text-gray-500", children: "No posts yet. Be the first to share!" })) : (_jsx("div", { className: "mt-6 space-y-4", children: posts.map((post) => (_jsxs("article", { className: "rounded-xl border border-gray-200 bg-gray-50 p-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-3 text-sm text-gray-500", children: [_jsxs("span", { children: ["By: ", post.authorName] }), _jsx("span", { children: new Date(post.createdAt).toLocaleString() })] }), _jsx("p", { className: "mt-3 whitespace-pre-line text-gray-800", children: post.text })] }, post._id))) }))] })] }));
}
