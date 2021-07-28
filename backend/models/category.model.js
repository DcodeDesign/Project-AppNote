const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = Schema({
    user_id: String,
    titre: String,
    created_at: String,
    updated_at: String
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category;
