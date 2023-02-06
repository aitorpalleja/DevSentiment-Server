import Express from "express";
const router = Express.Router();

import { getAndInsertJavascriptTweets } from "../controllers/javascriptController.js";
import { getAndInsertPythonTweets } from "../controllers/pythonController.js";





import { getAndInsertReactjsTweets } from "../controllers/reactjsController.js";
import { getAndInsertAngularTweets } from "../controllers/angularController.js";

import { getStats } from "../controllers/getStats.js";



router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/getAndInsertJavascriptTweets', (req, res) => {
  getAndInsertJavascriptTweets()
});

router.get('/getAndInsertPythonTweets', (req, res) => {
  getAndInsertPythonTweets()
});

router.get('/getAndInsertReactjsTweets', (req, res) => {
  getAndInsertReactjsTweets()
});

router.get('/getAndInsertAngularTweets', (req, res) => {
  getAndInsertAngularTweets()
});

router.get('/getStats', (req, res) => {
  getStats(req,res)
});



export default router;