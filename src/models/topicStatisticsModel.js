import Mongoose from "mongoose";

const topicDataSchema = new Mongoose.Schema({
    topic: {
      type: String,
      required: true
    },
    positiveTweets: {
      type: Number,
      default: 0
    },
    negativeTweets: {
      type: Number,
      default: 0
    },
    totalTweets: {
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
    },
    jobOffers: {
      type: Number,
      default: 0
    },
    spamTweets: {
      type: Number,
      default: 0
    }
  });
  
  const TopicData = Mongoose.model('TopicData', topicDataSchema);

export default TopicData;
