const mongoose = require('mongoose');

// Post Schema
const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        default: ''
    },
    profilePic: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    mediaUrl: {
        type: String,
        default: ''
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            default: ''
        },
        profilePic: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
},
{timestamps: true}
);

// Middleware to update the updatedAt field on save
postSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
