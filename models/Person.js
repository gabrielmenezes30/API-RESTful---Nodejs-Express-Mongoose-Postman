import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PersonSchema = Schema({
    name: String,
    salary: Number,
    approved: Boolean
})


const Person = mongoose.model('Person', PersonSchema)

export default Person;

// const Person = mongoose.model('Person', {
//     name: String,
//     salary: Number,

// })
