const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const client = require('twilio')(accountSid, authToken);
require('dotenv').config();

router.post("/birthdays", (req, res, next) => {
    console.log(req.body);
    res.send(200);
});


async function sendText(birthdayName, userName, userPhone) {
    new Promise(function (resolve, reject) {
        client.messages
            .create({
                body: "hello! Today is " + birthdayName + " birthday!! the account whom this is sending from is " + userName,
                messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
                to: userPhone
            })
            .then(message => console.log(message.sid))
            .done();
        resolve('Text was successfully sent')
    });
}


module.exports = router;