const shorturlRouter = require('express').Router()
const ShortURL = require('../models/shorturl')
const dns = require('dns')

const makeid = (length) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result;
}

shorturlRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const shorturl = await ShortURL.findById(id)
    response.redirect(shorturl.url)
  } catch (error) {
    console.log(error)
  }
})

shorturlRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    console.log('body', body)
    const httpregex = /^(http|https)(:\/\/)/
    if (!httpregex.test(body.url)) {
      return response.status(400).json({ error: 'invalid url' })
    }
    url = new URL(body.url)
    dns.lookup(url.hostname, (err) => {
      if (err) {
        console.log(err)
        response.status(400).json({ error: 'invalid url' })
      }
    })
    if (!body._id) {
      body._id = makeid(6)
    }
    const shorturl = new ShortURL(body)
    const savedUrl = await shorturl.save()
    response.status(201).json(savedUrl)
  } catch (error) {
    console.log(error)
    response.status(400).json({ error: 'invalid url' })
  }
})

module.exports = shorturlRouter