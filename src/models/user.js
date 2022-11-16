const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
    },
    birthdays: {
        type: Array
    }
});

module.exports = mongoose.model('user', userSchema);