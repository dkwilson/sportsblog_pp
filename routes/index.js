const express = require('express');

const router = express.Router();

Article = require('../models/Articles');

router.get('/', (req, res, next) => {
  Article.getArticles((err, articles) => {
    res.render('index', {
      title: 'Index',
      articles,
    });
  }, 2);
});

module.exports = router;
