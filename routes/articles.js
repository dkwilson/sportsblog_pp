const express = require('express');

const router = express.Router();

const Article = require('../models/Articles');
const Category = require('../models/Category');

const { body, validationResult } = require('express-validator');

router.get('/', (req, res, next) => {
  Article.getArticles((err, articles) => {
    res.render('articles', {
      title: 'Articles',
      articles,
    });
  });
});

router.get('/show/:id', (req, res, next) => {
  Article.getArticleById(req.params.id, (err, article) => {
    res.render('article', {
      title: 'Article',
      article,
    });
  });
});

// get category by id
router.get('/category/:category_id', (req, res, next) => {
  Article.getCategoryArticles(req.params.category_id, (err, articles) => {
    Category.getCategoryById(req.params.category_id, (err, category) => {
      res.render('articles', {
        title: category.title + 'Articles',
        articles,
      });
    });
  });
});

// add article - POST
router.post(
  '/add',
  [
    body('title').not().isEmpty().trim(),
    body('author').not().isEmpty().trim(),
    body('category').not().isEmpty().trim(),
    body('body').not().isEmpty().trim(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      Category.getCategories((err, categories) => {
        res.render('add_article', {
          errors: errors.array(),
          title: 'Create Article',
          categories,
        });
      });
    } else {
      let article = new Article();
      article.title = req.body.title;
      article.subtitle = req.body.subtitle;
      article.category = req.body.category;
      article.body = req.body.body;
      article.author = req.body.author;

      Article.addArticle(article, (err, article) => {
        if (err) {
          res.send(err);
        }
        req.flash('success', 'Article Added');
        res.redirect('/manage/articles');
      });
    }
  }
);

// edit article - POST
router.post(
  '/edit/:id',
  [
    body('title').not().isEmpty().trim(),
    body('author').not().isEmpty().trim(),
    body('category').not().isEmpty().trim(),
    body('body').not().isEmpty().trim(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      Category.getCategories((err, categories) => {
        res.render('edit_article', {
          errors: errors.array(),
          title: 'Edit Article',
          categories,
        });
      });
    } else {
      let article = new Article();
      const query = { _id: req.params.id };
      const update = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        category: req.body.category,
        body: req.body.body,
        author: req.body.author,
      };

      Article.updateArticle(query, update, {}, (err, article) => {
        if (err) {
          res.send(err);
        }
        res.flash('success', 'Article Updated');
        res.redirect('/manage/articles');
      });
    }
  }
);

// delete category -- Delete
router.delete('/delete/:id', (req, res, next) => {
  const query = { _id: req.params.id };

  Article.removeArticle(query, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.status(200);
  });
});

router.post(
  '/comments/add/:id',
  [
    body('comment_subject').not().isEmpty().trim(),
    body('comment_author').not().isEmpty().trim(),
    body('comment_body').not().isEmpty().trim(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Article.getArticleById(req.params.id, (err, article) => {
        res.render('article', {
          title: 'Article',
          errors: errors.array(),
          article,
        });
      });
    } else {
      let article = new Article();
      let query = { _id: req.params.id };
      let comment = {
        comment_subject: req.body.comment_subject,
        comment_author: req.body.comment_author,
        comment_body: req.body.comment_body,
        comment_email: req.body.comment_email,
      };

      Article.addComment(query, comment, (err, article) => {
        res.redirect('/articles/show/' + req.params.id);
      });
    }
  }
);

module.exports = router;
