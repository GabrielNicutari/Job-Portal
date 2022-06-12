const bcrypt = require('bcrypt');

const cryptSync = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const cryptAsync = (password, callback) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return callback(err);
    }

    bcrypt.hash(password, salt, null, function (err, hash) {
      return callback(err, hash);
    });
  });
};

module.exports = { cryptSync, cryptAsync };
