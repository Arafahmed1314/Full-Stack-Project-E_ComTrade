// Utility functions for trade functionality

/**
 * Filter and sort posts based on search query, category, and sort criteria
 * @param {Array} posts - Array of trade posts
 * @param {string} searchQuery - Search query string
 * @param {string} selectedCategory - Selected category filter
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Filtered and sorted posts
 */
export const filterAndSortPosts = (posts, searchQuery, selectedCategory, sortBy) => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery) {
        filtered = filtered.filter(
            (post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                )
        );
    }

    // Category filter
    if (selectedCategory !== "All") {
        filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Sort posts
    filtered.sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return new Date(b.timePosted) - new Date(a.timePosted);
            case "oldest":
                return new Date(a.timePosted) - new Date(b.timePosted);
            case "mostLiked":
                return b.likes - a.likes;
            case "mostRequested":
                return b.tradeRequests - a.tradeRequests;
            default:
                return 0;
        }
    });

    return filtered;
};

/**
 * Create a new trade post with default values
 * @param {Object} newPost - New post data from form
 * @returns {Object} Complete post object
 */
export const createNewPost = (newPost) => {
    return {
        ...newPost,
        id: Date.now().toString(),
        timePosted: new Date().toISOString(),
        likes: 0,
        comments: 0,
        tradeRequests: 0,
        isLiked: false,
        postedBy: {
            id: "currentUser",
            username: "current_user",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            verified: true,
        },
    };
};

/**
 * Check if mobile device based on window width
 * @returns {boolean} True if mobile device
 */
export const checkIsMobile = () => {
    // Prefer matchMedia when available (more reliable across emulators)
    if (typeof window !== 'undefined' && window.matchMedia) {
        // Treat medium devices (up to 1023px) as mobile for the trade UI panels
        return window.matchMedia('(max-width: 1023px)').matches;
    }
    return window.innerWidth <= 1023;
};

/**
 * Get unique categories from posts
 * @param {Array} posts - Array of trade posts
 * @returns {Array} Array of unique categories
 */
export const getUniqueCategories = (posts) => {
    return [...new Set(posts.map(post => post.category))];
};

/**
 * Calculate platform statistics
 * @param {Array} posts - Array of trade posts
 * @returns {Object} Statistics object
 */
export const calculateStats = (posts) => {
    return {
        totalPosts: posts.length,
        totalLikes: posts.reduce((sum, post) => sum + post.likes, 0),
        totalRequests: posts.reduce((sum, post) => sum + post.tradeRequests, 0),
        totalComments: posts.reduce((sum, post) => sum + post.comments, 0),
        uniqueCategories: getUniqueCategories(posts).length
    };
};

/**
 * Get top active traders
 * @param {Array} posts - Array of trade posts
 * @param {number} limit - Number of traders to return
 * @returns {Array} Array of top traders
 */
export const getTopTraders = (posts, limit = 5) => {
    const traderStats = {};

    posts.forEach(post => {
        const userId = post.postedBy.id;
        if (!traderStats[userId]) {
            traderStats[userId] = {
                ...post.postedBy,
                postCount: 0,
                totalLikes: 0,
                totalRequests: 0
            };
        }
        traderStats[userId].postCount += 1;
        traderStats[userId].totalLikes += post.likes;
        traderStats[userId].totalRequests += post.tradeRequests;
    });

    return Object.values(traderStats)
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, limit);
};

/**
 * Format time since posted
 * @param {string} timePosted - ISO timestamp
 * @returns {string} Formatted time string
 */
export const formatTimeAgo = (timePosted) => {
    const now = new Date();
    const posted = new Date(timePosted);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));

    if (diffInHours < 1) {
        return 'Just now';
    } else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    }
};
