const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password']}
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password']},
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'created_at']
                }
            ]
        });

        if (!userData) {
            res.status(404).json({ message: 'No user matching this id!'})
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findByPk({
            where: {
                email: req.body.email,
            }
        });

        if (!userData) {
            res.status(404).json({ message: 'No user with that email address!'})
            return;
        }

        const password = userData.checkPassword(req.body.password);

        if (!password) {
            res.status(404).json({ message: 'Invalid password!'})
            return;
        }

        res.json({ message: 'You are now logged in!' })

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;