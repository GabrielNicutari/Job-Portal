const mongoose = require('mongoose');

const userSchema = require('./User');

const companySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  websiteUrl: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    required: false
  },
  user: userSchema,
  numberOfEmployees: {
    type: Number,
    required: true
  }
});

mongoose.model('Company', companySchema);