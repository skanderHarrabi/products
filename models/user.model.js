const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: 'login can\'t be empty',
    unique: true,
  },
  password: {
    type: String,
    required: 'password can\'t be empty',
    minlength: [8, 'Password must be atleast 8 character long']
  },
  mail: {
    type: String,
    required: 'mail can\'t be empty',
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Events
userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Methods
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id, email: this.mail },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP
    });
}


mongoose.model('User', userSchema);
