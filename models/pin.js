const mongoose = require('mongoose');
// https://stackoverflow.com/questions/23760253/mongoose-custom-validation-using-2-fields/23760823#23760823
function checkDate(value) {
  return this.from <= value;
}
const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    note: {
      type: String,
      require: false,
      default: '',
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
      default: new Date(),
    },
    to: {
      type: Date,
      min: new Date(new Date().getFullYear(), 0, 1),
      validate: [
        checkDate,
        'from date needs to be less than to date',
      ],
    },
  },
  { timestamps: true },
);

const Pin = mongoose.model('Pin', PinSchema);
module.exports = Pin;
