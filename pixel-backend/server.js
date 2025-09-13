import { MongoClient } from "mongodb";

 export async function connectToDb() {
    const uri = "mongodb://localhost:27017/test-db"; // Replace with your MongoDB URI
    const client = new MongoClient(uri);

    try {
      await client.connect();
      console.log("Connected to MongoDB");
      // You can now access the database and collections
      const db = client.db("doctor-database");
      // ... perform operations
      const data = await db.collection("configuration").find({}).toArray();
      console.log(data);
    } finally {
      // await client.close();
      console.log("Connect is running");
    }
  }