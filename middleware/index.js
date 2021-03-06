const User = require('../models/user');

const middleware = {
  asyncErrorHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  // auth(req, res, next) {
  //   const jwtToken = req.header('jwtToken');
  //   if (!jwtToken) {
  //     res.status(401).json({ errors: [{ msg: 'No token auth denied!!' }] });
  //   }

  //   try {
  //     const decoded = jsonwebtoken.verify(jwtToken, process.env.jwtSecret);
  //     req.user = decoded.user;
  //     next();
  //   } catch (err) {
  //     res.status(401).json({ errors: [{ msg: 'Token not valid!!' }] });
  //   }
  // }
};

module.exports = middleware;
