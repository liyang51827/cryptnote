const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const auth = require('../../middleware/auth');

const Note = require('../../models/Note');

/**
 * @route     [POST] api/message/enc
 * @desc      Post encrypted message
 * @access    Public 
 */

router.post('/enc', async (req, res) => {
  try {
    const initVector = crypto.randomBytes(16);
    const Securitykey = crypto.randomBytes(32);
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    let encryptedData = cipher.update(req.body.message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    
    let Msg = new Note({
      user: req.body.user,
      message: encryptedData,
      secKey: Securitykey,
      initVec: initVector,
      password: req.body.password,
      category: req.body.category,
      expiredIn: req.body.expiredIn,
      numberofviews: req.body.numberofviews,
      ispaid: req.body.ispaid
    });

    const result = await Msg.save();
    let cryptedLink = result._id;
    res.status(200).json(cryptedLink);
  } catch (err) {
    console.log(err);
  }
});

/**
 * @route     [GET] api/message/dec/password/:id
 * @desc      Get password
 * @access    Public 
 */

 router.get('/dec/password/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note !== null) {
        var createdAt = Date.parse(note.createdAt);
        const date = new Date;
        var now = Date.parse(date);
        console.log(now);
        console.log(createdAt);
        if (createdAt + note.expiredIn * 1000 > now) {
          if (note.numberofviews !== 0) {
            let ispassword;
            if (note.password !== '') {
              ispassword = true;
              res.status(200).json(ispassword);
            } else {
              ispassword = false;
              res.status(200).json(ispassword);
            }
          } else {
            if (note.expiredIn !== 2678400) {
              await note.remove();
              res.status(200).json('notExist');
            } else {
              res.status(200).json('notExist');
            }
          }
        } else {
          await note.remove();
          res.status(200).json('notExist');
        }
    } else {
      res.status(200).json('notExist');
    }
  }  catch (err) {
    console.log(err);
    res.status(200).send('notExist');
  }
});

/**
 * @route     [POST] api/message/dec/message
 * @desc      Get decrypted message
 * @access    Public 
 */

router.post('/dec/message', async (req, res) => {
  try {
    const note = await Note.findById(req.body.id);
    if (note !== null) {
        var createdAt = Date.parse(note.createdAt);
        const date = new Date;
        var now = Date.parse(date);
        console.log(now);
        console.log(createdAt);
        if (createdAt + note.expiredIn * 1000 > now) {
          if (note.numberofviews !== 0) {
            if (note.password === '') {
              note.numberofviews--;
              await note.save();
              const decipher = crypto.createDecipheriv(algorithm, note.secKey, note.initVec);
              let decryptedData = decipher.update(note.message, "hex", "utf-8");
              decryptedData += decipher.final("utf8");
              res.status(200).json(decryptedData);
            } else {
              if (note.password === req.body.password) {
                note.numberofviews--;
                await note.save();
                const decipher = crypto.createDecipheriv(algorithm, note.secKey, note.initVec);
                let decryptedData = decipher.update(note.message, "hex", "utf-8");
                decryptedData += decipher.final("utf8");
                res.status(200).json(decryptedData);
              } else {
                return res
                  .status(400)
                  .json({ errors: [{ msg: 'Incorrect password!' }] });
              }
            }
          } else {
            if (note.expiredIn !== 2678400) {
              await note.remove();
              res.status(200).json('notExist');
            } else {
              res.status(200).json('notExist');
            }
          }
        } else {
          await note.remove();
          res.status(200).json('notExist');
        }
    } else {
      res.status(200).json('notExist');
    }
  }  catch (err) {
    console.log(err);
    res.status(200).send('notExist');
  }
});


/**
 * @route     [POST] api/message/user
 * @desc      Get messages list of user
 * @access    Public 
 */
 router.post('/user', auth, async (req, res) => {
  try {
    const messages = await Note
      .find({
        $and: [
          { user: req.user.id },
          { category: 0 }
        ]
      }, { numberofviews: 1, createdAt: 1, expiredIn: 1 }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;