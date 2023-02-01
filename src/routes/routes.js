import Express from "express";
const router = Express.Router();

import { getJavaScriptTweets } from "../controllers/classifiedTweetsController.js";


router.get('/getTweets', getJavaScriptTweets);


export default router;