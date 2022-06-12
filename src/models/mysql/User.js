const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const cryptPassword = require('../../utils/cryptPassword').cryptSync;

const User = (sequelize) => {
  const userSchema = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      roleId: {
        field: 'role_id',
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = cryptPassword(user.password);
        },
        beforeUpdate(user) {
          user.password = cryptPassword(user.password);
        }
      }
    }
  );

  userSchema.prototype.comparePassword = function (candidatePassword) {
    const user = this;

    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
        if (err) {
          return reject(err);
        }
        console.log(user.password);
        if (!isMatch) {
          return reject(false);
        }
        resolve(true);
      });
    });
  };

  return userSchema;
};

module.exports = User;
