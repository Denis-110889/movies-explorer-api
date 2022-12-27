const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/auth');
const { ERRORS, secretKey } = require('../utils/constants');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(ERRORS.AUTH));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new AuthError(ERRORS.AUTH));
    return;
  }
  req.user = payload;

  next();
};
