const express = require('express');
const router = express.Router();
const applicationModel = require('../../models/neo4j/Application');
const { getPagination } = require('../helperFunctions');

router.get('/applications', async (req, res) => {
    let {page, size, email} = req.query;
    if (!email) {
        email = '';
    }
    const {limit, offset} = getPagination(page, size);
    const result = await applicationModel.findAll(email, limit, offset);
    res.json(result);
});

router.post('/applications', async (req, res) => {
    let newApplication = {...req.body, createdAt: new Date()};
    const result = await applicationModel.create(newApplication);
    res.json(result);
});

module.exports = router;
