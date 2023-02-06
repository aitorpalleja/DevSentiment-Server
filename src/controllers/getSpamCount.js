import TopicData from '../models/topicStatisticsModel.js'

export const getSpamCount = async (req, res) => {
  try {
    const stats = await TopicData.find({}, { topic: 1, spamTweets: 1 }).sort({ spamTweets: -1 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
