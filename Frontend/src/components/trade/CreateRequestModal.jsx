import React, { useState } from "react";
import * as tradeAPI from "../../utils/tradeAPI";

const CreateRequestModal = ({ post, onClose, onCreated }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const created = await tradeAPI.createRequest({
        postId: post.id,
        message,
      });
      onCreated && onCreated(created);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="bg-white rounded-xl shadow-lg z-10 w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-2">Request Trade</h3>
        <p className="text-sm text-gray-600 mb-4">
          Requesting: <strong>{post.title}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Optional message or offer"
            className="w-full p-3 border rounded-lg mb-3 text-sm h-28"
          />
          {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestModal;
