const {
  createParticipation,
  updateOneParticipation,
  findOneParticipationBeforeEndDate,
} = require('../query/participations');
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

const cancelParticipation = async (participationId, userId) => {
  const participation = await findOneParticipationBeforeEndDate(
    Number(participationId),
    Number(userId)
  );
  if (!participation) {
    const message = '마감 3일전에는 취소가 불가능합니다.';
    return { status: StatusCodes.BAD_REQUEST, message };
  }

  return await updateOneParticipation(participationId, userId);
};

module.exports = { joinReservation, getMyParticipations, cancelParticipation };
