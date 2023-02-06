import TopicData from '../models/topicStatisticsModel.js'

export const getJobOfferCount = async (req, res) => {
  try {
    const stats = await TopicData.find({}, { topic: 1, jobOffers: 1 }).sort({ jobOffers: -1 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
