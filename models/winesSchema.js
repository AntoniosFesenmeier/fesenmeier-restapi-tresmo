/**
 * Created by Antonios Fesenmeier on 08.10.2016.
 */

module.exports = (function winesSchema() {
    var mongoose = require('../db/db').mongoose;


    var schema = {
        id: {type: Number, required: true, unique: true},
        name: {type: String, required: true},
        year: {type: Number, required: true},
        country: {type: String, required: true},
        type: {type: String, required: true, enum: ['red', 'rose', 'white']},
        description: {type: String, required: false}
    };


    var collectionName = 'wines';
    var winesSchema = mongoose.Schema(schema);


    return mongoose.model(collectionName, winesSchema);
})();

