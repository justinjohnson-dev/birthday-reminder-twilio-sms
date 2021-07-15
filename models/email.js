const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
    send_to: {
        type: String,
        required: true
    },
    message_subject: {
        type: String,
        required: true
    },
    message_body: {
        type: String,
        required: true
    },
    html: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('email', emailSchema);