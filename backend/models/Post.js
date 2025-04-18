const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  createdAt: Date,
});

module.exports = mongoose.model('Post', postSchema);
