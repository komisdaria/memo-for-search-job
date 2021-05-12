const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const router = Router();

router
  .route('/')
  .get((_req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser
        && (await bcrypt.compare(password, existingUser.password))) {
        req.session.username = existingUser.username;
        req.session.user_status = 'User';
      }
      res.redirect('/profile');
    } catch (error) {
      res.render('error', {
        errorMessage: 'Что-то пошло не так!',
        usernameWrong: 'Логин должен быть уникальным',
        passwordWrong: 'Поле для ввода пароля не должно быть пустым',
      });
    }
  });

module.exports = router;
