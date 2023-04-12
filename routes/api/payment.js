const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Payment = require('../../models/Payment');

/**
 * @route     GET api/payment
 * @desc      Get payment log
 * @access    Private
 */
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route     POST api/payment/user
 * @desc      Post payment log
 * @access    Private
 */
 router.post('/user', async (req, res) => {
  try {
    const payments = await Payment.find({ email: req.body.email }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route     POST api/payment
 * @desc      add payment log
 * @access    Private
 */
router.post('/', async (req, res) => {
  try {
    const payment = new Payment({
      name: req.body.name,
      email: req.body.email,
      method: req.body.method,
      amount: req.body.amount,
      from: req.body.from,
      to: req.body.to,
      license: req.body.license,
    });

    const result = await payment.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

/**
 * @route     POST api/payment/license
 * @desc      add payment license
 * @access    Private
 */
router.post('/addlicense', async (req, res) => {
  try {
    const result = await Payment.findById(req.body.id);
    result.license = req.body.license;
    await result.save();
    res.status(200).json(result.license);
  } catch (error) {
    console.log(error);
  }
});

/**
 * @route     POST api/payment/license
 * @desc      remove payment license
 * @access    Private
 */
router.post('/removelicense', async (req, res) => {
  try {
    const result = await Payment.findById(req.body.id);
    result.license = 'expired';
    await result.save();
    res.status(200).json(result.license);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router