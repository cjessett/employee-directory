const env = process.env.ENV || 'development';
const config = require('../knexfile.js')[env];
module.exports = require('knex')(config);
