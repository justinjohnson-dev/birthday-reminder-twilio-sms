const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Email = require("../../models/email");
const sgMail = require('@sendgrid/mail');
const client = require('twilio')(accountSid, authToken);
require('dotenv').config();
sgMail.setApiKey(process.env.API_KEY);


router.get("/testsms", (req, res) => {
    try {
        sendText();
        res.sendStatus(status)
    } catch (err) {
        res.send(err);
    }
});

router.post("/sendEmail", (req, res) => {
    let email = new Email(req.body);
    let send_to = email.send_to;
    let message_subject = email.message_subject;
    let message_body = email.message_body;
    let html = email.html;

    try {
        sendEmail(send_to, message_subject, message_body, html);
        res.send("Email sent successfully!");
    } catch (err) {
        res.send(err);
    }
});

function sendEmail(send_to, message_subject, message_body, html) {
    new Promise(function (resolve, reject) {
        try {
            const message = {
                to: send_to,
                from: {
                    name: 'Twilio Bot',
                    email: 'jjustin634@gmail.com'
                },
                subject: message_subject,
                body: message_body,
                html: html
            };

            sgMail.send(message).then((response) => console.log(response)).catch((error) => console.log(error.message));
            resolve('Text was successfully sent');

        } catch (err) {
            reject(err);
        }
    });
}

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