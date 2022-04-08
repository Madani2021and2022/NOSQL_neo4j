const driver = require('../driver');

const getGames = async(req,res)=>{
    const games = []
    const session = driver.session()

    const query = `match (t1:team)-[g:play_against]->(t2:team) 
    return t1.name as team1 ,t2.name as team2,g.competition as competition,g.result as score`


    const readResult = await session.readTransaction((tx)=>tx.run(query))

    readResult.records.forEach(record => {
        games.push({team1:record._fields[0],team2:record._fields[1],competition:record._fields[2],score:record._fields[3]})     
    });

    await session.close();
    res.send(games)
}


const createGame = async(req,res,next)=>{
    const session = driver.session();
    const {team1,team2,score,competition} = req.body
    const query = `match (t1:team{name:'${team1}'})
                   match (t2:team{name:'${team2}'})
                   merge (t1)-[:play_against{competition:'${competition}',result:'${score}'}]->(t2)`
    
    await session.writeTransaction((fx)=>fx.run(query))
    await session.close();
    res.status(200).send('created')
    next()
}



module.exports = {getGames,createGame}