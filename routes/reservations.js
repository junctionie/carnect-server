const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const reservationsController = require('../controllers/reservations');

router.get('/gets', asyncHandler(reservationsController.gets));
router.get('/:userId', asyncHandler(reservationsController.getsReservations));

router.post('/', asyncHandler(reservationsController.create));
router.patch('/:reservationId', asyncHandler(reservationsController.patch));
router.delete('/:reservationId', asyncHandler(reservationsController.remove));

module.exports = router;
