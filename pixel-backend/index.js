const express = require('express')
const { connectToDb } = require('./server')
const configRoutes = require('./route')

const app = express()
const port = 3000

app.use(express.json()) // JSON body parsing middleware

async function startServer() {
  try {
    const db = await connectToDb()

    // pass db to routes as middleware or using app locals
    app.use((req, res, next) => {
      req.db = db
      next()
    })

    // use the config routes under /configurations path
    app.use('/configurations', configRoutes)

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  } catch (err) {
    console.error('Failed to connect to DB', err)
  }
}

startServer()
