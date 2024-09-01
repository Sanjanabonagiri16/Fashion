const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);