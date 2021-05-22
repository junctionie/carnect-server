const { body } = require('express-validator');
// example
module.exports = [body('email').isEmail()];
