const { Router } = require('express');
const Memo = require('../models/memo.model');
const User = require('../models/user.model');

const router = Router();

router.get('/', async (req, res) => {
  const memo = await Memo.find().populate('author');
  // console.log(memo);
  const users = await User.find();
  req.session.users = users;
  req.session.memo = memo;
  res.render('index', { memo, users });
});

module.exports = router;
