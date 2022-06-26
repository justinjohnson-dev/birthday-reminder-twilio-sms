const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.controller');

/* GET programming languages. */
router.get('/testsms', userController.testsms);

/* POST programming language */
router.post('/sendEmail', userController.sendEmail);

// /* PUT programming language */
// router.put('/:id', programmingLanguagesController.update);

// /* DELETE programming language */
// router.delete('/:id', programmingLanguagesController.remove);

module.exports = router;
