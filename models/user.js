const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { schemaConfig } = require('../utils/config');
const { ERRORS } = require('../utils/constants');
const AuthError = require('../utils/errors/auth');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Должно быть не меньше 2, имеется {VALUE}'],
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
}, schemaConfig);
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(ERRORS.USER.AUTH));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(ERRORS.USER.AUTH));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
