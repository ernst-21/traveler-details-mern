const crypto = require('crypto');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  lastName: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: 'Password is required'
  },
  stage: { type: String, trim: true },
  with: { type: String, trim: true },
  motive: {type: String},
  knowDate: { type: String, trim: true },
  range: [{ type: Date }],
  estimatedDate: [{ type: Date }],
  duration: {type: String},
  adults: { type: Number },
  young: { type: Number },
  children: { type: Number },
  babies: { type: Number },
  travelType: [{ type: String, trim: true }],
  accommodationType: [{ type: String, trim: true }],
  accompaniment: { type: String, trim: true },
  description: {type: String},
  budget: { type: Number },
  title: { type: String, trim: true },
  country: { type: String, trim: true },
  prefix: { type: String, trim: true },
  phone: { type: String, trim: true },
  birthday: { type: Date },
  terms: [{ type: String, trim: true }],
  rating: {type: Number},
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 8) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return '';

    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

module.exports = mongoose.model('User', UserSchema);
