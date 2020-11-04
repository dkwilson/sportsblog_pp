const express = require('express');
const Category = require('../models/Category');

const router = express.Router();


router.get('/articles', (req, res, next) => {
    res.render('manage_articles', { title: "Manage Articles"});
})

router.get('/categories', (req, res, next) => {
    Category.getCategories((err, categories) => {
        if(err){
            res.send(err);
        }

        res.render('manage_categories', { 
            title: 'Categories',
            categories
        });
    });
})

router.get('/articles/add', (req, res, next) => {
    res.render('add_article', { title: 'Create Article' });
});

router.get('/categories/add', (req, res, next) => {
    res.render('add_category', { title: 'Create Category'});
})

router.get('/articles/edit/:id', (req, res, next) => {
    res.render('edit_articles', { title: "Edit Article"});
})

router.get('/categories/edit/:id', (req, res, next) => {
    Category.getCategoryById(req.params.id, (err, category) => {
        if(err){
            res.send(err)
        }
        res.render('edit_category', { 
            title: "Edit Category",
            category
    })
    });   
})

module.exports = router;