require('dotenv').config();
const express = require('express'),
  app = express(),
  passport = require('passport'),
  mongoDb = require('./config/db.js');

const session = require('express-session');
//services
require('./services/passport');

//database
mongoDb();

// Init Middleware
app.use(express.json({ extended: false })); //bodyparser (accept datatype of json)

app.use(express.urlencoded({ extended: true })); //bodyparser (accept data from form)

app.use(
  session({
    secret: process.env.keys,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

//define routes
require('./routes/auth')(app);

app.use(function(err, req, res, next) {
  //error handler
  console.log(err);
  if (err.kind === 'ObjectId') {
    return res
      .status(404)
      .json({ errors: [{ msg: 'Id Not found in the database!!' }] });
  }
  return res.status(500).json({ errors: [{ msg: 'Server Error !!' }] });
});

PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
