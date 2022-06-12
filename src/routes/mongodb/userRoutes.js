const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.patch('/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await User.updateOne({ _id: id }, req.body);

    if (result.modifiedCount === 1) {
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

router.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await User.deleteOne({ _id: req.params.id });

    if (result.deletedCount) {
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
