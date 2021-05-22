const { Reservations, sequelize } = require('../models/index');

const createReservation = async (reservation) => {
  try {
    const result = await Reservations.create(reservation);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const findAllReservation = async () => {
  try {
    const result = await Reservations.findAll({ where: { deletedAt: null } });
    return result;
  } catch (err) {
    throw err;
  }
};

const updateOneReservation = async (reservationId, reservation) => {
  try {
    const result = await Reservations.update(reservation, {
      where: { reservationId, deletedAt: null },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

const destroyOneReservation = async (userId, reservationId) => {
  try {
    const result = await Reservations.update(
      { deletedAt: sequelize.fn('NOW') },
      {
        where: { userId, reservationId },
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createReservation,
  findAllReservation,
  updateOneReservation,
  destroyOneReservation,
};
