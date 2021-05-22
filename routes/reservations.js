const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const reservationsController = require('../controllers/reservations');

router.get('/', asyncHandler(reservationsController.get));

module.exports = router;
