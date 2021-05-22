const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const indexController = require('../controllers/index');

// router.get('/', asyncHandler(indexController.get));
router.post('/', asyncHandler(indexController.login));

module.exports = router;
