/**
 * Created by Antonios Fesenmeier on 08.10.2016.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;


db.on('error', function(){
    console.log('A database error occured...');
});


db.once('open', function dbOpen(){
    console.log('Database successfully connected...');
});


exports.mongoose = mongoose;