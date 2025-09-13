//import { MongoClient } from "mongodb";
//
// export async function connectToDb() {
//    const uri = "mongodb://localhost:27017/test-db"; // Replace with your MongoDB URI
//    const client = new MongoClient(uri);
//
//    try {
//      await client.connect();
//      console.log("Connected to MongoDB");
//      // You can now access the database and collections
//      const db = client.db("doctor-database");
//      // ... perform operations
//      return db;
//    } finally {
//      // await client.close();
//      console.log("Connect is running");
//    }
//  }

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/test-db'; // Replace with your MongoDB connection string

let db;

async function connectToDb() {
  if (!db) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('doctor-database'); // Replace with your database name
    console.log('Connected to MongoDB');
  }
  return db;
}

module.exports = { connectToDb };