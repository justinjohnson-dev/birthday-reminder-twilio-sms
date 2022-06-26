require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const User = require('../models/user');
const fs = require('fs');

async function sendMessageToJustinsContacts() {
  User.find().then((user) => {
    user.forEach((element) => {
      if (element.phone_number == 7153070876) {
        findAdminTextBirthdays(element).then((result) => {
          if (result == 1) {
            birthdayCount++;
          }
        });
      }
    });
  });
}

async function findAdminTextBirthdays(user) {
  let today = new Date();
  let sentBirthday = [];

  today = today.toString().slice(4, 10);

  new Promise(function (resolve, reject) {
    user.birthdays.forEach(async (element) => {
      let birthday = new Date(element.birthdayDate);
      birthday = birthday.toString().slice(4, 10);

      if (birthday == today) {
        sentBirthday.push(element.birthdayName);
        try {
          const jsonString = fs.readFileSync('./src/services/birthdays.json');
          const birthdays = JSON.parse(jsonString);

          let res = await sendAdminTextMessage(
            element.birthdayName,
            user.name,
            birthdays[element.birthdayName]
          );
          resolve(res);
        } catch (err) {
          console.log(err);
          return;
        }
      } else {
        resolve('no birthday was found');
      }
    });
  });

  await sendTextToJustinNotifyingWhoJarvisTexted(sentBirthday, 7153070876);
  return sentBirthday;
}

async function sendTextToJustinNotifyingWhoJarvisTexted(
  sentMessageNames,
  phone_number
) {
  new Promise(function (resolve, reject) {
    client.messages
      .create({
        body:
          sentMessageNames.length > 0
            ? 'Jarvis sent text messages today to ' + sentMessageNames
            : 'Jarvis sent no text messages today.',
        messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
        to: phone_number,
      })
      .then((message) => console.log(message.sid))
      .done();
    resolve('Text was successfully sent');
  });
}

async function sendAdminTextMessage(birthdayName, userName, userPhone) {
  new Promise(function (resolve, reject) {
    client.messages
      .create({
        body: `Good Morning! This is Jarvis 🤖 one of Justin's Twilio Bots. I am here to wish you a Happy Birthday! Have a great day. 🎉🎈`,
        messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
        to: userPhone,
      })
      .then((message) => console.log(message.sid))
      .done();
    resolve('Text was successfully sent');
  });
}

module.exports = {
  sendMessageToJustinsContacts,
};
