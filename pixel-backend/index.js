const express = require('express');
const cors = require('cors');
const { connectToDb } = require('./server');
const configRoutes = require('./route');

const app = express();
const port = 3001;

// ✅ Apply CORS middleware at the top
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json()); // JSON body parser

async function startServer() {
  try {
    const db = await connectToDb();

    // Attach DB to req
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // API routes
    app.use('/configurations', configRoutes);

    // Test route
    app.get('/', (req, res) => {
      console.log("Root endpoint hit");
      res.send('Hello World!');
    });

    // Start server
    app.listen(port, () => {
      console.log(`✅ App listening on http://localhost:${port}`);
    });

  } catch (err) {
    console.error('❌ Failed to connect to DB', err);
  }
}

startServer();
