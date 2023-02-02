import Express from "express";
const router = Express.Router();

import { getAndInsertJavascriptTweets } from "../controllers/javascriptController.js";
import { getAndInsertReactjsTweets } from "../controllers/reactjsController.js";
import { getAndInsertAngularTweets } from "../controllers/angularController.js";

import { getAllTweets } from "../controllers/getAllTweets.js";



router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/getAndInsertJavascriptTweets', (req, res) => {
  getAndInsertJavascriptTweets()
});

router.get('/getAndInsertReactjsTweets', (req, res) => {
  getAndInsertReactjsTweets()
});

router.get('/getAndInsertAngularTweets', (req, res) => {
  getAndInsertAngularTweets()
});

router.get('/getAllTweets', (req, res) => {
  getAllTweets(req,res)
});



export default router;