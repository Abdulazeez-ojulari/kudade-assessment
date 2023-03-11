import dotenv from "dotenv"
dotenv.config();

import { MongoClient } from 'mongodb';
const mongoClient = new MongoClient(process.env.MONGODB_URL)
const dbCon  = async function (app) {
  console.log('Connecting to mongo db...')
    let data = await mongoClient.connect(process.env.MONGODB_URL)

    if(data){
      let db = data.db("olist")
      app.locals.db = db;
      console.log('Connected to mongo db')
    }else{
      console.log('could not connect to db ' + data);
    }    
}

export default dbCon
