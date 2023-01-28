require('dotenv').config(); // this line loads the environment variables from the .env file
const axios = require('axios');

const baseURL = 'https://api.twitter.com/2/tweets/search/recent';

const headers = {
  'Authorization': `Bearer ${process.env.BEARER_TOKEN}`, // this is where the bearer token is accessed from the .env file
  'Content-Type': 'application/json'
};

const query = {
  "query": "javascript",
  "max_results": "10"
};

axios.get(baseURL, {headers, params: query})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });