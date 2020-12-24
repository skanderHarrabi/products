const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var productsSchema = new mongoose.Schema({}, { strict: false });


mongoose.model('Products', productsSchema);
