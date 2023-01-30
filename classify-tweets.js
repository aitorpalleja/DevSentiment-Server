const cohere = require('cohere-ai');

cohere.init('74vRrIR19sYnuDw3XnJY1LcFAarw6LCaO3PscInD');

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

  //originalTweets.forEach(tweet => console.log(tweet.text));

  originalTweets.forEach(async tweet => {
    const classificationResponse = await cohere.classify({
      model: 'large',
      inputs: [tweet.text],
      examples: [{ "text": "I like javascript", "label": "Positive" }, { "text": "I love javascript", "label": "Positive" }, { "text": "I\'m learning javascript", "label": "Positive" }, { "text": "Javascript is too difficult, but i\'m triying", "label": "Positive" }, { "text": "I\'m using javascript to my project", "label": "Positive" }, { "text": "Look what i made with javascript!", "label": "Positive" }, { "text": "I don\'t like javascript", "label": "Negative" }, { "text": "I hate javascript", "label": "Negative" }, { "text": "Javascript is too difficult, i don\'t like it", "label": "Negative" }, { "text": "Javascript is too slow", "label": "Negative" }, { "text": "I don't want to lear javascript", "label": "Negative" }, { "text": "Javascript sucks", "label": "Negative" }, { "text": "Websites to practice javaScript:\n\n1. Codewars\nhttps://codewars.com\n\n2. JS challenger\nhttps://jschallenger.com\n\n3. W3resource\nhttps://w3resource.com/javascript-exercises/\n\n4. JS hero\nhttps://jshero.net/en/koans/var.html\n\n5. Edabit\nhttps://edabit.com/practice\n\n6. Exercism\nhttps://exercism.org/tracks/javascript", "label": "Positive" }, { "text": "If it can be done in code, it will be done in JavaScript. https://reddit.com/r/programmerhumor/comments/10hj1m7", "label": "Positive" }]
    })

    //console.log(`The confidence levels of the labels are ${JSON.stringify(classificationResponse.body.classifications)}`);
    
    const classifications = classificationResponse.body.classifications;
    const highestConfidenceLabel = classifications.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current);
  
    console.log(`The highest confidence label is: ${highestConfidenceLabel.prediction}`);

  });



  if (response.data.meta.next_token) {
    getJavaScriptTweets(response.data.meta.next_token);
  }
}

getJavaScriptTweets();
