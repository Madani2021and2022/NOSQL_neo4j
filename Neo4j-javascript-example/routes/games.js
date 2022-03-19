const express = require('express');
const gamesRouter = express();
const {getGames,createGame} = require('../controllers/gamesController');


gamesRouter.route('/').get(getGames).post(createGame);

module.exports = gamesRouter