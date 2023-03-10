import dotenv from "dotenv"
dotenv.config();

import { MongoClient } from 'mongodb';
const mongoClient = new MongoClient(process.env.MONGODB_URL)
const dbCon  = function (app) {
  console.log('Connecting to mongo db...')
    mongoClient.connect(process.env.MONGODB_URL)
        .then((data) => {
          let db = data.db("olist")
          app.locals.db = db;
          console.log('Connected to mongo db')
        })
        .catch((err) => {console.log('could not connect to db ' + err); console.log(err)})    
}

export default dbCon
