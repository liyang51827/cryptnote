const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Note = require('../../models/Note');
const PaySetting = require('../../models/PaySetting');

/**
 * @route     GET api/admin/users
 * @desc      Get users
 * @access    Private
 */
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route     GET api/admin/messages
 * @desc      Get messages log
 * @access    Private
 */
router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await Note.aggregate([
      { $match : {$and: [{ category: 0 }, { numberofviews: { $ne: 0 } }]} },
      { $project: { createdAt: 1, expiredIn: 1, numberofviews: 1 } }
    ]).sort({ createdAt: -1 })
    console.log(messages)
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route     GET api/admin/files
 * @desc      Get files log
 * @access    Private
 */
router.get('/files', async (req, res) => {
  try {
    const files = await Note.aggregate([
      { $match : {$and: [{ category: 1 }, { numberofviews: { $ne: 0 } }]} },
      { $project: { createdAt: 1, expiredIn: 1, numberofviews: 1 } }
    ]).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route     GET api/admin/user
 * @desc      Get user
 * @access    Private
 */
router.get('/user', async (req, res) => {
  try {
    const user = await User.findOne({ role: true }).select({ _id: 0, name: 1, email: 1 });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route     POST api/admin/user
 * @desc      Post user
 * @access    Private
 */
router.post('/user', async (req, res) => {
  try {
    const admin = await User.findOne({ role: true });
    const isMatch = await bcrypt.compare(req.body.oldPwd, admin.password);
    
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Password incorrect!' }] });
    } else {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(req.body.newPwd, salt);
      await admin.save();
      res.status(200).json('success');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route     GET api/admin/paysetting
 * @desc      get paysetting
 * @access    Private
 */
router.get('/paysetting', async (req, res) => {
  try {
    const result = await PaySetting.findOne({});
    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * @route     POST api/admin/paysetting
 * @desc      set paysetting
 * @access    Private
 */
router.post('/paysetting', async (req, res) => {
  try {
    console.log(req.body);
    const result = await PaySetting.findOne({});
    console.log(result)
    if (result) {
      result.monthly = req.body.monthly;
      result.privateKey = req.body.privateKey;
      result.publicKey = req.body.publicKey;
      await result.save();
      console.log(result);
      res.json(result);
    } else {
      const paysetting = new PaySetting({
        monthly: req.body.monthly,
        publicKey: req.body.publicKey,
        privateKey: req.body.privateKey,
      });
      await paysetting.save();
      res.json(paysetting);
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
