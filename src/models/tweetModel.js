import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  sentiment: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  tweetedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  name: {
    type: String,
    required: false
  },
  rtQuantity: {
    type: Number,
    default: 0
  },
  likeQuantity: {
    type: Number,
    default: 0
  },
  tweetId: {
    type: String,
    required: false
  }
});

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
