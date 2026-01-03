const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      match: [/^\d{10}$|^\+\d{1,3}\d{9,14}$/, 'Please provide a valid phone number'],
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
