const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: String,
    name: String,
    password: String,
    created_at: String,
    updated_at: String
})

const User = mongoose.model('User', userSchema)

module.exports = User;
