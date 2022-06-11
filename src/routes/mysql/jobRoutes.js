const express = require('express');
const router = express.Router();
const db = require('../../models/mysql/dbAssociations');
const {getPagination} = require("../helperFunctions");

router.post('/jobs', async (req, res) => {
  const date = new Date();
  // start a transaction because we need to execute multiple queries for this endpoint
  
  const job = req.body.job;
  const addJobQuery = `call job_portal.add_job(
    "${job.title}", 
    "${job.company_id}", 
    "${job.city}", 
    "${job.description}",
    "${job.job_type_id}", 
    "${job.job_status_id}", 
    "${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}"
  );`;
  const t = await db.transaction();
  try {
    // Initially, the job has to be created so that the new id is retrieved and used for the jobs-have-benefits table
    const response = await db.query(addJobQuery, {transaction: t});
    const benefits = req.body.benefits;
    if (response && response.length) {
      const jobId = response[0].job_id;
      for (const benefitId of benefits) {
        await db.models['jobs-have-benefits'].create({
          job_id: jobId,
          benefit_id: benefitId
        }, {transaction: t});
      }
      await t.commit();
      res.status(200).send({ message: 'Job with benefits added successfully' });
    } else {
      await t.rollback();
      res.status(500).send({ message: 'Something went wrong' });
    }
    
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

const replaceForeignKeysWithValues = async (job, t) => {
  const { status } = await db.models['job-statuses'].findOne({where: {id : job.job_status_id}}, {transaction: t});
  const { name } = await db.models['job-types'].findOne({where: {id: job.job_type_id}}, {transaction: t});
  // populate each job with actual job status and job type instead of id's
  job.dataValues.job_status = status;
  job.dataValues.job_type = name;
  delete job.dataValues.job_status_id;
  delete job.dataValues.job_type_id;
  // console.log('inside', job)
}

router.get('/jobs', async (req, res) => {
  const {page, size} = req.query;
  const {limit, offset} = getPagination(page, size);

  const t = await db.transaction();
  try {
    let jobs = await db.models.jobs.findAll({offset: offset, limit: limit}, {transaction: t});
    if (jobs && jobs.length) {
      for (let job of jobs) {
        await replaceForeignKeysWithValues(job, t);
      }
      await t.commit();
      res.status(200).send(jobs);
      // res.send(jobs)
  } else {
    await t.rollback();
    res.status(500).send({ message: 'Something went wrong' });
  }
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.get('/jobs/:id', async (req, res) => { 
  const t = await db.transaction();
  try {
    const job = await db.models.jobs.findOne({where: {id: req.params.id}}, {transaction: t});
    if (job) {
      await replaceForeignKeysWithValues(job, t);
      await t.commit();
      res.status(200).send(job);
    } else {
      await t.rollback();
      res.status(500).send({ message: 'No job with id=' + req.params.id });
    }
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

const patchJobHasBenefits = async (jobId, benefits, t) => {
  await db.models['jobs-have-benefits'].destroy({where: {job_id: jobId}}, {transaction: t});
  for (const benefitsId of benefits) {
    await db.models['jobs-have-benefits'].create({job_id: jobId, benefit_id: benefitsId}, {transaction: t});
  }
};

router.patch('/jobs/:id', async (req, res) => {
  console.log(req.params.id)
  const t = await db.transaction();
  try {
    let isJobUpdated = await db.models.jobs.update(req.body.job, {where: {id: req.params.id}}, {transaction: t});
    isJobUpdated = isJobUpdated[0];
    if (isJobUpdated) {
      if (req.body.benefits.length) {
        console.log(req.body.benefits)
        // do this db query only when benefits are changed
        await patchJobHasBenefits(req.params.id, req.body.benefits, t);
      }

      await t.commit();
      res.status(200).send({message: "The job has been updated successfully"});
    } else {
      await t.rollback();
      res.status(500).send({ message: 'The job does not exist' });
    }
    
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.delete('/jobs/:id', async (req, res) => {
  const t = await db.transaction();
  try {
    const isDeleted = await db.models.jobs.destroy({where: {id: req.params.id}}, {transaction: t});
    if (isDeleted) {
      res.status(200).send({ message: 'Job successfully deleted' });
      await t.commit();
    } else{
      res.status(500).send({ message: 'Job does not exist' });
      await t.rollback();
    }
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

module.exports = router;
