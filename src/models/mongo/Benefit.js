const mongoose = require('mongoose');

const benefitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  iconUrl: {
    type: String,
    required: true,
    trim: true
  }
});

mongoose.model('Benefit', benefitSchema);