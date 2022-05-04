const express = require('express');
const router = express.Router();
const mySqlDb = require('../models/mysql/dbAssociations');
const { QueryTypes } = require('sequelize');

router.post('/job', async (req, res) => {
  const date = new Date();
  const response = req.body.job;
  console.log(req.body)
  const query1 = `call job_portal.add_job(
    "${response.title}", 
    "${response.company_id}", 
    "${response.city}", 
    "${response.description}",
    "${response.job_type_id}", 
    "${response.job_status_id}", 
    "${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}"
  );`;

  // Initially, the job has to be created so that the new id is retrieved and used for the jobs-have-benefits table
  try {
    const jobId = await mySqlDb.query(query1, { type: QueryTypes.INSERT });

    const benefits = req.body.benefits;
    for (const benefit_id of benefits) {
      const query2 = `
        INSERT INTO \`jobs-have-benefits\` (job_id, benefit_id) 
        VALUES (${jobId[0].job_id}, ${benefit_id});
      `;

      try {
        await mySqlDb.query(query2, { type: QueryTypes.INSERT });
      } catch {
        res.status(500).send({ message: 'Could not create a new job!' });
      }
    }
  } catch {
    res.status(500).send({ message: 'Could not create a new job!' });
  }
  res.status(200).send({ message: 'The job has been added!' })
});

module.exports = router;