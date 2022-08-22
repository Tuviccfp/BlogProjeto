const express = require("express");
const router = express.Router();
const categoryModel = require('./Category');
const alert = require('alert');
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => { //Cadastrando nova categoria
    res.render('./admin/categories/new');
});

router.post('/categories/save', (req, res) => { //Salvando nova categoria no banco de dados
    var title = req.body.title;
    
    if(title != undefined){
       
        categoryModel.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/admin/categories') 
        })

    }else{
        res.redirect('/admin/categories/new');
        alert("Não é possível fazer o cadastro do título")
    }

})

router.get('/admin/categories', (req, res) => { //Listando todas as categorias.
    categoryModel.findAll({ raw: true, order: [ ["id","DESC"] ]})
    .then((categorias) => {
        res.render('admin/categories/index', {
            categories: categorias
        })   
    })
})

router.post('/admin/categories/delete', (req, res) => { //Deletando categoria do banco de dados.
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            categoryModel.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect('/admin/categories')
            })
        } 
        else {res.redirect('/admin/categories')}
    } 
    else {res.redirect('/admin/categories')}
    
});

router.get('/admin/categories/edit/:id', (req, res) => { //Formulário para editar categoria
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect('/admin/categories');
    };

    categoryModel.findOne({
        where: {
            id: id
        }
    }).then((categories) => {
        if (categories != undefined) { 
            res.render('admin/categories/edit', { 
               categories: categories  
            })
        }else {
            res.redirect('/admin/categories') 
        }}).catch((erro => {
            res.redirect('/admin/categories')
        }));
})

router.post('/categories/update', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    
    categoryModel.update({title, title} , {
        where: {
            id: id 
        }
    }).then(()=>{
        res.redirect('/admin/categories')
    })
})

module.exports = router                                       