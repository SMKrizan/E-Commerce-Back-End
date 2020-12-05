// for passing in protected information to connect to MySQL 
require('dotenv').config();

// imports Sequelize constructor from npm library
const Sequelize = require('sequelize');

const { DB_NAME, DB_USER, DB_PWD, JAWSDB_URL } = process.env  
  
  const sequelize = JAWSDB_URL
  ? new Sequelize(JAWSDB_URL)
  : new Sequelize(DB_NAME, DB_USER, DB_PWD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    dialectOptions: {
      decimalNumbers: true,
    }
  });
  

module.exports = sequelize;