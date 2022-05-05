const express = require('express');
const router = express.Router();
const db = require('../models/mysql/dbAssociations');

router.post('/application', async (req, res) => {
  try {
    const newApplication = await db.models.applications.create(req.body);

    if (newApplication) {
      res.status(200).send({ message: 'The application has been added!', newApplication });
    }
  } catch {
    res.status(500).send({ message: 'Could not create a new application!' });
  }
});

module.exports = router;
