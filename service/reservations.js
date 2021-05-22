const {
  createReservation,
  findAllReservation,
  updateOneReservation,
  destroyOneReservation,
  findOneReservationByDateTime,
  findOneReservationByParticipation,
  findAllReservationByUserId,
} = require('../query/reservations');

const { StatusCodes } = require('http-status-codes');

const isDuplicatedReservation = async (userId, startDate, endDate) => {
  const reservationCount = await findOneReservationByDateTime(
    Number(userId),
    startDate,
    endDate
  );

  return reservationCount > 0;
};

const isDuplicatedParticipation = async (userId, startDate, endDate) => {
  const participationCount = await findOneReservationByParticipation(
    Number(userId),
    startDate,
    endDate
  );
  return participationCount > 0;
};

const reservationVehicle = async (param) => {
  const { userId, startDate, endDate } = param;

  if (await isDuplicatedReservation(userId, startDate, endDate)) {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: '겹치는 예약이 존재합니다.',
    };
  }

  if (await isDuplicatedParticipation(userId, startDate, endDate)) {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: '겹치는 일정이 존재합니다.',
    };
  }

  const result = await createReservation(param);

  return result;
};

const getReservations = async () => {
  const result = await findAllReservation();
  return result;
};

const getReservation = async (reservationId) => {
  const result = await findOneReservation(Number(reservationId));
  return result;
};

const getMyReservations = async (userId) => {
  const result = await findAllReservationByUserId(userId);
  return result;
};

const updateReservation = async (reservationId, reservation) => {
  const result = await updateOneReservation(reservationId, reservation);
  return result;
};

const cancelReservation = async (userId, reservationId) => {
  const result = await destroyOneReservation(userId, reservationId);
  return result;
};

module.exports = {
  reservationVehicle,
  getReservations,
  updateReservation,
  cancelReservation,
  getReservation,
  isDuplicatedParticipation,
  isDuplicatedReservation,
  getMyReservations,
};
