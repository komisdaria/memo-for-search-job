const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/user.model');

const saltRound = 7;

const router = Router();

router
  .route('/')
  .get((_req, res) => {
    res.render('registration');
  })
  .post(async (req, res) => {
    try {
      const {
        username,
        email,
        password: plainPass,
      } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        const password = await bcrypt.hash(plainPass, saltRound);
        const newUser = await User.create({
          username,
          email,
          password,
        });
        req.session.username = newUser.username;
        req.session.user_status = 'User';
        res.render('profile', { username });
      }
    } catch (error) {
      res.render('error', {
        errorMessage: 'Что-то пошло не так!',
        usernameWrong: 'Логин должен быть уникальным',
        passwordWrong: 'Поле для ввода пароля не должно быть пустым',
      });
    }
  });

module.exports = router;
