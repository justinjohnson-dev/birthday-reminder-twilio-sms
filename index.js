const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.get("/", (req, res) => {
    client.messages
        .create({
            body: "Hello, this is the birthday reminder!",
            messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
            to: '+17153070876'
        })
        .then(message => console.log(message.sid))
        .done();
    res.send('Success!');
})


app.listen(port, () => {
    console.log("app is listening on port", port);
})