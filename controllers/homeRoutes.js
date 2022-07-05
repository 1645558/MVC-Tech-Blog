const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'created_at',
            ],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => {
            post.get({ plain: true });
        });

        res.render('homepage', {
            posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const post = postData.get({ plain: true });
        res.render('single-post', {
            post,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;