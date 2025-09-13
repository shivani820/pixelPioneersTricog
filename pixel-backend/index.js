const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

app.use(bodyParser.json());

app.post('/api/store-input', async (req, res) => {
  try {
    await client.connect();
    const db = client.db("doctor-database");
    const collection = db.collection("inputs");

    const inputData = req.body; // Input from the frontend
    const result = await collection.insertOne(inputData);

    res.status(200).json({ message: "Input stored successfully", id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to store input" });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});