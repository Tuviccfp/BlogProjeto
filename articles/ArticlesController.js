const express = require('express');
const router = express.Router();
const categoryModel = require('../categories/Category');
const articleModel = require('./Article');
const slugify = require('slugify');


router.get('/admin/articles/new', (req, res) => {
    categoryModel.findAll().then((categories) => {
        res.render('./admin/articles/new', {categories: categories});
    })
});

router.post('/articles/save', (req , res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category; //variável que vai identificar o artigo com a categoria baseado no id.

    articleModel.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(res.redirect('/admin/articles'));
});

router.get('/admin/articles', (req, res) => {
    articleModel.findAll({ raw: true, order: [ ["id","DESC"] ] }).
    then((article) => {
        res.render('./admin/articles/index', {
            article: article
        }) 
    })
});



module.exports = router
  