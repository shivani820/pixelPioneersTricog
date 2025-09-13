const express = require('express');
const { connectToDb } = require('./server');
const routes = require('./route');

const app = express();
const port = 4000;

app.use(express.json()); // Middleware to parse JSON

async function startServer() {
  try {
    const db = await connectToDb();

    // Pass the database instance to routes
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Use the routes
    app.use('/api', routes);

//    app.get('/', (req, res) => {
//      res.send('Hello World!');
//    });

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB', err);
  }
}

startServer();