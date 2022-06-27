const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('adminContacts', adminContactSchema);
