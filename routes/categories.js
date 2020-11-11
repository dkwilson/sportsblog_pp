const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category.js');

const router = express.Router();

// categories - get
router.get('/', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if (err) {
      res.send(err);
    }

    res.render('categories', {
      title: 'Categories',
      categories,
    });
  });
});

// add category - post
router.post(
  '/add',
  [
    body('title').not().isEmpty().trim(),
    body('description').not().isEmpty().trim(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add_category', {
        errors: errors.array(),
        title: 'Create Category',
      });
    } else {
      let category = new Category();
      category.title = req.body.title;
      category.description = req.body.description;

      Category.addCategory(category, (err, category) => {
        if (err) {
          res.send(err);
        }
        req.flash('success', 'Category Updated');
        res.redirect('/manage/categories');
      });
    }
  }
);

// edit category - post
router.post(
  '/edit/:id',
  [
    body('title').not().isEmpty().trim(),
    body('description').not().isEmpty().trim(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Category.getCategories((err, categories) => {
        res.render('add_category', {
          errors: errors.array(),
          title: 'Edit Category',
          categories,
        });
      });
    } else {
      let category = new Category();
      const query = { _id: req.params.id };
      const update = {
        title: req.body.title,
        description: req.body.description,
      };

      Category.updateCategory(query, update, {}, (err, category) => {
        if (err) {
          res.send(err);
        }
        req.flash('success', 'Category Updated');
        res.redirect('/manage/categories');
      });
    }
  }
);

// delete category -- Delete
router.delete('/delete/:id', (req, res, next) => {
  const query = { _id: req.params.id };

  Category.removeCategory(query, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.status(200);
  });
});

module.exports = router;
