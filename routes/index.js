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

module.exports = router;
