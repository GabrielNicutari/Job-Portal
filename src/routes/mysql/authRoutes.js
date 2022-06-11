require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const AuthUser = mongoose.model('User');
const db = require('../../models/mysql/dbAssociations');
const { QueryTypes } = require('sequelize');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  const { email, password, username, roleId } = req.body;

  try {
    const authUser = new AuthUser({ email, password, username });
    await authUser.save();

    const result = await db.query(
      `call job_portal.add_user(\'${email}\', \'${username}\', ${password}, ${roleId});`,
      { type: QueryTypes.RAW }
    );

    console.log(result[0].user_id);

    const token = jwt.sign({ authUserId: authUser._id }, JWT_SECRET);
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

  const authUser = await AuthUser.findOne({ email });
  if (!authUser) {
    return res.status(404).send({ error: 'Invalid password or email' });
  }

  try {
    await authUser.comparePassword(password);
    const token = jwt.sign({ authUserId: authUser._id }, JWT_SECRET);
    res.send({ token });
  } catch (e) {
    return res.status(401).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
