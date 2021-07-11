const shorturlRouter = require('express').Router()
const ShortURL = require('../models/shorturl')
const dns = require('dns')

shorturlRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const shorturl = await ShortURL.findById(id)
    response.redirect(shorturl.original_url)
  } catch (error) {
    console.log(error)
  }
})

shorturlRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    url = new URL(body.original_url)
    dns.lookup(url.hostname, (err) => {
      if (err) {
        console.log(err)
        response.status(400).json({ error: 'invalid url' })
      }
    })
    const shorturl = new ShortURL(body)
    const savedUrl = await shorturl.save()
    response.status(201).json(savedUrl)
  } catch (error) {
    console.log(error)
    response.status(400).json({ error: 'invalid url' })
  }
})

module.exports = shorturlRouter