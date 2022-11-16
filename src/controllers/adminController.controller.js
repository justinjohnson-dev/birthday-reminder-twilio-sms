const admin = require('../services/admin.service');
require('dotenv').config();

async function upload(req, res, next) {
  try {
    res.json(await admin.uploadContactList());
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}

module.exports = {
  upload,
};
