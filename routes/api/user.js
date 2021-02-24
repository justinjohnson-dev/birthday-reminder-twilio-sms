const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const client = require('twilio')(accountSid, authToken);
require('dotenv').config();

router.get("/birthdays/", (req, res) => {
    User.find().then(user => {
        user.forEach((element) => {
            console.log('element by iter')
            findBirthdays(element);
        })
        res.send(user);
    });
});

async function sendText() {
    new Promise(function (resolve, reject) {
        client.messages
            .create({
                body: "hello!",
                messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
                to: '+17153070876'
            })
            .then(message => console.log(message.sid))
            .done();
        resolve('Text was successfully sent')
    });
}

async function findBirthdays(user) {

    let today = new Date();
    today = today.toString().slice(4, 10)

    new Promise(function (resolve, reject) {
        user.birthdays.forEach(async (element) => {
            let birthday = new Date(element.birthdayDate)
            birthday = birthday.toString().slice(4, 10)

            console.log(today)
            console.log(birthday)
            if (birthday == today) {
                let res = await sendText();
                resolve(res);
            } else {
                resolve('no birthday was found')
            }
        });
    });
}

module.exports = router;