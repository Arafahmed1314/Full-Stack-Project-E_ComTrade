import TradePost from '../models/tradePost.js';

// Create a new trade post
const createPost = async (req, res) => {
    try {
        const { title, description, images = [], category, tags = [], location } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const post = new TradePost({
            title,
            description,
            images,
            category,
            tags,
            location,
            createdBy: req.userId
        });

        await post.save();

        await post.populate('createdBy', 'name email avatar');

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ message: 'Error creating post' });
    }
};

// Get all posts with optional filters and pagination
const getAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, search, tag } = req.query;
        const filter = { isActive: true };
        if (category) filter.category = { $regex: category, $options: 'i' };
        if (tag) filter.tags = { $regex: tag, $options: 'i' };
        if (search) filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];

        const skip = (Number(page) - 1) * Number(limit);

        const posts = await TradePost.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .populate('createdBy', 'name avatar');

        const total = await TradePost.countDocuments(filter);

        res.json({ posts, pagination: { currentPage: Number(page), totalPages: Math.ceil(total / Number(limit)), total } });
    } catch (error) {
        console.error('Get all posts error:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

// Get posts created by the authenticated user
const getUserPosts = async (req, res) => {
    try {
        const posts = await TradePost.find({ createdBy: req.userId }).sort({ createdAt: -1 });
        res.json({ posts });
    } catch (error) {
        console.error('Get user posts error:', error);
        res.status(500).json({ message: 'Error fetching user posts' });
    }
};

// Get a single post by id
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await TradePost.findById(id).populate('createdBy', 'name avatar');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        console.error('Get post by id error:', error);
        res.status(500).json({ message: 'Error fetching post' });
    }
};

// Delete a post (only owner can delete)
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await TradePost.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }
        await TradePost.findByIdAndDelete(id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
};

export { createPost, getAllPosts, getUserPosts, getPostById, deletePost };
