const { MongoClient } = require('mongodb');

async function listCollections() {
  const uri = "mongodb://localhost:27017/test_db"; // Replace with your MongoDB URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("doctor-database");
    const collections = await db.listCollections().toArray();

    console.log("Collections in doctor-database:");
    collections.forEach(collection => console.log(collection.name));
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

listCollections();