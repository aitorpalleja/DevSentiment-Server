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
  }
});

const Tweet = Mongoose.model("Tweet", TweetSchema);

export default Tweet;
