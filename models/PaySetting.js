const mongoose = require('mongoose');

const PaySettingSchema = new mongoose.Schema({
  monthly: {
    type: Number,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  },
  publicKey: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('paysettings', PaySettingSchema);
