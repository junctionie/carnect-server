const { StatusCodes } = require('http-status-codes');
const {
  joinReservation,
  getMyParticipations,
  cancelParticipation,
} = require('../service/participations');

const create = async (req, res, next) => {
  const result = await joinReservation(req.body);

  if (result && result.status === StatusCodes.BAD_REQUEST) {
    const message = result.message;
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }

  return res.status(StatusCodes.OK).json(result);
};

const gets = async (req, res, next) => {
  const { userId } = req.params;
  const result = await getMyParticipations(userId);
  return res.status(StatusCodes.OK).json(result);
};

const cancel = async (req, res, next) => {
  const { participationId, userId } = req.body;
  const result = await cancelParticipation(participationId, userId);

  if (result.status === StatusCodes.BAD_REQUEST) {
    const message = result.message;
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }

  return res.status(StatusCodes.OK).json(result);
};

module.exports = { create, gets, cancel };
