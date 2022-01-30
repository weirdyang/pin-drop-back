const express = require('express');
const { check } = require('express-validator');
const { createPin, getPins } = require('../controllers/pins.controller');

const router = express.Router();

const keyCheck = check('key').exists();

const nameCheck = check('username')
  .not()
  .isEmpty()
  .trim()
  .escape();

const noteCheck = check('note')
  .not()
  .isEmpty()
  .trim()
  .escape();

const longCheck = check('long').isNumeric();

const latCheck = check('lat').isNumeric();

const fromCheck = check('from').isISO8601().toDate();

const toCheck = check('to').isISO8601().toDate();

const checks = [nameCheck, longCheck, latCheck, fromCheck, toCheck, keyCheck];

// create new product
router.post('/', checks, createPin);

router.get('/', getPins);

module.exports = router;
