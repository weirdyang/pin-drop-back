const debug = require('debug')('app:pin.controller');
const { validationResult } = require('express-validator');
const { errorFormatter, handleError } = require('../formatters');
const Pin = require('../models/pin');
const HttpError = require('../models/http-error');
// CREATE PIN
const createPin = async (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    debug(result);
    debug(result.errors);
    return next(new HttpError('Invalid inputs', 422, result.array()));
  }
  if (req.body.key !== process.env.KEY) {
    return next(new HttpError('Invalid key', 403));
  }
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    return res.status(200).json(savedPin);
  } catch (error) {
    debug(error);
    return handleError(error, next);
  }
};
const getUtcShortDate = () => {
  const current = new Date();
  const day = current.getUTCDate();
  const month = current.getUTCMonth() + 1;
  const year = current.getUTCFullYear();
  return new Date(`${month}/${day}/${year}`).toDateString();
};
// GET ALL PINS
const getPins = async (req, res) => {
  try {
    const pins = await Pin.find(
      {
        to: {
          $gte: `${getUtcShortDate()}`,
        },
      },
    );
    return res.status(200).json(pins);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createPin,
  getPins,
};
