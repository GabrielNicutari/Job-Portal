const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const { register, login, comparePassword } = require('../../models/neo4j/User');

router.post('/signup', async (req, res) => {
  const { email, password, username, role } = req.body;

  try {
    const response = await register({ email, password, username, role });
    const user = response.records[0]._fields[0];

    console.log(user);

    const token = jwt.sign({ userId: user.identity.low }, JWT_SECRET);
    res.send({ token });
  } catch (e) {
    return res.status(422).send(e.message); // invalid data
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  try {
    const response = await login({ email, password });
    const user = response.records[0]._fields[0];
    console.log(user);

    if (!user) {
      return res.status(404).send({ error: 'Invalid password or email' });
    }

    await comparePassword(password, user.properties.password);
    const token = jwt.sign({ userId: user.identity.low }, JWT_SECRET);
    res.send({ token });
  } catch (e) {
    return res.status(401).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
