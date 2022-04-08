const express = require("express");
const playersRoute = express();
const { getPlayer,postPlayer } = require("../controllers/playersController");

playersRoute.route("/").get(getPlayer).post(postPlayer);
module.exports = playersRoute;
