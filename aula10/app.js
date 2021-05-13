//Conexao com BD MySQL
const mysql = require('mysql');

//A partir do MySQL 8 apresenta o erro ao utilizar o usuário root para conexão, necessário criar novo usuário (instrução no Readme)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'celkeone',
    password: '123456',
    database: 'celke'
});

connection.connect(function(err){
    if (err) console.error('Erro ao realizar a conexão com BD: ' + err.stack); return;
});

connection.query("DELETE FROM users WHERE id = 3", function(err, result){
    if(!err){
        console.log("Usuario apagado com sucesso!");
    }else{
        console.log("Erro: o usuario não foi apagado com sucesso!");
    }
});
