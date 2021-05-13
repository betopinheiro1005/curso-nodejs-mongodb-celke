const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Rotas

app.get('/pagamento', function(req, res){
  // res.send("Página para listar os pagamentos");
  res.render('pagamento');
});

app.get('/add-pagamento', function(req, res){
  // res.send("Formulário para cadastrar pagamento");
  res.render('add-pagamento');
});


const PORT = 8080;
app.listen(PORT);
console.log("Servidor rodando na porta " + PORT)