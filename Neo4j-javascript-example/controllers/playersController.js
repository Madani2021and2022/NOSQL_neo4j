const driver = require("../driver");

const getPlayer = async(req, res) => {
  const players = [];
  const session = driver.session();
  const query = `match (p:player)-[:plays_at]->(t:team) return p,t.name`;

  const readResult = await session.readTransaction((tx) => tx.run(query));

  readResult.records.forEach((record) => {
  let player = {}
  player = record.get(0).properties;
  player = {...player,team:record.get(1)}
  players.push(player)
  });

  await session.close()
  res.send(players);
};

const postPlayer = async(req,res,next)=>{
  const session = driver.session();
  const {name,goals,assists} = req.body
  const query = `merge (:player{name:'${name}',goals:${Number(goals)},assists:${Number(assists)}})`
  await session.writeTransaction((fx)=>fx.run(query));

  await session.close()
  res.status(200).send('created')
}

module.exports = { getPlayer ,postPlayer};
