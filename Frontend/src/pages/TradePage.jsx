import React, { useState, useEffect } from "react";
import {
  TradeFeed,
  CreateTradePost,
  TradeFilters,
  MessageInbox,
  TradeHeader,
  RightSidebar,
  MobileFilterSidebar,
} from "../components/trade";
import {
  filterAndSortPosts,
  createNewPost,
  checkIsMobile,
  calculateStats,
} from "../utils/tradeUtils";

// Import mock data
import tradeData from "../data/trade.json";

const TradePage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobileSize = () => {
      setIsMobile(checkIsMobile());
    };

    checkMobileSize();
    window.addEventListener("resize", checkMobileSize);

    // Load mock data
    setPosts(tradeData.tradePosts);
    setFilteredPosts(tradeData.tradePosts);

    return () => window.removeEventListener("resize", checkMobileSize);
  }, []);

  useEffect(() => {
    // Filter and sort posts using utility function
    const filtered = filterAndSortPosts(
      posts,
      searchQuery,
      selectedCategory,
      sortBy
    );
    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory, sortBy]);

  const handleCreatePost = (newPost) => {
    const post = createNewPost(newPost);
    setPosts([post, ...posts]);
    setShowCreatePost(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden pb-12 ">
      {/* Left Sidebar - Messages */}
      {!isMobile && (
        <div className="hidden lg:block w-80 border-r border-gray-200 bg-white h-full">
          <MessageInbox isOpen={true} onClose={() => {}} isMobile={false} />
        </div>
      )}

      {/* Message Inbox - Mobile */}
      <MessageInbox
        isOpen={showMessages && isMobile}
        onClose={() => setShowMessages(false)}
        isMobile={true}
      />

      {/* Mobile Filter Sidebar */}
      <MobileFilterSidebar
        isMobile={isMobile}
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
        categories={tradeData.categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Center Feed Column */}
        <div className="flex-1 max-w-2xl mx-auto flex flex-col">
          {/* Header */}
          <TradeHeader
            showMessages={showMessages}
            setShowMessages={setShowMessages}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
            setShowCreatePost={setShowCreatePost}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
          />

          {/* Scrollable Feed */}
          <div className="flex-1 overflow-y-auto">
            {/* Quick Stats - Compact */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="grid grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-indigo-600">
                    {posts.length}
                  </div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {calculateStats(posts).totalRequests}
                  </div>
                  <div className="text-xs text-gray-500">Requests</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">
                    {calculateStats(posts).totalLikes}
                  </div>
                  <div className="text-xs text-gray-500">Likes</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">
                    {calculateStats(posts).uniqueCategories}
                  </div>
                  <div className="text-xs text-gray-500">Categories</div>
                </div>
              </div>
            </div>

            {/* Filters - Desktop Only */}
            {showFilters && !isMobile && (
              <div className="bg-white border-b border-gray-200 p-4">
                <TradeFilters
                  categories={tradeData.categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>
            )}

            {/* Trade Feed */}
            <div className="p-4 space-y-4">
              <TradeFeed posts={filteredPosts} setPosts={setPosts} />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Suggestions/Trending */}
        <RightSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          posts={posts}
          categories={tradeData.categories}
        />
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreateTradePost
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
          categories={tradeData.categories}
        />
      )}
    </div>
  );
};

export default TradePage;
