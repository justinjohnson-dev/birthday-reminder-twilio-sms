const express = require('express');
const cron = require('node-cron');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const user = require('./src/routes/user.route');
const { getBirthdays } = require('./src/services/birthday.service');
const {
  sendMessageToJustinsContacts,
} = require('./src/services/admin.service');

// exclusing dotenv config from production
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// DB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected'));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({ message: '200' });
});

app.use('/user', user);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

// create static assets from react code for production only
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// use port from environment variables for production
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// Schedule tasks to be run on the server.
cron.schedule('00 08 * * *', function () {
  // currently twilio is down, fixing the issue may take a few weeks for campaign to be approved
  console.log('executed cron job');
  console.log('twilio is down, fixing the issue may take a few weeks for campaign to be approved')

  // getBirthdays(); // fetch birthdays and send messages
  // sendMessageToJustinsContacts();
});

// cron job for testing
// cron.schedule('* * * * *', function () {
//   getBirthdays(); // fetch birthdays and send messages
//   sendMessageToJustinsContacts();
// });
