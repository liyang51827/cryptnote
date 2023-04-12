const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const fs = require('fs');
const algorithm = "aes-256-cbc"; 
const download = require('download');
const auth = require('../../middleware/auth');


const Note = require('../../models/Note');

/**
 * @route     [GET] api/file/upload
 * @desc      Upload file to server
 * @access    Public 
 */

router.post("/upload", async (req, res) => {
  console.log('file');
  try {
    if (!req.files) {
      console.log('notuploaded');
      res.status(400).json({
        errors: [{ msg: 'file upload error!' }]
      });
    } else {
      console.log('uploaded');
      let file = req.files.file;
      const initVector = crypto.randomBytes(16);
      const Securitykey = crypto.randomBytes(32);
      const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
      let encryptedData = cipher.update(file.name, "utf-8", "hex");
      encryptedData += cipher.final("hex");
      file.mv("./routes/api/uploads/" + encryptedData);
      
      res.status(200).json({ encryptedData, initVector, Securitykey });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errors: [{ msg: 'file upload error!' }]
    });
  }
});

/**
 * @route     [POST] api/file/enc
 * @desc      Upload file to server
 * @access    Public 
 */

router.post("/enc", async (req, res) => {
  console.log(req.body);
  try {
    let File = new Note({
      user: req.body.user,
      file: req.body.file,
      secKey: req.body.secKey,
      initVec: req.body.initVec,
      password: req.body.password,
      category: req.body.category,
      expiredIn: req.body.expiredIn,
      numberofviews: req.body.numberofviews,
      ispaid: req.body.ispaid
    });
    const result = await File.save();
    let cryptedLink = result._id;
    res.status(200).json(cryptedLink);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errors: [{ msg: 'file info submit error!' }]
    });
  }
});

/**
 * @route     [GET] api/file/dec/password/:id
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
          let ispassword = null;
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
  } catch (err) {
    console.log(err);
    res.status(200).send('notExist');
  }
});

/**
 * @route     [POST] api/file/dec/file
 * @desc      Get decrypted file
 * @access    Public 
 */

router.post('/dec/file', async (req, res) => {
  try {
    const note = await Note.findById(req.body.id);
    if (note !== null) {
      console.log(note);
      var createdAt = Date.parse(note.createdAt);
      const date = new Date;
      var now = Date.parse(date);
      console.log(now);
      console.log(createdAt);
      if (createdAt + note.expiredIn * 1000 > now) {
        if (note.numberofviews !== 0) {
          if (note.password === req.body.password) {
            console.log('correct')
            note.numberofviews--;
            await note.save();
            const decipher = crypto.createDecipheriv(algorithm, note.secKey, note.initVec);
            let decryptedData = decipher.update(note.file, "hex", "utf-8");
            decryptedData += decipher.final("utf8");
            fs.rename(`./routes/api/uploads/${note.file}`, `./routes/api/uploads/${decryptedData}`, (err) => {
              if (err) {
                console.log(err);
                return res.status(400).json({
                  errors: [{ msg: 'Incorrect password!' }]
                });
              }
              console.log('Rename complete!');
              const file = `${__dirname}/uploads/${decryptedData}`;
              let options = {
                headers: {
                  'x-timestamp': Date.now(),
                  'x-sent': true,
                  'filename': decryptedData
                }
              };
              res.sendFile(file, options);
            });

            // TODO
            const renameFunc = () => {
              fs.rename(`./routes/api/uploads/${decryptedData}`, `./routes/api/uploads/${note.file}`, (err) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json({
                    errors: [{ msg: 'Incorrect password!' }]
                  });
                }
                console.log('Rename complete!');
              });              
            }
            setTimeout(renameFunc, 60000);
            // await download(`./uploads/${decryptedData}`, 'dist');
          } else {
            return res.status(400).json({
              errors: [{ msg: 'Incorrect password!' }]
            });
          }
        } else {
          if (note.expiredIn !== 2678400) {
            await fs.unlink(`./routes/api/uploads/${note.file}`);
            await note.remove();
            res.status(200).json('notExist');
          } else {
            res.status(200).json('notExist');
          }
        }
      } else {
        await fs.unlink(`./routes/api/uploads/${note.file}`)
        await note.remove();
        res.status(200).json('notExist');
      }
    } else {
      res.status(200).json('notExist');
    }
  } catch (err) {
    console.log(err);
    res.status(200).send('notExist');
  }
});

/**
 * @route     [POST] api/file/user
 * @desc      Get file list of user
 * @access    Public 
 */
router.post('/user', auth, async (req, res) => {
  try {
    const files = await Note
      .find({
        $and: [
          { user: req.user.id },
          { category: 1 }
        ]
      }, { numberofviews: 1, createdAt: 1, expiredIn: 1 }).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
