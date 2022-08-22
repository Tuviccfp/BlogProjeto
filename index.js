const express = require("express");
const blog = express();
const bodyParser = require('body-parser'); //Traduz os dados recebidos no front em uma estrutura javascript. Responsável por receber dados no NODEJS dos formulários recebidos 
const connection = require('./database/database'); //Recebendo minha conexão do meu banco de dados via outro arquivo. (Via exportação)
const categoriesController = require('./categories/CategoriesController'); //Importação da minha rota de categorias
const articlesController = require('./articles/ArticlesController'); //Importação da minha rota de artigos
const categoryModel = require('./categories/Category'); //Importação do meu modelo de categoria no banco de dados
const articleModel = require('./articles/Article'); //Importação do meu modelo de artigo no banco de dados
//const tinymce = require('tinymce');

/*Ferramentas a serem utilizadas*/
blog.set('view engine', 'ejs'); //View Engine
blog.use(express.static('public')); //Express utilizando arquivos estáticos (css, js, img)
blog.use(bodyParser.urlencoded( {extended: false} )); //Body Parser
blog.use(bodyParser.json());

/*DataBase*/
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados');
    })
    .catch((error) => {
        console.error('Conexão com o bando de dados não estabelecida', error);
    });

/*Utilização de rotas*/
blog.use('/', categoriesController); //Rota de categorias
blog.use('/', articlesController); //Rota de artigos


//Inicialização do servidor e a sua porta.
blog.listen(8080, () => {
    console.log('Servidor do blog on!!!');
});