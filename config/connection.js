// imports Sequelize constructor from npm library
const Sequelize = require('sequelize');

// for passing in protected information to connect to MySQL 
require('dotenv').config({ path: '../.env' });

// let sequelize;

console.log(process.env.DB_USER);
console.log(process.env.DB_NAME);
console.log(process.env.DB_PWD);

// creates connection to database by importing base Sequelize class and passing MySqL information to it 
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})

// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//       // dialectOptions: {
//       //   decimalNumbers: true,
//       // },
//     });

module.exports = sequelize;