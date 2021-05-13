var discountFunc = require('./modules/calDiscount');

console.log("Gerenciador Financeiro");

var client = "César Szpak";

console.log("Cliente: " + client);

valProduct = 100;
valDiscount = 37;

var finalValue = discountFunc(valProduct, valDiscount);

console.log("Valor final do produto: R$ " + finalValue);