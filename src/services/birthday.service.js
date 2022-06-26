require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const User = require('../models/user');

async function getBirthdays() {
  let birthdayCount = 0;
  User.find().then((user) => {
    user.forEach((element) => {
      findBirthdays(element).then((result) => {
        if (result != 0) {
          birthdayCount += result;
        }
      });
    });
  });

  // 10 seconds after birthdays were found, text myself how many birthdays were found total
  setTimeout(function () {
    sendAdminText(birthdayCount);
  }, 10000);
}

async function findBirthdays(user) {
  let today = new Date();
  let foundBirthday = 0;
  today = today.toString().slice(4, 10);

  new Promise(function (resolve, reject) {
    user.birthdays.forEach(async (element) => {
      let birthday = new Date(element.birthdayDate);
      birthday = birthday.toString().slice(4, 10);
      if (birthday == today) {
        foundBirthday++;
        let res = await sendText(
          element.birthdayName,
          user.name,
          user.phone_number
        );
        resolve(res);
      } else {
        resolve('no birthday was found');
      }
    });
  });

  return foundBirthday;
}

async function sendAdminText(birthdayCount) {
  new Promise(function (resolve, reject) {
    client.messages
      .create({
        body:
          'Good Morning JJ, Jarvis found ' +
          birthdayCount +
          ' birthdays today.',
        messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
        to: '7153070876',
      })
      .then((message) => console.log(message.sid))
      .done();
    resolve('Text was successfully sent');
  });
}

async function sendText(birthdayName, userName, userPhone) {
  new Promise(function (resolve, reject) {
    client.messages
      .create({
        body:
          'Good Morning, Today is ' +
          birthdayName +
          's birthday! This is your friendly reminder to say Happy Birthday. 🎉🎈',
        messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
        to: userPhone,
      })
      .then((message) => console.log(message.sid))
      .done();
    resolve('Text was successfully sent');
  });
}

module.exports = {
  getBirthdays,
};
