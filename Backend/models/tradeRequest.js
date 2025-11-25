import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const tradeRequestSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: 'TradePost', required: true },
    fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    read: { type: Boolean, default: false },
}, { timestamps: true });

tradeRequestSchema.index({ post: 1 });
tradeRequestSchema.index({ fromUser: 1 });
tradeRequestSchema.index({ toUser: 1 });

const TradeRequest = model('TradeRequest', tradeRequestSchema);

export default TradeRequest;
