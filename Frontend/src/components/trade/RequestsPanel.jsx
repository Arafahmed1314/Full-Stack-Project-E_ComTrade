import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import * as tradeAPI from "../../utils/tradeAPI";
import { emit } from "../../utils/eventBus";

const RequestsPanel = ({ onClose, onAcceptOpenChat }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState({});

  const load = async () => {
    try {
      setLoading(true);
      const data = await tradeAPI.fetchIncomingRequests();
      setRequests((data && data.requests) || []);
    } catch (err) {
      setError(err.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAccept = async (id) => {
    try {
      setProcessing((p) => ({ ...p, [id]: true }));
      const res = await tradeAPI.acceptRequest(id);
      if (res && res.conversationId && typeof onAcceptOpenChat === "function") {
        onAcceptOpenChat(res.conversationId);
      }
      // notify listeners (badge etc.) that requests changed
      emit("requests:changed");
      await load();
    } catch (err) {
      console.error("Accept error", err);
      const msg = err && err.message ? err.message : String(err);
      setError(
        msg === "Failed to fetch"
          ? "Server unreachable — please start the backend."
          : msg
      );
    } finally {
      setProcessing((p) => ({ ...p, [id]: false }));
    }
  };

  const handleDecline = async (id) => {
    try {
      setProcessing((p) => ({ ...p, [id]: true }));
      await tradeAPI.declineRequest(id);
      // notify listeners (badge etc.) that requests changed
      emit("requests:changed");
      await load();
    } catch (err) {
      console.error("Decline error", err);
      const msg = err && err.message ? err.message : String(err);
      setError(
        msg === "Failed to fetch"
          ? "Server unreachable — please start the backend."
          : msg
      );
    } finally {
      setProcessing((p) => ({ ...p, [id]: false }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-11/12 max-w-2xl">
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header - classic look */}
          <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
            <h3 className="text-lg font-semibold text-gray-900">Requests</h3>
            <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {loading && <div className="text-sm text-gray-500">Loading...</div>}
            {error && <div className="text-sm text-red-500">{error}</div>}
            {!loading && requests.length === 0 && (
              <div className="text-sm text-gray-500">No requests</div>
            )}

            <div className="space-y-4">
              {requests.map((r, idx) => (
                <div key={r._id}>
                  <div className="flex items-start gap-4">
                    {r.fromUser?.avatar ? (
                      <img
                        src={r.fromUser.avatar}
                        alt={r.fromUser?.name}
                        className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700 border border-gray-100">
                        {r.fromUser && r.fromUser.name
                          ? r.fromUser.name.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {r.fromUser?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {r.post?.title}
                          </div>
                        </div>

                        <div className="text-xs text-gray-400 whitespace-nowrap">
                          {new Date(r.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-gray-700">
                        {r.message}
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => handleAccept(r._id)}
                          disabled={!!processing[r._id]}
                          className={`px-4 py-2 rounded text-sm transition ${
                            processing[r._id]
                              ? "opacity-60 cursor-wait"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          ✅ {processing[r._id] ? "Processing..." : "Accept"}
                        </button>
                        <button
                          onClick={() => handleDecline(r._id)}
                          disabled={!!processing[r._id]}
                          className={`px-4 py-2 rounded text-sm transition ${
                            processing[r._id]
                              ? "opacity-60 cursor-wait"
                              : "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
                          }`}
                        >
                          ❌ {processing[r._id] ? "Processing..." : "Decline"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {idx < requests.length - 1 && (
                    <hr className="my-4 border-t border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsPanel;
