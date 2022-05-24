const express = require('express');
const db = require('../../models/mysql/dbAssociations');
const requireAuth = require('../../middlewares/requireAuth');

const router = express.Router();
router.use(requireAuth);

router.delete('/user/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const User = db.models.users;
    const result = await User.destroy({ where: { id: id } });

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

router.put('/user/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const User = db.models.users;
    const result = await User.update(req.body, { where: { id: id } });

    if (result[0] === 1) {
      //Number of affected rows
      res.send({ message: 'User was updated successfully!' });
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Perhaps the User was not found!`
      });
    }
  } catch (e) {
    res.status(500).send({ message: 'Could not update User with id=' + id });
  }
});

module.exports = router;
