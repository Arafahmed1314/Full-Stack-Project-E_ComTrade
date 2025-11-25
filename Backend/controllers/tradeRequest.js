import TradeRequest from '../models/tradeRequest.js';
import TradePost from '../models/tradePost.js';

// Create a new trade request
const createRequest = async (req, res) => {
    try {
        const { postId, message } = req.body;
        const fromUser = req.userId;
        console.log('CreateRequest called by', fromUser, 'for post', postId);

        if (!postId) return res.status(400).json({ message: 'postId is required' });

        const post = await TradePost.findById(postId).populate('createdBy');
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const toUser = post.createdBy._id.toString();

        // Simple rate-limit: max 5 pending requests from same user to same post per day
        const since = new Date();
        since.setDate(since.getDate() - 1);
        const recentPending = await TradeRequest.countDocuments({
            post: postId,
            fromUser,
            status: 'pending',
            createdAt: { $gte: since }
        });
        if (recentPending >= 5) {
            return res.status(429).json({ message: 'Too many pending requests. Try again later.' });
        }

        const existing = await TradeRequest.findOne({ post: postId, fromUser, status: 'pending' });
        if (existing) return res.status(400).json({ message: 'You already have a pending request for this post' });

        const tr = new TradeRequest({ post: postId, fromUser, toUser, message });
        await tr.save();
        await tr.populate('fromUser', 'name avatar');
        await tr.populate('post', 'title images');

        console.log('Request created', tr._id);
        res.status(201).json({ message: 'Request created', request: tr });
    } catch (error) {
        console.error('Create request error:', error);
        res.status(500).json({ message: 'Error creating request', error: error.message });
    }
};

// Get incoming requests for current user (seller)
const getIncomingRequests = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        // Only return pending incoming requests for the seller
        const requests = await TradeRequest.find({ toUser: req.userId, status: 'pending' })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .populate('fromUser', 'name avatar')
            .populate('post', 'title images');
        const total = await TradeRequest.countDocuments({ toUser: req.userId, status: 'pending' });
        res.json({ requests, pagination: { currentPage: Number(page), totalPages: Math.ceil(total / Number(limit)), total } });
    } catch (error) {
        console.error('Get incoming requests error:', error);
        res.status(500).json({ message: 'Error fetching incoming requests' });
    }
};

// Get outgoing requests for current user (buyer)
const getOutgoingRequests = async (req, res) => {
    try {
        const requests = await TradeRequest.find({ fromUser: req.userId })
            .sort({ createdAt: -1 })
            .populate('toUser', 'name avatar')
            .populate('post', 'title images');
        res.json({ requests });
    } catch (error) {
        console.error('Get outgoing requests error:', error);
        res.status(500).json({ message: 'Error fetching outgoing requests' });
    }
};

// Get pending count for current user
const getPendingCount = async (req, res) => {
    try {
        const pending = await TradeRequest.countDocuments({ toUser: req.userId, status: 'pending' });
        res.json({ pending });
    } catch (error) {
        console.error('Get pending count error:', error);
        res.status(500).json({ message: 'Error fetching pending count' });
    }
};

// Accept a request (only seller can accept)
const acceptRequest = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('AcceptRequest called for', id, 'by', req.userId);
        const reqDoc = await TradeRequest.findById(id).populate('post').populate('fromUser', 'name avatar');
        if (!reqDoc) return res.status(404).json({ message: 'Request not found' });
        if (reqDoc.toUser.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });
        if (reqDoc.status !== 'pending') return res.status(400).json({ message: 'Request already processed' });

        reqDoc.status = 'accepted';
        await reqDoc.save();
        await reqDoc.populate('fromUser', 'name avatar');
        await reqDoc.populate('post', 'title images');

        // TODO: create conversation/chat here in later task
        console.log('Request accepted:', id);
        res.json({ message: 'Request accepted', request: reqDoc, conversationId: null });
    } catch (error) {
        console.error('Accept request error:', error);
        res.status(500).json({ message: 'Error accepting request' });
    }
};

// Decline a request (only seller)
const declineRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const reqDoc = await TradeRequest.findById(id).populate('fromUser', 'name avatar');
        if (!reqDoc) return res.status(404).json({ message: 'Request not found' });
        if (reqDoc.toUser.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });
        if (reqDoc.status !== 'pending') return res.status(400).json({ message: 'Request already processed' });

        reqDoc.status = 'rejected';
        await reqDoc.save();
        res.json({ message: 'Request declined', request: reqDoc });
    } catch (error) {
        console.error('Decline request error:', error);
        res.status(500).json({ message: 'Error declining request' });
    }
};

export { createRequest, getIncomingRequests, getOutgoingRequests, getPendingCount, acceptRequest, declineRequest };
