const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://joohui0504:${password}}@cluster-0.ardzd.mongodb.net/regoApp?retryWrites=true&w=majority&appName=Cluster-0`

mongoose.set('strictQuery', false)
mongoose.connect(url)
  
const eventSchema = new mongoose.Schema({
    name: String,
    description: Boolean,
    date: Date
})

const Event = mongoose.model('Event', eventSchema)

Event.find({}).then(result => {
    result.forEach(event => {
        console.log(event)
    })
    mongoose.connection.close()
})
