const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  eventName: {
    type: String,
    require: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  description: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.model("events", PostSchema);

module.exports = PostModel;
