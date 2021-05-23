const { raw } = require('express');
const {
  Reservations,
  sequelize,
  Sequelize,
  Participations,
} = require('../models/index');
const { Op } = Sequelize;

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

const findOneReservation = async (reservationId) => {
  try {
    const result = await Reservations.findOne({ where: { deletedAt: null, reservationId }, raw: true });
    return result;
  } catch (err) {
    throw err;
  }
}

const findAllReservationByUserId = async (userId) => {
  try {
    const result = await Reservations.findAll({
      where: { deletedAt: null, userId },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

const findOneReservationByDateTime = async (userId, start, end) => {
  try {
    const result = await Reservations.count({
      where: {
        userId,
        deletedAt: null,
        [Op.and]: [
          {
            startDate: {
              [Op.lt]: end,
            },
            endDate: {
              [Op.gt]: start,
            },
          },
        ],
      },
      raw: true,
      logging: console.log,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

const findOneReservationByParticipation = async (userId, start, end) => {
  try {
    const result = await Reservations.count({
      where: {
        userId,
        deletedAt: null,
        [Op.and]: [
          {
            startDate: {
              [Op.lt]: end,
            },
            endDate: {
              [Op.gt]: start,
            },
          },
        ],
      },
      include: {
        model: Participations,
        as: 'p',
      },
      raw: true,
      logging: console.log,
    });
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

const findAllReservationByParticipation = async (userId) => {
  try {
    const result = await Reservations.findAll({
      where: {
        userId,
        deletedAt: null,
      },
      include: {
        model: Participations,
        attributes: [],
        as: 'p',
      },
      raw: true,
      logging: console.log,
    });
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
  findOneReservationByDateTime,
  findOneReservationByParticipation,
  findAllReservationByParticipation,
  findAllReservationByUserId,
  findOneReservation
};
