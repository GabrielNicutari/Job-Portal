const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../models/mysql/dbAssociations');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  const { email, password, username, roleId } = req.body;

  try {
    const User = db.models.users;
    const response = await User.create({
      email: email,
      password: password,
      username: username,
      roleId: roleId
    });

    const userId = response.id;

    const token = jwt.sign({ userId: userId }, JWT_SECRET);
    res.send({ token });
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const User = db.models.users;
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    return res.status(404).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.send({ token });
  } catch (e) {
    return res.status(401).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
