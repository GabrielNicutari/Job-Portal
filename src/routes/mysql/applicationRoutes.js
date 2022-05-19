const express = require('express');
const router = express.Router();
const db = require('../../models/mysql/dbAssociations');

router.post('/mysql/application', async (req, res) => {
  try {
    let newApplication = {...req.body, created_at: new Date()}
    const savedApplication = await db.models.applications.create(newApplication);

    if (savedApplication) {
      res.status(200).send(savedApplication);
    }
  } catch {
    res.status(500).send({ message: 'Could not create a new application!' });
  }
});

module.exports = router;
