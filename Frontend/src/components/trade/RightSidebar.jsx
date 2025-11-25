import React, { useState } from "react";
import { Search, Filter, TrendingUp } from "lucide-react";

const ActiveTrader = ({ post }) => {
  const [avatarError, setAvatarError] = useState(false);
  const user = post.postedBy || {};
  const initial = user.username ? user.username.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex items-center gap-3">
      {user.avatar && !avatarError ? (
        <img
          src={user.avatar}
          alt={user.username}
          onError={() => setAvatarError(true)}
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
          {initial}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user.username}
        </p>
        <p className="text-xs text-gray-500">{post.category}</p>
      </div>
    </div>
  );
};

const RightSidebar = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  posts,
  categories,
}) => {
  return (
    <div className="hidden lg:block w-80 border-l pb-12 border-gray-200 bg-white">
      <div className="h-full flex flex-col">
        {/* Fixed Header Section */}
        <div className="p-4 border-b border-gray-200 bg-white">
          {/* Search - Desktop */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search trades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-full p-2 rounded-lg border transition-colors ${
              showFilters
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            } flex items-center justify-center gap-2`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          <div className="space-y-4">
            {/* Trending Categories */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Trending Categories
              </h3>
              <div className="space-y-2">
                {categories.slice(0, 5).map((category) => (
                  <div
                    key={category}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-600">{category}</span>
                    <span className="text-indigo-600 font-medium">
                      {posts.filter((p) => p.category === category).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Traders */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Active Traders
              </h3>
              <div className="space-y-3">
                {posts.slice(0, 3).map((post) => (
                  <ActiveTrader key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Platform Stats
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-indigo-600">
                    {posts.length}
                  </div>
                  <div className="text-xs text-gray-500">Total Posts</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {posts.reduce((sum, post) => sum + post.tradeRequests, 0)}
                  </div>
                  <div className="text-xs text-gray-500">Trade Requests</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-900 line-clamp-2">{post.title}</p>
                      <p className="text-gray-500 text-xs">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "electronics",
                  "vintage",
                  "books",
                  "gaming",
                  "fashion",
                  "art",
                  "music",
                  "sports",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white text-gray-600 text-xs rounded-full border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Trading Tips</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  💡 Always meet in public places for exchanges
                </div>
                <div className="text-sm text-gray-600">
                  🔍 Check item condition before trading
                </div>
                <div className="text-sm text-gray-600">
                  📱 Use our messaging system for communication
                </div>
                <div className="text-sm text-gray-600">
                  ⭐ Rate your trading partners
                </div>
              </div>
            </div>

            {/* Featured Trades */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Featured Trades
              </h3>
              <div className="space-y-3">
                {posts.slice(0, 2).map((post) => (
                  <div key={post.id} className="bg-white rounded-lg p-3 border">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={post.images[0]}
                        alt={post.title}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-500">{post.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
