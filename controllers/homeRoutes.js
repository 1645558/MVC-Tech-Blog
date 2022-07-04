const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Gallery, Blog } = require('../models');

router.get('/', async (req, res) => {
    try {
        const dbGalleryData = await Gallery.findAll({
            include: [
                {
                    model: Blog,
                    attributes: ['title', 'name', 'created_at'],
                },
            ],
        });

        const galleries = dbGalleryData.map((gallery) =>
            gallery.get({ plain: true })
        );

        res.render('homepage', {
            galleries
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;