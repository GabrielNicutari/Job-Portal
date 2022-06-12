const mongoose = require('mongoose');
const ApplicationModel = mongoose.model('Application');
const JobModel = mongoose.model('Job');
const UserModel = mongoose.model('User');
const ObjectId = require('mongodb').ObjectId;

const express = require('express');
const {getPagination} = require("../helperFunctions");
const router = express.Router();

router.post('/mongo/application/:jobId', async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await JobModel.findById(new ObjectId(jobId));
    const { resume, fullName, phoneNumber, email } = req.body;
    const linkedinUrl = req.body?.linkedinUrl;
    const userId = req.body?.userId;
    console.log('user id = ', userId);
    let user = {};
    if (userId) {
      user = await UserModel.findById(new ObjectId(userId));
    }
    const newApplication = new ApplicationModel({ job, resume, fullName, phoneNumber, email, linkedinUrl, user });
    const savedApplication = await newApplication.save();
    res.send({ message: 'Application is saved', savedApplication });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get('/mongo/applications', async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    console.log('limit, offset = ', limit, offset);
    const applications = await ApplicationModel.find().skip(offset).limit(limit);
    res.send(applications);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
