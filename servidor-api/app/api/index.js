/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}


api.data = function(req, res) {

    res.json([
        { amount: 200.5, quantity: 2 },
        { amount: 100.2, quantity: 5 },
        { amount: 50.5, quantity: 1 },
        { amount: 70.5, quantity: 2 }
    ]);
    
};

module.exports = api;
