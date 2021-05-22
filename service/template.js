const { findAllData } = require('../query/template');

const getTemplate = async () => {
  try {
    const result = await findAllData();
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { getTemplate };
