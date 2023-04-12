const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  message: {
    type: String
  },
  file: {
    type: String
  },
  secKey: {
    type: Buffer,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  initVec: {
    type: Buffer,
    required: true,
    unique: true
  },
  category: {
    type: Number,
    default: 0,
    enum: [
      0,     // plain text
      1,     // file
    ],
    required: true
  },
  expiredIn: {
    type: Number,
    enum: [
      3600,         // 1 hr
      86400,        // 1 day = 24 hrs
      259200,       // 3 days
      604800,       // 1 week = 7 days
      1209600,      // 2 weeks
      2678400       // 1 month = 31 days
    ],
    default: 86400,
    required: true
  },
  numberofviews: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('note', NoteSchema);
