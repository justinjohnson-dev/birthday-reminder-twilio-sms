const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const client = require('twilio')(accountSid, authToken);
require('dotenv').config();

router.get("/testsms", (req, res, next) => {
    try {
        sendText();
        res.sendStatus(status)
    } catch (err) {
        res.send(err);
    }
});


async function sendText() {
    new Promise(function (resolve, reject) {
        client.messages
            .create({
                body: "hello! This is a test.",
                messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
                to: '7153070876'
            })
            .then(message => console.log(message.sid))
            .done();
        resolve('Text was successfully sent')
    });
}


module.exports = router;