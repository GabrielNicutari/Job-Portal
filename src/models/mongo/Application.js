const mongoose = require('mongoose');
const jobSchema = require('./Job');
const userSchema = require('./User');

const applicationSchema = new mongoose.Schema({
  job: jobSchema,
  resume: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
    required: 'Full name is required',
    match: [/^[a-zA-Z\s]*$/, 'Please enter a valid full name']
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: 'Phone number is required',
    match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Please enter a valid phone number'],
    maxLength: 25,
  },
  email: {
    type: String,
    trim: true,
    required: 'Email is required',
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  linkedinUrl: {
    type: String,
    trim: true,
    required: false,
  },
  user: {
    type: userSchema,
    default:  () => ({}),
  },
});

mongoose.model('Application', applicationSchema);
