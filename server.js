const express = require('express');
// imports all pre-packaged routes
const routes = require('./routes');
// importing connection to Sequelize
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// establishes connection to database and server via 'sequelize.sync()' method; 'sync' indicates Sequelize is taking Models and connecting them to associated database tables; if one is not found it will be created; 'force' controls whether tables are dropped and re-created on start-up
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening`));
});