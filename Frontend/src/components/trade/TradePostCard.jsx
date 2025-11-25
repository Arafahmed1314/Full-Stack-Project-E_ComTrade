import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  MapPin,
  CheckCircle,
  Zap,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const TradePostCard = ({ post, onLike, onTradeRequest }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [avatarError, setAvatarError] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && post.images.length > 1) {
      nextImage();
    }
    if (isRightSwipe && post.images.length > 1) {
      prevImage();
    }
  };

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
    <div className="group relative bg-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-300">
      {/* Main Content */}
      <div className="relative">
        {/* Image Section */}
        <div
          className="relative h-64 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={post.images[currentImageIndex]}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 border-b border-gray-300"
          />

          {/* Navigation Arrows */}
          {post.images.length > 1 && (
            <>
              {/* Previous Arrow */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-navy-900 p-2.5 rounded-full transition-all duration-300 opacity-80 hover:scale-110 border border-gray-300 z-10 shadow"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Arrow */}
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-navy-900 p-2.5 rounded-full transition-all duration-300 opacity-80 hover:scale-110 border border-gray-300 z-10 shadow"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full border border-gray-300">
              {post.category}
            </span>
          </div>

          {/* Image Counter */}
          {post.images.length > 1 && (
            <div className="absolute top-4 right-4">
              <div className="bg-navy-900 text-white px-2 py-1 rounded-full text-xs font-medium border border-gray-300">
                {currentImageIndex + 1}/{post.images.length}
              </div>
            </div>
          )}

          {/* User Info Overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div className="relative">
              {post.postedBy && post.postedBy.avatar && !avatarError ? (
                <img
                  src={post.postedBy.avatar}
                  alt={post.postedBy.username}
                  onError={() => setAvatarError(true)}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                  {post.postedBy && post.postedBy.username
                    ? post.postedBy.username.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
              {post.postedBy && post.postedBy.verified && (
                <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-navy-900 bg-white rounded-full border border-gray-300" />
              )}
            </div>
            <div>
              <p className="text-navy-900 font-semibold text-sm">
                @{post.postedBy.username}
              </p>
              <div className="flex items-center gap-2 text-gray-700 text-xs">
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

          {/* Image Indicators */}
          {post.images.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-1">
              {post.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-navy-900 scale-125"
                      : "bg-gray-400 hover:bg-navy-900"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-navy-900 mb-2 line-clamp-2 group-hover:text-navy-700 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-700 text-sm line-clamp-2 mb-4">
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
                <span className="text-sm font-medium text-gray-700">
                  {post.likes}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  {post.comments}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  {post.tradeRequests}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onLike(post.id)}
              className={`cursor-pointer flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                post.isLiked
                  ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                  : "bg-white text-navy-900 border border-gray-300 hover:bg-gray-200"
              }`}
            >
              {post.isLiked ? "Liked" : "Like"}
            </button>

            <button
              onClick={handleTradeRequestClick}
              className="flex-1 py-2.5 px-4 rounded-xl bg-navy-900 text-gray-700 cursor-pointer font-medium text-sm hover:bg-navy-700 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300 shadow"
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
