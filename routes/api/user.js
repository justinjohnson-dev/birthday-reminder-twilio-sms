// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const express = require("express");
// const router = express.Router();
// const User = require("../../models/user");
// const client = require('twilio')(accountSid, authToken);
// require('dotenv').config();

// router.get("/birthdays/", (req, res) => {
//     getBirthdays();
//     res.send(200);
// });

// async function getBirthdays() {
//     User.find().then(user => {
//         user.forEach((element) => {
//             findBirthdays(element);
//         })
//         res.send(user);
//     });
// }

// async function findBirthdays(user) {
//     let today = new Date();
//     today = today.toString().slice(4, 10)

//     new Promise(function (resolve, reject) {
//         user.birthdays.forEach(async (element) => {
//             let birthday = new Date(element.birthdayDate)
//             birthday = birthday.toString().slice(4, 10)
//             if (birthday == today) {
//                 let res = await sendText(element.birthdayName, user.name, user.phone_number);
//                 resolve(res);
//             } else {
//                 resolve('no birthday was found')
//             }
//         });
//     });
// }

// async function sendText(birthdayName, userName, userPhone) {
//     new Promise(function (resolve, reject) {
//         client.messages
//             .create({
//                 body: "hello! Today is " + birthdayName + " birthday!! the account whom this is sending from is " + userName,
//                 messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
//                 to: userPhone
//             })
//             .then(message => console.log(message.sid))
//             .done();
//         resolve('Text was successfully sent')
//     });
// }


// module.exports = router;