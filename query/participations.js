const { Participations, Reservations } = require('../models/index');

const createParticipation = async (participation) => {
  try {
    const result = await Participations.create(participation);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { createParticipation };
