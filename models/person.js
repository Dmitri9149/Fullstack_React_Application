const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// eslint-disable-next-line no-undef
const url=process.env.MONGODB_URI

console.log('connecting.to', url)

mongoose.connect(url, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true, useFindAndModify: false, 
        useCreateIndex: true })
    // eslint-disable-next-line no-unused-vars
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error)=> {
        console.log('error connecting to DB: ', error.message)
    })


const personSchema =  new mongoose.Schema({
    name: {
        type:String,
        minlength: 3,
        required: true,
        unique:true
    },
    number: {
        type:String,
        minlength: 8
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)

// eslint-disable-next-line no-unused-vars
const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)