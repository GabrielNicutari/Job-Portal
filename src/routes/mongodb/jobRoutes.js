const { getPagination } = require('../helperFunctions');
const JobModel = require('../../models/mongo/Job');

const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/jobs', async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const jobs = await JobModel.find().skip(offset).limit(limit);
    res.status(200).send(jobs);
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await JobModel.findById(new ObjectId(req.params.id));
    res.status(200).send(job);
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.post('/jobs', async (req, res) => {
  const newJob = new JobModel({
    jobTitle: req.body.title,
    jobCity: req.body.city,
    jobDescription: req.body.description,
    jobHasSalary: req.body.hasSalary,
    jobStatus: req.body.status,
    jobType: req.body.type,
    company: req.body.company,
    benefits: req.body.benefits,
    categories: req.body.categories
  });

  newJob
    .save()
    .then((data) => {
      res.status(200).json({ message: 'Job added successfully!', job: data });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({ message: error.message });
    });
});

router.patch('/jobs/:id', async (req, res) => {
  try {
    const updatedJob = await JobModel.findByIdAndUpdate(
      new ObjectId(req.params.id),
      req.body,
      { new: true }
    );
    res.status(200).send({ message: 'Job Updated', job: updatedJob });
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.delete('/jobs/:id', async (req, res) => {
  try {
    const removedJob = await JobModel.findByIdAndDelete(new ObjectId(req.params.id));
    res.status(200).send({ message: 'Job Removed', job: removedJob });
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

module.exports = router;
