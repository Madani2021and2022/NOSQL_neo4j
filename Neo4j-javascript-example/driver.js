const neo4j = require("neo4j-driver");

const uri = "neo4j://localhost:7687";
const user = "neo4j";
const password = "your password";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password),{disableLosslessIntegers: true });

module.exports = driver