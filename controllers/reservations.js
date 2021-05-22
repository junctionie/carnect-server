const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const {
  reservationVehicle,
  getReservations,
  updateReservation,
  cancelReservation,
} = require('../service/reservations');

const create = async (req, res, next) => {
  const result = await reservationVehicle(req.body);
  return res.status(StatusCodes.OK).json(result);
};

const gets = async (req, res, next) => {
  console.log('hi')
  const result = await getReservations();
  return res.status(StatusCodes.OK).json(result);
};

const patch = async (req, res, next) => {
  const { reservationId } = req.params;

  await updateReservation(reservationId, req.body);
  return res.redirect(StatusCodes.SEE_OTHER, '/reservations');
};

const remove = async (req, res, next) => {
  const { reservationId } = req.params;
  const { userId } = req.body;
  const result = await cancelReservation(userId, reservationId);
  return res.status(StatusCodes.OK).json(result);
};

module.exports = { create, gets, patch, remove };
