const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
const session = require('express-session');

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_text", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title", "post_id"],
          },
        },
      ],
    });

    if (!userData) {
      res.status(404).json({ message: "No user matching this id!" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    .then(userData => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

    res.status(200).json(userData);
      });
    })
    
    res.status(500).json(err);
  }
);

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email },
    });

    if (!userData) {
      res.status(404).json({ message: "No user with that email address!" });
      return;
    }

    const password = userData.checkPassword(req.body.password);

    if (!password) {
      res.status(404).json({ message: "Invalid password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
    });

    res.json({ message: "You are now logged in!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
