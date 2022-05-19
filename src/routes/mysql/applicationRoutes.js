const express = require('express');
const router = express.Router();
const db = require('../../models/mysql/dbAssociations');
const {Op} = require("sequelize");

router.post('/mysql/application', async (req, res) => {
    try {
        let newApplication = {...req.body, created_at: new Date()}
        const savedApplication = await db.models.applications.create(newApplication);
        if (savedApplication) {
            res.status(200).send(savedApplication);
        }
    } catch {
        res.status(500).send({message: 'Could not create a new application!'});
    }
});

router.get('/mysql/application', async (req, res) => {
    const { page, size, email } = req.query;
    const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    db.models.applications.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
});

module.exports = router;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, tutorials, totalPages, currentPage };
};
