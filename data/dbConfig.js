// May need enviornment variable *****
// import knex
const knex = require('knex')
// import config object from knex file
const config = require('../knexfile.js')
// declare environment
const dbEnv = process.DB_ENV || 'development'
// export 
module.exports = knex(config[dbEnv])
