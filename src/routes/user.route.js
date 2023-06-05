const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.controller');
const adminController = require('../controllers/adminController.controller');

/* GET */
router.get('/testsms', userController.testsms);
router.get('/upload', adminController.upload);

/* POST */
router.post('/sendEmail', userController.sendEmail);

// /* PUT */
// router.put('/:id', programmingLanguagesController.update);

// /* DELETE */
// router.delete('/:id', programmingLanguagesController.remove);

module.exports = router;
