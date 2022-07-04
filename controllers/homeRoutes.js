const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
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