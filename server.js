/**
 * Created by Antonios Fesenmeier on 07.10.2016.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
var restify = require('restify');
var config = require('./config');
var wines = require('./controller/wines');
var server = restify.createServer();


server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    return next();
});


server.get('api/v1/wines', wines.getAllWines);
server.get('api/v1/wines/:id', wines.getWineById);
server.post('api/v1/wines', wines.createWine);
server.put('api/v1/wines/:id', wines.editWine);
server.del('api/v1/wines/:id', wines.delWine);


server.listen(config.port, function () {
    console.log('Server started at Port: ' + config.port);
});


/*
 OPTIMIERUNGSMÖGLICHKEITEN
 - Erfassen der aufgerufenen Call in einem Log-File
 - HATEOAS einführen
 - ESLINT an Tresmo GuideLines anpassen

 */



/*
TODO ENV Configurationen ???
TODO Config nach 12 FACTOR APP use environment variables to configure your application - evtl: http://stackoverflow.com/questions/8332333/node-js-setting-up-environment-specific-configs-to-be-used-with-everyauth
TODO Abhängigkeiten extern legen
TODO HEROKU
TODO TESTS!!!



 */