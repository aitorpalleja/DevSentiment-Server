import Mongoose from "mongoose";

const TweetSchema = new Mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  classification: {
    type: String,
    required: true
  },
  topic: {
  type: String,
  required: true
  },
  positiveCount: {
    type: Number,
    default: 0
  },
  negativeCount: {
    type: Number,
    default: 0
  },
  totalCount: {
    type: Number,
    default: 0
  },
  positivePercent: {
    type: Number,
    default: 0
  },
  negativePercent: {
    type: Number,
    default: 0
  }
});

const Tweet = Mongoose.model("Tweet", TweetSchema);

export default Tweet;
