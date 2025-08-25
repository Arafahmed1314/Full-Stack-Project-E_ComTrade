import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  ArrowRightLeft,
  MapPin,
  CheckCircle,
  Zap,
  TrendingUp,
} from "lucide-react";

const TradePostCard = ({ post, onLike, onTradeRequest }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    if (diffInHours < 1) return "now";
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  const handleTradeRequestClick = () => {
    onTradeRequest(post.id);
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10"></div>

      {/* Main Content */}
      <div className="relative">
        {/* Image Section with Overlay */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={post.images[currentImageIndex]}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
              {post.category}
            </span>
          </div>

          {/* Image Counter */}
          {post.images.length > 1 && (
            <div className="absolute top-4 right-4">
              <div className="bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                {currentImageIndex + 1}/{post.images.length}
              </div>
            </div>
          )}

          {/* User Info Overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div className="relative">
              <img
                src={post.postedBy.avatar}
                alt={post.postedBy.username}
                className="w-10 h-10 rounded-full border-2 border-white/50"
              />
              {post.postedBy.verified && (
                <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-blue-400 bg-white rounded-full" />
              )}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                @{post.postedBy.username}
              </p>
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <span>{formatTimeAgo(post.timePosted)}</span>
                {post.location && (
                  <>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{post.location.split(",")[0]}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {post.description}
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart
                  className={`w-4 h-4 ${
                    post.isLiked ? "text-red-500 fill-current" : "text-gray-400"
                  }`}
                />
                <span className="text-sm font-medium text-gray-600">
                  {post.likes}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  {post.comments}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  {post.tradeRequests}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onLike(post.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                post.isLiked
                  ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {post.isLiked ? "Liked" : "Like"}
            </button>

            <button
              onClick={handleTradeRequestClick}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Trade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePostCard;
