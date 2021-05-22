const { createParticipation } = require('../query/participations');
const { StatusCodes } = require('http-status-codes');
const {
  isDuplicatedParticipation,
  isDuplicatedReservation,
} = require('./reservations');

const { findAllReservationByParticipation } = require('../query/reservations');

const joinReservation = async (reservation) => {
  const { userId, startDate, endDate } = reservation;
  if (await isDuplicatedParticipation(userId, startDate, endDate)) {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: '겹치는 일정이 존재합니다.',
    };
  }

  if (await isDuplicatedReservation(userId, startDate, endDate)) {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: '겹치는 예약이 존재합니다.',
    };
  }
  const { reservationId } = reservation;
  const result = await createParticipation({ userId, reservationId });
  return result;
};

const getMyParticipations = async (userId) => {
  const result = await findAllReservationByParticipation(userId);
  return result;
};

module.exports = { joinReservation, getMyParticipations };
