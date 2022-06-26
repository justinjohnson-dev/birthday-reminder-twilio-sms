const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const sgMail = require('@sendgrid/mail');
const client = require('twilio')(accountSid, authToken);
require('dotenv').config();
sgMail.setApiKey(process.env.API_KEY);

async function sendTestSms() {
  new Promise(function (resolve, reject) {
    client.messages
      .create({
        body: 'hello! This is a test.',
        messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
        to: '7153070876',
      })
      .then((message) => console.log(message.sid))
      .done();
    resolve('Text was successfully sent');
  });
}

async function sendEmail(send_to, message_subject, message_body, html) {
  new Promise(function (resolve, reject) {
    try {
      const message = {
        to: send_to,
        from: {
          name: 'Twilio Bot',
          email: 'jjustin634@gmail.com',
        },
        subject: message_subject,
        body: message_body,
        html: html,
      };

      sgMail
        .send(message)
        .then((response) => console.log(response))
        .catch((error) => console.log(error.message));
      resolve('Text was successfully sent');
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  sendTestSms,
  sendEmail,
};
