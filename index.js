require('dotenv').config();
const express = require('express'),
  app = express(),
  mongoDb = require('./config/db.js');

//database
mongoDb();

// Init Middleware
app.use(express.json({ extended: false })); //bodyparser (accept datatype of json)

app.use(express.urlencoded({ extended: true })); //bodyparser (accept data from form)

//define routes
app.use('/api/auth', require('./routes/auth'));

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
