    const { MongoClient } = require('mongodb');

    async function connectToDb() {
      const uri = "mongodb://localhost:27017/doctor-database"; // Replace with your MongoDB URI
      const client = new MongoClient(uri);

      try {
        await client.connect();
        console.log("Connected to MongoDB");
        // You can now access the database and collections
        const db = client.db("yourDatabaseName");
        // ... perform operations
      } finally {
        await client.close();
        console.log("Disconnected from MongoDB");
      }
    }

    connectToDb();