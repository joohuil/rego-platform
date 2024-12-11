import mongoose from'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {    
	  console.log('connected to MongoDB')
  })
  .catch(error => {
	  console.log('error connecting to MongoDB:', error.message)
  })
  
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  }
})
  
eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Event', eventSchema)