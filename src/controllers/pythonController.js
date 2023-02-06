import Tweet from '../models/tweetModel.js'
import Topic from '../models/topicStatisticsModel.js'

import axios from 'axios';
import Bottleneck from "bottleneck";
import cohere from 'cohere-ai';
import examples from '../examples.js';
import dotenv from 'dotenv';


dotenv.config();

const apiKey = process.env.COHERE_API_KEY;
const bearerToken = process.env.TWITTER_API_BEARER_TOKEN;

cohere.init("74vRrIR19sYnuDw3XnJY1LcFAarw6LCaO3PscInD");

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 600
});

const baseURL = 'https://api.twitter.com/2/tweets/search/recent';

const headers = {
  'Authorization': `Bearer AAAAAAAAAAAAAAAAAAAAAGiHlgEAAAAAADeHbwAltl%2F5jPMAks5qOlru%2B%2Fs%3DMXSZiZeCXiDFo86tRxDhu7LLDisv9xfEQV0zheaYR7fHVfdMT6`,
  'Content-Type': 'application/json'
};

let counter = 0;
let originalCounter = 0;
let analysisCounter = 0;
const start = Date.now();

export const getAndInsertPythonTweets = async (next_token) => {
  const query = {
    "query": "python lang:en -\"Essaydue\" -\"paywrite\" -\"essaypay\" -\"homeworkdue\" -\"assignmentdue\" -\"assignment due\" -\"essay pay\" -\"Essay due\" -\"pay write\" -\"Essays\"",
    "max_results": "100",
    "start_time": (new Date(Date.now() - 24 * 60 * 60 * 1000)).toISOString()
  };

  if (next_token) {
    query.next_token = next_token;
  }

  const response = await axios.get(baseURL, { headers, params: query });
  counter += response.data.data.length;

  // filter out retweets

  const originalTweets = response.data.data.filter(tweet => !tweet.text.startsWith("RT @"));
  originalCounter += originalTweets.length;

  originalTweets.forEach(async tweet => {
    await limiter.schedule(async () => {
      const classificationResponse = await cohere.classify({
        model: 'large',
        inputs: [tweet.text],
        examples: examples
      });

      const classifications = classificationResponse.body.classifications;

      if (classifications) {
        const highestConfidenceLabel = classifications.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current);
        console.log(`The highest confidence label for tweet "${tweet.text}" is: ${highestConfidenceLabel.prediction}`);
        analysisCounter++;

        const elapsed = (Date.now() - start) / 1000;
        console.log(`Processed tweet ${analysisCounter}. Elapsed time: ${elapsed} seconds.`);

        const tweetData = new Tweet({
          text: tweet.text,
          classification: highestConfidenceLabel.prediction,
          topic: "Python",
        });

        const topicData = new Topic({
          topic: "Python",
          positivetweets: 0,
          negativetweets: 0,
          totalTweets: 1,
          positivePercent: 0,
          negativePercent: 0,
          jobOffers: 0,
          spamTweets: 0,

        });


        const topicInDb = await Topic.findOne({ topic: "Python" });
        if (topicInDb) {
          if (highestConfidenceLabel.prediction != 'Spam') {
            topicInDb.totalTweets++;
          }
          if (highestConfidenceLabel.prediction === 'Positive') {
            topicInDb.positiveTweets++;
          } else if (highestConfidenceLabel.prediction === 'Negative') {
            topicInDb.negativeTweets++;
          } else if (highestConfidenceLabel.prediction === 'Job Offers') {
            topicInDb.jobOffers++;
            topicInDb.positiveTweets++;
          } else if (highestConfidenceLabel.prediction === 'Spam') {
            topicInDb.spamTweets++;
          }
          topicInDb.positivePercent = ((topicInDb.positiveTweets / topicInDb.totalTweets) * 100).toFixed(1);
          topicInDb.negativePercent = ((topicInDb.negativeTweets / topicInDb.totalTweets) * 100).toFixed(1);

          await topicInDb.save();
        } else {
          await topicData.save();
        }

        await tweetData.save();

      } else {
        console.error(`No classifications received for "${tweet.text}"`);
      }
    });
  });

  if (response.data.meta.next_token) {
    getAndInsertPythonTweets(response.data.meta.next_token);
  }
}

