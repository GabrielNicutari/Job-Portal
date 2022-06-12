const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cryptPassword = require('../../utils/cryptPassword').cryptAsync;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next) {
  // we use "function" instead of () =>.. because we want access to "this"
  const user = this;
  if (!user.isModified('password')) {
    return next;
  }

  cryptPassword(user.password, (err, hash) => {
    if (err) {
      return next(err);
    }

    user.password = hash;
    return next();
  });
});

userSchema.pre('updateOne', function (next) {
  const user = this.getUpdate();

  cryptPassword(user.password, (err, hash) => {
    if (err) {
      return next(err);
    }

    user.password = hash;
    return next();
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

mongoose.model('User', userSchema);
