const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const postSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    tags: [String],
    upvotes: { type: Number, default: 0 },
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);