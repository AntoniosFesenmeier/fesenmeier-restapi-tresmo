/**
 * Created by Antonios Fesenmeier on 08.10.2016.
 */
/*eslint no-console: ["error", { allow: ["log"] }] */
function WinesController() {
    var that = this;
    var Wines = require('../models/winesSchema');


    that.getAllWines = function (req, res, next) {
        Wines.find({}, function (err, result) {
            if (err) {
                console.log(err);
                return res.send(400, {'error': err});
            } else {
                return res.send(200, result);
            }
        });
        return next();
    };


    that.getWineById = function (req, res, next) {
        Wines.find({id: parseInt(req.params.id)}, function (err, result) {
            if (err) {
                return res.send(400, {error: 'UNKOWN_OBJECT'});
            } else {
                if (result.length > 0) {
                    return res.send(200, result);
                } else {
                    return res.send(400, {error: 'UNKOWN_OBJECT'});
                }
            }
        });
        return next();
    };


    that.createWine = function (req, res, next) {
        var wine = {};
        wine.id = parseInt(req.body.id);
        wine.name = req.body.name;
        wine.year = parseInt(req.body.year);
        wine.country = req.body.country;
        wine.type = req.body.type;
        wine.descritpion = req.body.descritpion;

        Wines.create(wine, function (err, result) {
            if (err) {
                console.log(err);
                return res.send(400, {'error': err});
            } else {
                return res.send(201, result);
            }
        });
        return next();
    };


    that.editWine = function (req, res, next) {
        Wines.findOneAndUpdate({id: parseInt(req.params.id)},
            {
                $set: {
                    id: parseInt(req.params.id),
                    name: req.body.name,
                    year: parseInt(req.body.year),
                    country: req.body.country,
                    type: req.body.type,
                    description: req.body.descritpion
                }
            },
            {new: true},
            function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(400, {'error': err});
                } else {
                    if (result) {
                        return res.send(200, result);
                    } else {
                        return res.send(400, {error: 'UNKOWN_OBJECT'});
                    }
                }
            });
        return next();
    };


    that.delWine = function (req, res, next) {
        Wines.findOneAndRemove({id: req.params.id}, function (err, result) {
            if (err) {
                console.log(err);
                return res.send(400, {'error': err});
            } else {
                if (result) {
                    return res.send(200, {success: true});
                } else {
                    return res.send(400, {error: 'UNKOWN_OBJECT'});
                }
            }
        });
        return next();
    };


}


module.exports = new WinesController();
