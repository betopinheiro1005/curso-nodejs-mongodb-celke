const express = require("express");

const app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + "/src/index.html");
});

app.get('/contato', function(req, res){
    res.send("Página de contato");
});

app.get('/sobre-empresa', function(req, res){
    res.sendFile(__dirname + "/src/sobre-empresa.html");
});

app.get('/blog', function(req, res){
    res.send("Página do blog");
});

// Iniciando o servidor

const PORT = 8081;
app.listen(PORT);
console.log("Servidor rodando na porta " + PORT + "!");