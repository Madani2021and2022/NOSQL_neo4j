const express = require('express');
const teamsRouter = express();
const {getTeams,postTeam} = require('../controllers/teamsController');

teamsRouter.route('/').get(getTeams).post(postTeam);

module.exports = teamsRouter