const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Not enought arguments. exit!')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://full_stack:${password}@cluster0.2m41j.mongodb.net/full_stack?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number:String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  Person.find({}).then(result => {
    result.forEach(person =>{
      console.log(person)
      mongoose.connection.close()
    })
  })
}

const person = new Person({})
person.name=process.argv[3]
person.number=process.argv[4]

person.save().then(result => {
  console.log(`added person ${process.argv[3]} number ${process.argv[4]} to the phonebook`)
  mongoose.connection.close()
})