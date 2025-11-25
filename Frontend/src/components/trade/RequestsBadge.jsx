import React, { useEffect, useState } from "react";
import * as tradeAPI from "../../utils/tradeAPI";
import { on } from "../../utils/eventBus";

const RequestsBadge = ({ onClick }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await tradeAPI.fetchRequestCount();
      setCount(data.pending || 0);
    } catch (err) {
      console.error("Failed to load request count", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const iv = setInterval(load, 20000); // refresh every 20s
    // listen to immediate update events
    const off = on("requests:changed", () => {
      load();
    });
    return () => {
      clearInterval(iv);
      off();
    };
  }, []);

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <svg
        className="w-5 h-5 text-gray-600"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22c1.1046 0 2-.8954 2-2H10c0 1.1046.8954 2 2 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 8a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2V8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0 -right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

export default RequestsBadge;
