const moment = require('moment');
const { Participations, Sequelize, sequelize } = require('../models/index');
const { fn } = Sequelize;
const { QueryTypes } = sequelize;

const createParticipation = async (participation) => {
  try {
    const result = await Participations.create(participation);
    return result;
  } catch (err) {
    throw err;
  }
};

const findOneParticipationBeforeEndDate = async (participationId) => {
  try {
    const datetime = moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss');

    const query = `
    SELECT count(*) AS count
      FROM Participations AS p
           INNER JOIN Reservations AS r
                   ON p.reservationId = r.reservationId AND r.startDate >= '${datetime}'
     WHERE p.participationId = ${participationId} AND p.deletedAt is Null;`;
    const [result] = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return result.count;
  } catch (err) {
    throw err;
  }
};

const updateOneParticipation = async (participationId, userId) => {
  try {
    const result = await Participations.update(
      { deletedAt: fn('NOW') },
      { where: { participationId, userId } }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createParticipation,
  findOneParticipationBeforeEndDate,
  updateOneParticipation,
};
