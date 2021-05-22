const {
  createReservation,
  findAllReservation,
  updateOneReservation,
  destroyOneReservation,
  findOneReservationByDateTime,
} = require('../query/reservations');

const { StatusCodes } = require('http-status-codes');

const reservationVehicle = async (param) => {
  const { userId, startDate, endDate } = param;
  const reservationCount = await findOneReservationByDateTime(
    Number(userId),
    startDate,
    endDate
  );

  if (reservationCount > 0) {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: '겹치는 예약이 존재합니다.',
    };
  }

  // TODO 참가 일정 겹치는지 확인

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
};
