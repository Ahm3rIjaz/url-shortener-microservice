const mongoose = require('mongoose')

const makeid = (length) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result;
}

const shorturlSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: makeid(6)
  },
  original_url: {
    type: String,
    required: true
  }
})

shorturlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.short_url = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('ShortURL', shorturlSchema)