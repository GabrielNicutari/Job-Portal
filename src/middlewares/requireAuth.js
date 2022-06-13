const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const mongoUserModel = mongoose.model('User');
const neo4jUserModel = require('../models/neo4j/User');
const db = require('../models/mysql/dbAssociations');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // authorization === 'Bearer ey234903e0sdfsd...'
  if (!authorization) {
    console.log('Unauthorized');
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;
    // decoded claims, sort of

    const database = req.path.toString().slice(1).split('/')[0];

    console.log(database);

    switch (database) {
      case 'mysql':
        const mysqlUserModel = db.models.users;
        const mysqlUser = await mysqlUserModel.findByPk(userId);
        req.user = mysqlUser;
        break;
      case 'mongo':
        const mongoUser = await mongoUserModel.findById(userId);
        req.user = mongoUser;
        break;
      case 'neo4j':
        const neo4jUser = (await neo4jUserModel.findById(userId)).records[0]._fields[0];
        req.user = neo4jUser;
        break;
    }
    console.log(req.user);

    next();
  });
};
