const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const moment = require("moment");
const Pagamento = require('./models/Pagamento');

// Configurações

app.engine('handlebars', handlebars(
    {
      defaultLayout: 'main',
      runtimeOptions: { 
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      },
      helpers: {
        formatDate: (date) => {
          return moment(date).format('DD/MM/YYYY')
        }
      }
    })
)

app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Rotas

app.get('/pagamento', function(req, res){
  Pagamento.findAll({order: [['id', 'DESC']]}).then(function(pagamentos){
    res.render('pagamento', {pagamentos: pagamentos});
  });
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

app.get('/del-pagamento/:id', function(req, res){
  Pagamento.destroy({
    where: {'id': req.params.id}
  }).then(function(){
    // res.send("Pagamento apagado com sucesso!")
    res.redirect('/pagamento');
  }).catch(function(erro){
    res.send("Pagamento não foi apagado com sucesso! " + erro)
  });
});

const PORT = 8080;
app.listen(PORT);
console.log("Servidor rodando na porta " + PORT)