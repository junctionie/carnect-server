const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const participationsController = require('../controllers/participations');

router.post('/', asyncHandler(participationsController.create));
router.get('/:userId', asyncHandler(participationsController.gets));
router.delete('/', participationsController.cancel);

module.exports = router;
