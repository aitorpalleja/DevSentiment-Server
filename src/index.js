import Express from "express";
import Mongoose from "mongoose";
import router from "./routes/routes.js";
import dotenv from 'dotenv'


dotenv.config()

const mongodbRoute = "mongodb+srv://aitor:mxW1aQLqJXOm5doC@tweets.bxz28ki.mongodb.net/?retryWrites=true&w=majority"

const app = Express();
const port = process.env.PORT || 3001;

app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}); 

app.use(router);

app.get('/get-javascript-tweets', (req, res) => {
    getJavaScriptTweets()
      .then(data => res.send(data))
      .catch(error => res.status(500).send(error.message));
  });

const options = {
    socketTimeoutMS: 0,
    keepAlive: true,
    useNewUrlParser: true
};

Mongoose.Promise = global.Promise;
Mongoose.set('strictQuery', false);

Mongoose.connect(mongodbRoute, { useNewUrlParser: true, serverSelectionTimeoutMS: 50000 }, (err) => {
    if (err) {
        return console.log(`Error connecting to the database: ${err}`)
    }
    app.listen(port, () => {
        console.log(`Server up on ${port}`);
    });
    console.log(`Successful connection with Mongo.`)
});
