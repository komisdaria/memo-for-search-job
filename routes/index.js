const { Router } = require('express');
const Memo = require('../models/memo.model');
const User = require('../models/user.model');

const router = Router();

router.get('/', async (req, res) => {
  // код для отображения только постов этого юзера
  // нижние 2 не нужны тк найдут всех юзеров и все их посты, а нужны только этого юзера
  // const memo = await Memo.find().populate('author');
  // const users = await User.find();
  const userOne = await User.findOne({ username: req.session.username });
  // const allUserMemo = await Memo.find({ author: users.id }).populate('author');
  const usersAllMemo = await Memo.find({ author: userOne.id }).populate('author');
  // req.session.users = users;
  // req.session.memo = memo;
  req.session.userOne = userOne;
  req.session.usersAllMemo = usersAllMemo;
  // console.log(userOne);
  // console.log(usersAllMemo);
  res.render('index', { usersAllMemo, userOne });
});

module.exports = router;
