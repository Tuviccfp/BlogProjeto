const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article); //UMA categoria tem muitos artigos. (Método de relacionamento 1 -> para -> N)
Article.belongsTo(Category); //UM Artigo pertence a uma categoria. (Método de relacionamento 1 -> para -> 1)

module.exports = Article;
