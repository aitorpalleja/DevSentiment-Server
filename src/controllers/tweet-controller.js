require('dotenv').config();
const axios = require('axios');

const baseURL = 'https://api.twitter.com/2/tweets/search/recent';

const headers = {
  'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
  'Content-Type': 'application/json'
};

let counter = 0;
let originalCounter = 0;

const getJavaScriptTweets = async (next_token) => {
  const query = {
    "query": "javascript lang:en -\"Essaydue\" -\"paywrite\" -\"essaypay\" -\"homeworkdue\" -\"assignmentdue\" -\"assignment due\" -\"essay pay\" -\"Essay due\" -\"pay write\" -\"Essays\"",    
    "max_results": "100",
    "start_time": (new Date(Date.now() - 24 * 60 * 60 * 1000)).toISOString()
  };

  if (next_token) {
    query.next_token = next_token;
  }

  const response = await axios.get(baseURL, { headers, params: query });
  counter += response.data.data.length;
  console.log(`Received ${counter} tweets`);

  // filter out retweets
  const originalTweets = response.data.data.filter(tweet => !tweet.text.startsWith("RT @"));
  originalCounter += originalTweets.length;
  console.log(`Received ${originalCounter} original tweets`);

  originalTweets.forEach(tweet => console.log(tweet.text));

  if (response.data.meta.next_token) {
    getJavaScriptTweets(response.data.meta.next_token);
  }
}

getJavaScriptTweets();
