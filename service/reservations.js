const {
  createReservation,
  findAllReservation,
  updateOneReservation,
  destroyOneReservation,
} = require('../query/reservations');

const reservationVehicle = async (reservation) => {
  const result = await createReservation(reservation);
  return result;
};

const getReservations = async () => {
  const result = await findAllReservation();
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
};
