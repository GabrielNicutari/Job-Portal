require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});
const neo4j = require('neo4j-driver');
const uri = process.env.NEO4J_CONNECTION_STRING;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;
const neo4jDriver = neo4j.driver(uri, neo4j.auth.basic(user, password));

module.exports = neo4jDriver;
