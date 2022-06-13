const express = require('express');
const jwt = require('jsonwebtoken');
const neo4jDriver = require('../../database/neo4jConfig');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// router.post('/signup', async (req, res) => {
//   const { email, password, username, role } = req.body;
//
//   try {
//     const user = new User({ email, password, username, role });
//     await user.save();
//
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET);
//     res.send({ token });
//   } catch (e) {
//     return res.status(422).send(e.message); // invalid data
//   }
// });

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const session = neo4jDriver.session({database: 'neo4j'});

  let user;
  try {
    const result = await session.readTransaction(tx =>
        tx.run(`MATCH (user:User) WHERE user.email = '${email}' return user`)
    )
    user = result.records[0]._fields[0].properties;
    user.userId = result.records[0]._fields[0].identity.low;
  } finally {
    await session.close();
  }

  if (!user) {
    return res.status(404).send({ error: 'Invalid password or email' });
  }

  try {
    //TODO: fix compare password...
    // await user.comparePassword(password);
    const token = jwt.sign({ userId: user.userId }, JWT_SECRET);
    res.send({ token });
  } catch (e) {
    return res.status(401).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
