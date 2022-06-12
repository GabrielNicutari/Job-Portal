const mongoose = require('mongoose');

const companySchema = require('./Company');
const benefitSchema = require('./Benefit');
const categoriesSchema = require('./Category');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  jobCity: {
    type: String,
    trim: true,
    required: true
  },
  jobDescription: {
    type: String,
    trim: true,
    required: true
  },
  jobHasSalary: {
    type: Boolean,
    required: true
  },
  jobDateCreated: {
    type: Date,
    trim: true,
    required: true,
    default: Date.now()
  },
  jobStatus: {
    type: String,
    trim: true,
    required: true
  },
  jobType: {
    type: String,
    trim: true,
    required: true
  },
  company: companySchema,
  benefits: [benefitSchema],
  categories: [categoriesSchema]
});

module.exports = mongoose.model('Job', jobSchema);
