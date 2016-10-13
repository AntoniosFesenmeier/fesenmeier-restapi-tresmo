/**
 * Created by Antonios Fesenmeier on 07.10.2016.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
var restify = require('restify');
var wines = require('./controller/wines');
var server = restify.createServer();


server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    return next();
});


server.get('api/v1/wines', wines.getAllWines);
server.get('api/v1/wines/:id', wines.getWineById);
server.post('api/v1/wines', wines.createWine);
server.put('api/v1/wines/:id', wines.editWine);
server.del('api/v1/wines/:id', wines.delWine);

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log('Server started at Port: ' + port);
});


module.exports = server;

