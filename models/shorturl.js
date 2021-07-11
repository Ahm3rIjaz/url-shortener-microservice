const mongoose = require('mongoose')

const shorturlSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 10
  },
  url: {
    type: String,
    required: true
  }
})

shorturlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.original_url = returnedObject._url
    returnedObject.short_url = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('ShortURL', shorturlSchema)