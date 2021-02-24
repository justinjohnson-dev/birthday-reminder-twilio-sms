const express = require("express");
const router = express.Router();
const User = require("../../models/user");


router.get("/birthdays/", (req, res) => {
    User.find().then(user => {
        console.log(user);
        res.send(user);
    });

});


module.exports = router;