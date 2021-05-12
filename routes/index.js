const { Router } = require('express');
const Memo = require('../models/memo.model');
const User = require('../models/user.model');

const router = Router();

router.get('/', async (req, res) => {
  // код для отображения только постов этого юзера
  // нижние 2 не нужны тк найдут всех юзеров и все их посты, а нужны только этого юзера

  // нужно
  const userOne = await User.findOne({ username: req.session.username });
  // const usersAllMemo = await Memo.find({ author: userOne.id }).populate('author');
  const usersAllMemo = await Memo.find({ author: userOne });
  req.session.userOne = userOne;
  req.session.usersAllMemo = usersAllMemo;
  // console.log(userOne);
  // console.log(usersAllMemo);
  res.render('index', { usersAllMemo, userOne });
});

router
  .route('/edit/:id')
  .get(async (req, res) => {
    // console.log('req.params.id', req.params.id);
    const idMemo = req.params.id;
    // console.log('idMemo ', idMemo);
    const user = await User.findOne({ username: req.session.username });
    // console.log('НАЙТИ ЮЗЕРА: ', user);
    // await User.findById(idMemo).populate('username');
    const editMemo = await Memo.findOne({ _id: idMemo });
    // console.log('firstEditMemo ', editMemo);
    res.render('edit', { user, editMemo });
  })
  .post(async (req, res) => {
    // console.log('req.params.id', req.params.id);
    const idMemo = req.params.id;
    // console.log('idMemo2 from post', idMemo);
    const user = await User.findOne({ username: req.session.username });
    // console.log('user from post: ', user);
    const editMemo = await Memo.findOne({ _id: idMemo });
    // console.log('MEMO POST ', editMemo);
    res.render('edit', { editMemo });
  });

module.exports = router;
