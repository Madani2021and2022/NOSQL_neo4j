const driver = require("../driver");

const getTeams = async (req, res,next) => {
  const teams = [];
  const session = driver.session();
  const query = `match (t:team) return t`;

  const readResult = await session.readTransaction((tx) => tx.run(query));
  readResult.records.forEach((record) => {
    teams.push(record.get(0).properties)
  });
  await session.close();
  

  res.send(teams)
  next()
};


const postTeam = async(req,res,next)=>{
    const session = driver.session()
    const {name} = req.body
    const query = `create (:team {name:'${name}'})`
    await session.writeTransaction((fx)=>fx.run(query))
    await session.close();
    res.status(200).send('created')
    next()
}

module.exports = { getTeams,postTeam };
