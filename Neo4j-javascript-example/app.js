const express = require('express');
const app = express();
const {json} = require('body-parser')
const cors = require('cors')
const port = 5545;
const playersRoute = require('./routes/players');
const teamsRouter = require('./routes/teams');
const gamesRouter = require('./routes/games')
const driver = require('./driver');

app.use(json())
app.use(cors())
app.use('/players',playersRoute);
app.use('/teams',teamsRouter);
app.use('/games',gamesRouter);

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})


driver.close()