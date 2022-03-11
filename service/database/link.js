const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const linkSchema = new Schema({
    name: String,
    home: String,
    logo: String,
    describe: String
})
module.exports = mongoose.model('link', linkSchema)