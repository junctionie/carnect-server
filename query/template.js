const { test } = require('../models/index');

const findAllData = async () => {
  try {
    const result = await test.findAll();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { findAllData };
