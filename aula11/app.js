const Sequelize = require('sequelize');

// Passing parameters separately (other dialects)
const sequelize = new Sequelize('celke', 'celkeone', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

// Testando a conexão com o BD

sequelize.authenticate().then(function(){
    console.log("Conexão realizada com sucesso!");
}).catch(function(err){
    console.log("Erro ao realizar a conexão com o BD: " + err);
});

const Pagamento = sequelize.define('pagamentos', {
  // Model attributes are defined here
  nome: {
    type: Sequelize.STRING
  },
  valor: {
    type: Sequelize.DOUBLE
  }
});

// Criar tabela com Sequelize
// Pagamento.sync({force: true});

Pagamento.create({
    nome: "Energia",
    valor: 220
}).then(function(){
    console.log("Pagamento cadastrado com sucesso!");
}).catch(function(err){
    console.log("Erro ao cadastrar pagamento: " + err)
});
