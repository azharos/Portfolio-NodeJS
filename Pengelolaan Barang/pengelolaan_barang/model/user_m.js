const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username : String,
    password : String
});

const User = mongoose.model('User', schema);
module.exports = User;