const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const noteSchema = Schema({
    user_id: String,
    titre: String,
    note: String,
    cat: String,
    created_at: String,
    updated_at: String
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note;
