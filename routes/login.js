const { Router } = require('express');
const bcrypt = require('bcrypt');

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
// Google Auth
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '800846002693-klfba1bl1aagbdkep5qmocftrn06c0kb.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
const User = require('../models/user.model');

const router = Router();

router
  .route('/')
  .get((req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    const { token } = req.body;
    console.log('token: ', token);

    fs.writeFile("token.txt", token, function(error){
      if(error) throw error; // если возникла ошибка
      console.log("Асинхронная запись файла завершена. Содержимое файла:");
      let data = fs.readFileSync("token.txt", "utf8");
      console.log(data);  // выводим считанные данные
  });

    /// enter form
    const { email, password } = req.body;
    const existingUserForm = await User.findOne({ email });
    if (existingUserForm
      && (await bcrypt.compare(password, existingUserForm.password))) {
      req.session.username = existingUserForm.username;
      req.session.user_status = 'User';
      res.redirect('/profile');
    }

    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload.sub;
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
      // console.log(payload.name);
      // console.log(payload.email);

      const emailUser = payload.email;
      console.log('emailUser===>', emailUser);
      const existingUser = await User.findOne({ email: emailUser });
      console.log('existingUser ', existingUser);
      if (existingUser) {
        req.session.username = existingUser.username;
        req.session.user_status = 'User';
        return res.redirect('/profile');
      }
      res.render('error', {
        errorMessage: 'Что-то пошло не так!',
        usernameWrong: 'Логин должен быть уникальным',
        passwordWrong: 'Поле для ввода пароля не должно быть пустым',
      });
    }
    verify()
      .then(() => {
      }).catch(console.error);
  });

function checkAuthenticated(req, res, next) {
  const token = req.cookies['session-token'];

  const user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    user.name = payload.name;
    user.email = payload.email;
  }
  verify()
    .then(() => {
      next();
    })
    .catch((err) => {
      res.redirect('/login');
    });
}

// router
//   .route('/')
//   .get((req, res) => {
//     res.render('login');
//   })
//   .post((req, res) => {

//
// router
//   .route('/')
//   .get((req, res) => { // не используемый req: _ или _req
//     res.render('login');
//   })
//   .post(async (req, res) => {

// try {
//   const { email, password } = req.body;
//   const existingUser = await User.findOne({ email });
//   if (existingUser
//     && (await bcrypt.compare(password, existingUser.password))) {
//     req.session.username = existingUser.username;
//     req.session.user_status = 'User';
//   }
//   res.redirect('/profile');
// } catch (error) {
//   res.render('error', {
//     errorMessage: 'Что-то пошло не так!',
//     usernameWrong: 'Логин должен быть уникальным',
//     passwordWrong: 'Поле для ввода пароля не должно быть пустым',
//   });
// }
// });

module.exports = router;
