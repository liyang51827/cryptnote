const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  license: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('payment', PaymentSchema);
