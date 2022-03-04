const express = require("express");
const router = express.Router();

require('./auth')(router);
require('./admin')(router);
require('./customer')(router);

// Default Routes, This line should be the last line of this module.
require(`${__routes}/default`)(router);

module.exports = router;
