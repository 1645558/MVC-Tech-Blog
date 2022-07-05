const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post } = require('../../models');

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
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' })
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const postData = await Post.Create({
            title: req.body.title,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
        },
            {
                where: {
                    id: req.params.id,
                },
            });

        if (!postData) {
            res.status(404).json({ message: 'No post matching this id found!' })
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post matching this id found!' })
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;