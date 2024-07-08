import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/car_rental");

client
  .connect()
  .then(() => {
    console.log("connected successfully ");
  })
  .catch(() => {
    console.log("error in database");
  });

const runDB = client.db("car_rental");



export default runDB;
