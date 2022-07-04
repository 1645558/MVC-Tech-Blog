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

router.get('/gallery/:id', async (req, res) => {
    try {
        const dbGalleryData = await Gallery.findByPk(req.params.id, {
            include: [
                {
                    model: Blog, 
                    attributes: [
                        'id', 
                        'title',
                        'name', 
                        'created_at',
                    ],
                },
            ],
        });

        const gallery = dbGalleryData.get({ plain: true });
        res.render('gallery', {
            gallery,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.findByPk(req.params.id);
        const blog = dbBlogData.get({ plain: true });
        
        res.render('blog', {
            blog,
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;