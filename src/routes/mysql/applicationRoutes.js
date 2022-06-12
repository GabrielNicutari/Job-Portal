const express = require('express');
const router = express.Router();
const db = require('../../models/mysql/dbAssociations');
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require('../helperFunctions')

router.get('/mysql/applications', async (req, res) => {
    const {page, size, email} = req.query;
    const condition = email ? {email: {[Op.like]: `%${email}%`}} : null;
    const {limit, offset} = getPagination(page, size);
    db.models.applications.findAndCountAll({where: condition, limit, offset,})
        .then(data => {
            const response = getPagingData(data, page, limit);
            console.log('response = ', response);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
});

router.post('/mysql/application', async (req, res) => {
    try {
        const savedApplication = await db.models.applications.create({...req.body, created_at: new Date()});
        if (savedApplication) {
            res.status(200).send(savedApplication);
        }
    } catch {
        res.status(500).send({message: 'Could not create a new application!'});
    }
});

router.put('/mysql/application/:applicationId', async (req, res) => {
    db.models.applications.update({phone_number: req.body.new_phone_number}, {where: {id: {[Op.eq]: Number(req.params.applicationId)}}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the application"
            });
        });
});

router.delete('/mysql/application/:applicationId', async (req, res) => {
    db.models.applications.destroy({where: {id: {[Op.eq]: Number(req.params.applicationId)}}})
        .then(() => {
            res.send('Application was deleted successfully');
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the application"
            });
        });
});

module.exports = router;
