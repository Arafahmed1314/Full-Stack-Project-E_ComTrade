import Review from '../models/review.js';
import Product from '../models/products.js';

// Add new review
const addReview = async (req, res) => {
    const { productId, rating, comment } = req.body;

    // Validation
    if (!productId || !rating || !comment) {
        return res.status(400).json({ message: "Product ID, rating, and comment are required" });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    try {
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            user: req.user.id,
            product: productId
        });

        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }

        // Create new review
        const review = new Review({
            user: req.user.id,
            product: productId,
            rating,
            comment: comment.trim()
        });

        await review.save();

        // Populate user info for response
        await review.populate('user', 'name avatar');

        res.status(201).json({
            message: "Review added successfully",
            review: {
                id: review._id,
                user: {
                    id: review.user._id,
                    name: review.user.name,
                    avatar: review.user.avatar
                },
                rating: review.rating,
                comment: review.comment,
                helpfulVotes: review.helpfulVotes,
                createdAt: review.createdAt
            }
        });
    } catch (error) {
        console.error('Add review error:', error);
        res.status(500).json({
            message: "Error adding review"
        });
    }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = 'newest' } = req.query;

    try {
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Determine sort order
        let sortOption = { createdAt: -1 }; // newest first
        if (sort === 'oldest') sortOption = { createdAt: 1 };
        if (sort === 'highest') sortOption = { rating: -1 };
        if (sort === 'lowest') sortOption = { rating: 1 };
        if (sort === 'helpful') sortOption = { helpfulVotes: -1 };

        const skip = (page - 1) * limit;

        // Get reviews
        const reviews = await Review.find({ product: productId })
            .populate('user', 'name avatar')
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const totalReviews = await Review.countDocuments({ product: productId });

        // Calculate rating statistics
        const ratingStats = await Review.aggregate([
            { $match: { product: new mongoose.Types.ObjectId(productId) } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 },
                    ratingDistribution: {
                        $push: '$rating'
                    }
                }
            }
        ]);

        // Calculate rating breakdown
        let ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        if (ratingStats.length > 0) {
            ratingStats[0].ratingDistribution.forEach(rating => {
                ratingBreakdown[rating]++;
            });
        }

        res.status(200).json({
            message: "Product reviews retrieved successfully",
            reviews: reviews.map(review => ({
                id: review._id,
                user: {
                    id: review.user._id,
                    name: review.user.name,
                    avatar: review.user.avatar
                },
                rating: review.rating,
                comment: review.comment,
                helpfulVotes: review.helpfulVotes,
                createdAt: review.createdAt
            })),
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalReviews / limit),
                totalReviews,
                hasNextPage: page * limit < totalReviews,
                hasPrevPage: page > 1
            },
            statistics: {
                averageRating: ratingStats.length > 0 ? ratingStats[0].averageRating : 0,
                totalReviews,
                ratingBreakdown
            }
        });
    } catch (error) {
        console.error('Get product reviews error:', error);
        res.status(500).json({
            message: "Error retrieving product reviews"
        });
    }
};

// Get user's reviews
const getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user.id })
            .populate('product', 'title images price category')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "User reviews retrieved successfully",
            reviews: reviews.map(review => ({
                id: review._id,
                product: {
                    id: review.product._id,
                    title: review.product.title,
                    images: review.product.images,
                    price: review.product.price,
                    category: review.product.category
                },
                rating: review.rating,
                comment: review.comment,
                helpfulVotes: review.helpfulVotes,
                createdAt: review.createdAt
            }))
        });
    } catch (error) {
        console.error('Get user reviews error:', error);
        res.status(500).json({
            message: "Error retrieving user reviews"
        });
    }
};

// Update review
const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Validation
    if (!rating || !comment) {
        return res.status(400).json({ message: "Rating and comment are required" });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    try {
        const review = await Review.findOne({
            _id: reviewId,
            user: req.user.id
        });

        if (!review) {
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        review.rating = rating;
        review.comment = comment.trim();
        await review.save();

        res.status(200).json({
            message: "Review updated successfully",
            review: {
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                updatedAt: review.updatedAt
            }
        });
    } catch (error) {
        console.error('Update review error:', error);
        res.status(500).json({
            message: "Error updating review"
        });
    }
};

// Delete review
const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findOneAndDelete({
            _id: reviewId,
            user: req.user.id
        });

        if (!review) {
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        res.status(200).json({
            message: "Review deleted successfully",
            deletedReview: {
                id: review._id,
                productId: review.product
            }
        });
    } catch (error) {
        console.error('Delete review error:', error);
        res.status(500).json({
            message: "Error deleting review"
        });
    }
};



export {
    addReview,
    getProductReviews,
    getUserReviews,
    updateReview,
    deleteReview,

};
