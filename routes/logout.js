const { Router } = require('express');

const router = Router();

router
  .route('/')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie();
    res.redirect('/');
  });

module.exports = router;
