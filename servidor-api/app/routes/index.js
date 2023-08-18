/* Código simplório, apenas para fornecer o serviço para a aplicação */

var api = require('../api');

module.exports  = function(app) {
        
    app.route('/data')
        .get(api.data);          
};