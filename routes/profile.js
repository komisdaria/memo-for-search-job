const { Router } = require('express');
const User = require('../models/user.model');
const Memo = require('../models/memo.model');

const router = Router();

// для защиты от неавторизованных пользователей
function protect(req, res, next) {
  if (!req.session.username) return res.redirect('/login');
  next();
}

router
  .route('/')
  .get(protect, async (req, res) => {
    // console.log('WE ARE PROFILE !!!!!');
    const user = await User.findOne({ username: req.session.username });
    // console.log('НАЙТИ ЮЗЕРА В ПРОФАЙЛЕ: ', user);
    // await User.findById(id).populate('username');
    const allUserMemo = await Memo.find({ author: user.id }).populate('author');
    res.render('profile', { user, allUserMemo });
  })
  .post(async (req, res) => {
    const user = await User.findOne({ username: req.session.username });
    await Memo.create({
      author: user.id,
      company: req.body.company,
      adress: req.body.adress,
      date: req.body.datetime,
      text: req.body.text,
      infoAboutCompany: req.body.infoAboutCompany,
      myQuestions: req.body.myQuestions,
      companyQuestions: req.body.companyQuestions,
      salary: req.body.salary,
      withWhoWasInterview: req.body.withWhoWasInterview,
      contactInfo: req.body.contactInfo,
      memoAfterInterview: req.body.memoAfterInterview,
    });
    res.redirect('/profile');
  });

router.route('/:id').delete(async (req, res) => {
  await Memo.findByIdAndDelete(req.params.id);
  res.sendStatus(200).end();
});

router.route('/:id/edit').put(async (req, res) => {
  if (req.session.username) {
    const { findTextForUpdate } = req.body;
    // console.log(' findTextForUpdate ', findTextForUpdate);
    const editedMemo = await Memo.findByIdAndUpdate(
      req.params.id,
      { text: findTextForUpdate },
      { new: true },
    );
    return res.json(editedMemo);
  }
  return res.render('error', { message: 'Что-то пошло не так.' });
});

module.exports = router;
