/**
 * Created by Antonios Fesenmeier on 07.10.2016.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
var restify = require('restify');
//var config = require('./config');
var wines = require('./controller/wines');
var server = restify.createServer();


server.use(restify.bodyParser());
server.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    return next();
});


server.get('api/v1/wines', wines.getAllWines);
server.get('api/v1/wines/:id', wines.getWineById);
server.post('api/v1/wines', wines.createWine);
server.put('api/v1/wines/:id', wines.editWine);
server.del('api/v1/wines/:id', wines.delWine);

var port = process.env.PORT || process.env.TRESMO_PORT;
server.listen(port, function () {
    console.log('Server started at Port: ' + port);
});


module.exports = server;

/*
TODO
    Configuration nach 12 Factor App (http://stackoverflow.com/questions/8332333/node-js-setting-up-environment-specific-configs-to-be-used-with-everyauth) (https://www.youtube.com/watch?v=te5dA3xpgK0)
    Testdatenbank ebenfalls anch 12 Factor Configuration
    HEROKU
    Charset setzen auf UTF8 für alle calls
 */