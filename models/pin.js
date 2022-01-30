const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    note: {
      type: String,
      require: false,
      default: 'No note',
      min: 5,
    },
    lat: {
      type: Number,
      require: true,
    },
    long: {
      type: Number,
      require: true,
    },
    from: {
      type: Date,
      min: new Date(new Date().getFullYear(), 0, 1),
      required: true,
      default: Date.now,
    },
    to: {
      type: Date,
      min: new Date(new Date().getFullYear(), 0, 1),
      validate: [
        function checkDate(value) {
          return this.from <= value;
        },
      ],
    },
  },
  { timestamps: true },
);
const Pin = mongoose.model('Pin', PinSchema);
module.exports = Pin;
