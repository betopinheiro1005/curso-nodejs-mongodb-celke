const http = require('http');

const PORT = 8081;

http.createServer(function(req, res){
    res.end("Gerenciador Financeiro");
}).listen(PORT);

console.log("Servidor rodando na porta " + PORT + "!");