const Sequelize = require("sequelize");

//Nome do meu banco de dados, usuário e senha do banco de dados.
const connection = new Sequelize('projetoblog', 'root', '16031997', {
    host: 'localhost', //Servidor que está acontencendo o meu MYSQL
    dialect: 'mysql', //Que tipo de banco de dados será utilizado
    timezone: '-03:00'
});

module.exports = connection;