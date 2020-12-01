const router = require('express').Router();
const apiRoutes = require('./api');

// collects all api endpoints and prefixes them with the '/api' path before sending to server.js
router.use('/api', apiRoutes);

// error message sent if a request is made to an endpoint that does not exist
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;