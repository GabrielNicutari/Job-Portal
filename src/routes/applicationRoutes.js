const express = require('express');
const router = express.Router();
const db = require('../models/mysql/dbAssociations');

router.post('/application', async (req, res) => {
  try {
    const newApplication = db.models.applications.build(req.body);
    await newApplication.save();
    res.status(200).send({ message: 'The application has been added!' });
  } catch {
    res.status(500).send({ message: 'Could not create a new job!' });
  }
});

module.exports = router;
