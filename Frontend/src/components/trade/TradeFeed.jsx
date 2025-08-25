import React, { useState } from "react";
import TradePostCard from "./TradePostCard";

const TradeFeed = ({ posts, setPosts }) => {
  const [likedPosts, setLikedPosts] = useState(new Set());

  const handleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);

    // Update post like count
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1,
              isLiked: !likedPosts.has(postId),
            }
          : post
      )
    );
  };

  const handleTradeRequest = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, tradeRequests: post.tradeRequests + 1 }
          : post
      )
    );
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No trades found
          </h3>
          <p className="text-gray-500 text-sm">
            Be the first to create a trade post or adjust your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-8">
      {posts.map((post) => (
        <div key={post.id} className="w-full">
          <TradePostCard
            post={post}
            onLike={handleLike}
            onTradeRequest={handleTradeRequest}
          />
        </div>
      ))}
    </div>
  );
};

export default TradeFeed;
