const cohere = require('cohere-ai');
const Bottleneck = require("bottleneck");

cohere.init('74vRrIR19sYnuDw3XnJY1LcFAarw6LCaO3PscInD');

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 600
});

require('dotenv').config();
const axios = require('axios');
const examples = require('./examples');

const baseURL = 'https://api.twitter.com/2/tweets/search/recent';

const headers = {
  'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
  'Content-Type': 'application/json'
};

let counter = 0;
let originalCounter = 0;
let analysisCounter = 0;
const start = Date.now();


const getJavaScriptTweets = async (next_token) => {
  const query = {
    "query": "angular js OR angular programming OR angular library OR angular javascript OR learn angular lang:en -\"Essaydue\" -\"paywrite\" -\"essaypay\" -\"homeworkdue\" -\"assignmentdue\" -\"assignment due\" -\"essay pay\" -\"Essay due\" -\"pay write\" -\"Essays\"",
    "max_results": "100",
    "start_time": (new Date(Date.now() - 24 * 60 * 60 * 1000)).toISOString()
  };

  if (next_token) {
    query.next_token = next_token;
  }

  const response = await axios.get(baseURL, { headers, params: query });
  counter += response.data.data.length;
  //console.log(`Received ${counter} tweets`);

  // filter out retweets
  const originalTweets = response.data.data.filter(tweet => !tweet.text.startsWith("RT @"));
  originalCounter += originalTweets.length;
  //console.log(`Received ${originalCounter} original tweets`);

  //originalTweets.forEach(tweet => console.log(tweet.text));

  originalTweets.forEach(async tweet => {
    await limiter.schedule(async () => {
      const classificationResponse = await cohere.classify({
        model: 'large',
        inputs: [tweet.text],
        examples: examples
      })

      //console.log(`The confidence levels of the labels are ${JSON.stringify(classificationResponse.body.classifications)}`);

      const classifications = classificationResponse.body.classifications;

      if (classifications) {
        const highestConfidenceLabel = classifications.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current);
        console.log(`The highest confidence label for tweet "${tweet.text}" is: ${highestConfidenceLabel.prediction}`);
        analysisCounter++;
        
        const elapsed = (Date.now() - start) / 1000;
        console.log(`Processed tweet ${analysisCounter}. Elapsed time: ${elapsed} seconds.`);

      } else {
        console.error(`No classifications received for "${tweet.text}"`);
      }
    });

  });

  if (response.data.meta.next_token) {
    getJavaScriptTweets(response.data.meta.next_token);
  }
}

getJavaScriptTweets();