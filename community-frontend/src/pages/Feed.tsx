import { useEffect, useState, type FormEvent } from "react";
import API from "../api/axios.js";

interface Post {
  _id: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export default function Feed() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      setFetching(true);
      setError("");
      const response = await API.get<Post[]>("/posts/all");
      setPosts(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to load posts.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!text.trim()) {
      setError("Please enter something to post.");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post<Post>("/posts/create", { text: text.trim() });
      setPosts((existing) => [response.data, ...existing]);
      setText("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800">Create New Post</h1>
        <p className="text-sm text-gray-500 mt-1">Write something for the community feed.</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Share your update..."
            className="w-full rounded-lg border border-gray-300 p-4 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Community Feed</h2>
          {fetching && <span className="text-sm text-gray-500">Loading...</span>}
        </div>

        {posts.length === 0 && !fetching ? (
          <div className="mt-6 text-center text-gray-500">No posts yet. Be the first to share!</div>
        ) : (
          <div className="mt-6 space-y-4">
            {posts.map((post) => (
              <article key={post._id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-3 text-sm text-gray-500">
                  <span>By: {post.authorName}</span>
                  <span>{new Date(post.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-3 whitespace-pre-line text-gray-800">{post.text}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
