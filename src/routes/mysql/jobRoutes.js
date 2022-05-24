const express = require('express');
const router = express.Router();
const db = require('../../models/mysql/dbAssociations');
const { QueryTypes } = require('sequelize');

router.post('/job', async (req, res) => {
  const date = new Date();
  const response = req.body.job;

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
    const jobId = await db.query(query1, { type: QueryTypes.RAW });

    const benefits = req.body.benefits;
    if (jobId) {
      let ok = true;

      for (const benefit_id of benefits) {
        const query2 = `
        INSERT INTO \`jobs-have-benefits\` (job_id, benefit_id) 
        VALUES (${jobId[0].job_id}, ${benefit_id});
      `;

        try {
          const result = await db.query(query2, { type: QueryTypes.INSERT });
          if (!result) {
            ok = false;
          }
        } catch {
          res.status(500).send({ message: 'Could not create a new job!' });
        }
      }

      if (ok) {
        res.status(200).send({ messsage: 'The job has been added!' });
      }
    }
  } catch {
    res.status(500).send({ message: 'Could not create a new job!' });
  }
});

module.exports = router;
