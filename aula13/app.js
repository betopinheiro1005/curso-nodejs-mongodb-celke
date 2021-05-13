const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Pagamento = require('./models/Pagamento');

// Configurações

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Rotas

app.get('/pagamento', function(req, res){
  // res.send("Página para listar os pagamentos");
  res.render('pagamento');
});

app.get('/cad-pagamento', function(req, res){
  // res.send("Formulário para cadastrar pagamento");
  res.render('cad-pagamento');
});

app.post('/add-pagamento', function(req, res){

  // var nome = req.body.nome;
  // var valor = req.body.valor;

  // res.send("Nome: " + nome + "<br>Valor: " + valor + "<br>");

  Pagamento.create({
    nome: req.body.nome,
    valor: req.body.valor
  }).then(function(){
    // res.send('Pagamento cadastrado com sucesso!');
    res.redirect('/pagamento');
  }).catch(function(erro){
    res.send('Erro: Pagamento não foi cadastrado com sucesso! ' + erro);
  });

});

const PORT = 8080;
app.listen(PORT);
console.log("Servidor rodando na porta " + PORT)