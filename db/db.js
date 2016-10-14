/**
 * Created by Antonios Fesenmeier on 08.10.2016.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;

var log = require('../logging/logger');
var logger = log.getLogger({module: 'server'});


db.on('error', function(){
    logger.fatal('A database error occured...');
});


db.once('open', function dbOpen(){
    logger.info('Database successfully connected...');
});


exports.mongoose = mongoose;