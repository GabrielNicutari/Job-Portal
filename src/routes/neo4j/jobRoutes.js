const express = require('express');
const router = express.Router();
const jobModel = require('../../models/neo4j/Job');
const { getPagination, getPagingData } = require('../helperFunctions');

router.get('/neo4j/job', async (req, res) => {
    let {page, size, city, category} = req.query;
    const {limit, offset} = getPagination(page, size);
    const result = await jobModel.findAll(city, category, limit, offset);
    res.json(result);
});

//
// router.post('/neo4j/application', async (req, res) => {
//     let newApplication = {...req.body, createdAt: new Date()}
//     const result = await applicationModel.create(newApplication);
//     res.json(result);
// });

// router.put('/neo4j/application/:applicationId', async (req, res) => {
//     db.models.applications.json.update({phone_number: req.body.phone}, {where: {id: {[Op.eq]: Number(req.params.applicationId)}}})
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while updating the application"
//             });
//         });
// });
//
// router.delete('/neo4j/application/:applicationId', async (req, res) => {
//     db.models.applications.json.destroy({where: {id: {[Op.eq]: Number(req.params.applicationId)}}})
//         .then(() => {
//             res.send('Application was deleted successfully');
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while updating the application"
//             });
//         });
// });

module.exports = router;

// const getPagination = (page, size) => {
//     const limit = size ? +size : 3;
//     const offset = page ? page * limit : 0;
//     return {limit, offset};
// };
//
// const getPagingData = (data, page, limit) => {
//     const {count: totalItems, rows: tutorials} = data;
//     const currentPage = page ? +page : 0;
//     const totalPages = Math.ceil(totalItems / limit);
//     return {totalItems, tutorials, totalPages, currentPage};
// };
