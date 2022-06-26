const user = require('../services/user.service');
const Email = require('../models/email');
require('dotenv').config();

async function testsms(req, res, next) {
  try {
    res.json(await user.sendTestSms());
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}

async function sendEmail(req, res, next) {
  const email = new Email(req.body);
  const send_to = email.send_to;
  const message_subject = email.message_subject;
  const message_body = email.message_body;
  const html = email.html;

  try {
    sendEmail(send_to, message_subject, message_body, html);
    res.send('Email sent successfully!');
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  testsms,
  sendEmail,
};
