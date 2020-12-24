require('./config/config');
require('./models/db');
// require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// -------------------Routes -------------------
const rtsIndex = require('./routes/index.router');


var app = express();


// middleware
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With; Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    var valErrors = [];
    Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
    res.status(422).send(valErrors)
  }
});
app.listen(process.env.PORT || 5000, () => console.log(`Server started at port : ${process.env.PORT}`));