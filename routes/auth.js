const express = require('express'),
  router = express.Router(),
  { asyncErrorHandler } = require('../middleware'),
  { register, login } = require('../controllers/auth'),
  { check } = require('express-validator');

//@Route    POST '/api/auth/register'
//@desc     Register the user
//@access   Public

router.post(
  '/register',
  [
    check('name', 'Name is required !!')
      .not()
      .isEmpty(),
    check('email', 'Enter valid email').isEmail(),
    check('password', 'Enter a password with length 4 or more').isLength({
      min: 4
    })
  ],
  asyncErrorHandler(register)
);

//@Route    POST '/api/auth/login'
//@desc     login to website
//@access   Public

router.post(
  '/login',
  [
    check('email', 'Enter a valid email').isEmail(),
    check('name', 'Nickname is required to signin!!').exists(),
    check('password', 'please enter a password').exists()
  ],
  asyncErrorHandler(login)
);


module.exports = router;
