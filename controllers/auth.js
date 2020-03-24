const { validationResult } = require('express-validator'),
  passport = require('passport'),
  User = require('../models/user');
module.exports = {
  //google auth
  async googleAuth(req, res, next) {
    console.log('sss')
    passport.authenticate('google', {
      scope: ['profile', 'email']
    });
  },

  //login


  async login(req, res, next) {}
};
