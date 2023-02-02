import Tweet from '../models/tweetModel.js'

export const getAllTweets = async (req, res) => {
    try {
      const tweets = await Tweet.find({});
      res.json(tweets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };