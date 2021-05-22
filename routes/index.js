const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const exampleValidator = require('../middlewares/Validator');
const exampleControler = require('../controllers/template');

router.get('/', exampleValidator, asyncHandler(exampleControler.template));

module.exports = router;
