const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const shorturlRouter = require('./controllers/shorturls')

const app = express()

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use('/api/shorturl', shorturlRouter)

app.get('/', (request, response) => {
  response.sendFile(process.cwd() + '/views/index.html');
})

module.exports = app