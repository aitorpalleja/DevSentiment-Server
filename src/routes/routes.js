import Express from "express";
const router = Express.Router();

import { getAndInsertJavascriptTweets } from "../controllers/javascriptController.js";
import { getAndInsertPythonTweets } from "../controllers/pythonController.js";
import { getAndInsertTypescriptTweets } from "../controllers/typescriptController.js";
import { getAndInsertJavaTweets } from "../controllers/javaController.js";
import { getAndInsertPHPTweets } from "../controllers/phpController.js";
import { getAndInsertSwiftTweets } from "../controllers/swiftController.js";
import { getAndInsertKotlinTweets } from "../controllers/kotlinController.js";
import { getAndInsertGoTweets } from "../controllers/goController.js";
import { getAndInsertRubyTweets } from "../controllers/rubyController.js";
import { getAndInsertRustTweets } from "../controllers/rustController.js";
import { getAndInsertSolidityTweets } from "../controllers/solidityController.js";
import { getAndInsertDartTweets } from "../controllers/dartController.js";
import { getAndInsertPerlTweets } from "../controllers/perlController.js";
import { getAndInsertCSharpTweets } from "../controllers/cSharpController.js";


import { getStats } from "../controllers/getStats.js";
import { getSpamCount } from "../controllers/getSpamCount.js";
import { getJobOfferCount } from "../controllers/getJobOfferCount.js";



router.get('/', (req, res) => {
  res.send('We are working fine');
});

router.get('/getAndInsertJavascriptTweets', (req, res) => {
  getAndInsertJavascriptTweets()
});

router.get('/getAndInsertPythonTweets', (req, res) => {
  getAndInsertPythonTweets()
});

router.get('/getAndInsertTypescriptTweets', (req, res) => {
  getAndInsertTypescriptTweets()
});

router.get('/getAndInsertJavaTweets', (req, res) => {
  getAndInsertJavaTweets()
});

router.get('/getAndInsertPHPTweets', (req, res) => {
  getAndInsertPHPTweets()
});

router.get('/getAndInsertSwiftTweets', (req, res) => {
  getAndInsertSwiftTweets()
});

router.get('/getAndInsertKotlinTweets', (req, res) => {
  getAndInsertKotlinTweets()
});

router.get('/getAndInsertGoTweets', (req, res) => {
  getAndInsertGoTweets()
});

router.get('/getAndInsertRubyTweets', (req, res) => {
  getAndInsertRubyTweets()
});

router.get('/getAndInsertRustTweets', (req, res) => {
  getAndInsertRustTweets()
});

router.get('/getAndInsertSolidityTweets', (req, res) => { 
  getAndInsertSolidityTweets()
});

router.get('/getAndInsertDartTweets', (req, res) => {
  getAndInsertDartTweets()
});


router.get('/getAndInsertPerlTweets', (req, res) => {
  getAndInsertPerlTweets()
});

router.get('/getAndInsertCSharpTweets', (req, res) => {
  getAndInsertCSharpTweets()
});



router.get('/getStats', (req, res) => {
  getStats(req,res)
});

router.get('/getSpamCount', (req, res) => {
  getSpamCount(req,res)
});

router.get('/getJobOfferCount', (req, res) => {
  getJobOfferCount(req,res)
});


export default router;