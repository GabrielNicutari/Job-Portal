const express = require('express');
const db = require('../models/mysql/dbAssociations');

const router = express.Router();

router.delete('/user/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = db.models.users;
    const result = await user.destroy({ where: { id: id } });

    if (result === 1) {
      res.send({ message: 'User was deleted successfully!' });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Perhaps the User was not found!`
      });
    }
  } catch (e) {
    res.status(500).send({ message: 'Could not delete User with id=' + id });
  }
});

module.exports = router;
