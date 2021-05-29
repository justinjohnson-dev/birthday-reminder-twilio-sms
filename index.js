const express = require('express');
const cron = require('node-cron');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const User = require("./models/user");
const Admin = require("./models/admin");

// exclusing dotenv config from production
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// DB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('DB Connected'));

// middleware for handling sample api routes
app.use('/api/v1', require('./routes/api/user'));

// create static assets from react code for production only
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// Schedule tasks to be run on the server.
// cron.schedule('00 08 * * *', function () {
//     getBirthdays();
//     sendTest();
// });

cron.schedule('* * * * *', function () {
    getBirthdays(); // fetch birthdays and send messages
    testAdmin();    // fetch and text anybody if an admin message was created
});

async function getBirthdays() {
    let birthdayCount = 0;
    User.find().then(user => {
        user.forEach((element) => {
            findBirthdays(element).then((result) => {
                if (result == 1) {
                    birthdayCount++;
                }
            });
        });
    });

    setTimeout(function () { sendTest(birthdayCount); }, 10000);
}

async function sendAdminText(messageBody, messageTo) {
    // send text to Justin notfifying that an admin text was sent
    new Promise(function (resolve, reject) {
        client.messages
            .create({
                body: messageBody,
                messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
                to: messageTo
            })
            .then(message => console.log(message.sid))
            .done();
        resolve('Text was successfully sent')
    });
}

async function testAdmin() {
    Admin.find().then(adminn => {
        adminn.forEach((user) => {
            let today = new Date();
            today = today.toString().slice(4, 10)

            var mydate = new Date(user.birthdays);
            var dateMatch = mydate.toDateString().includes(today);
            if (dateMatch == true) {
                // send the user the birthday message
                sendAdminText(user.message, user.phone_number);
                // send myself a text to know the admin message has been sent
                let adminMessage = "Admin text message was sent to: " + user.name;
                sendAdminText(adminMessage, "7153070876");
            } else {
                console.log('No admin message for today.')
            }
        })
    });
}

async function findBirthdays(user) {
    let today = new Date();
    let foundBirthday = 0;
    today = today.toString().slice(4, 10)

    new Promise(function (resolve, reject) {
        user.birthdays.forEach(async (element) => {
            let birthday = new Date(element.birthdayDate)
            birthday = birthday.toString().slice(4, 10)
            if (birthday == today) {
                foundBirthday++;
                let res = await sendText(element.birthdayName, user.name, user.phone_number);
                resolve(res);
            } else {
                resolve('no birthday was found')
            }
        });
    });

    return foundBirthday;
}

async function sendText(birthdayName, userName, userPhone) {
    new Promise(function (resolve, reject) {
        client.messages
            .create({
                body: "Good Morning, Today is " + birthdayName + "s birthday! This is your friendly reminder to say Happy Birthday. 🎉🎈",
                messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
                to: userPhone
            })
            .then(message => console.log(message.sid))
            .done();
        resolve('Text was successfully sent')
    });
}

async function sendTest(birthdayCount) {
    new Promise(function (resolve, reject) {
        client.messages
            .create({
                body: "Good Morning JJ, the birthday app has ran and " + birthdayCount + " birthdays were found.",
                messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
                to: '7153070876'
            })
            .then(message => console.log(message.sid))
            .done();
        resolve('Text was successfully sent')
    });
}


// use port from environment variables for production
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})
