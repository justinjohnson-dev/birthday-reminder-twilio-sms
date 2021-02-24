const express = require('express');
const cron = require('node-cron');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const port = process.env.PORT;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const User = require("./models/user");

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
// cron.schedule('* * * * *', function () {
//     User.find().then(user => {
//         console.log(user);
//         client.messages
//             .create({
//                 body: "hello, " + user,
//                 messagingServiceSid: 'MGd15a148e7bc6f6130e81dbccf13652b1',
//                 to: '+17153070876'
//             })
//             .then(message => console.log(message.sid))
//             .done();
//         console.log('Text was successfully sent')
//     });
// });

// use port from environment variables for production
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})