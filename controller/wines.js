/**
 * Created by Antonios Fesenmeier on 08.10.2016.
 */

function WinesController() {
    var that = this;
    var Wines = require('../models/winesSchema');

    var log = require('../logging/logger');
    var logger = log.getLogger({module: 'WinesController'});
    var logHelper = require('../logging/logHelper');

    that.getAllWines = function (req, res, next) {
        res.charSet('utf-8');

        var error;
        var invalidFilters = [];

        for (var propName in req.query) {
            if (propName !== 'name' && propName !== 'type' && propName !== 'year' && propName !== 'country') {
                invalidFilters.push(propName);
            }
        }

        if (invalidFilters.length > 0) {
            error = {error: 'UNKNOWN_FILTER'};
            error.invalidFilters = invalidFilters;
        }


        Wines.find(req.query, function (err, result) {
            if (err) {
                logger.error(logHelper.getStatus(req, res) + ' ' + err);
                return res.send(400, {error: err});
            } else if (error) {
                res.statusCode = 400;
                logger.error(logHelper.getStatus(req, res) + ' ' + JSON.stringify(error));
                return res.send(400, error);
            } else {
                logger.info(logHelper.getStatus(req, res));
                return res.send(200, result);
            }
        });
        return next();
    };


    that.getWineById = function (req, res, next) {
        res.charSet('utf-8');
        Wines.find({id: parseInt(req.params.id)}, function (err, result) {
            if (err) {
                logger.error(logHelper.getStatus(req, res) + ' ' + err);
                return res.send(400, {error: err});
            } else {
                if (result.length > 0) {
                    logger.info(logHelper.getStatus(req, res));
                    return res.send(200, result);
                } else {
                    res.statusCode = 400;
                    logger.error(logHelper.getStatus(req, res) + ' UNKNOWN_OBJECT');
                    return res.send(400, {error: 'UNKNOWN_OBJECT'});
                }
            }
        });
        return next();
    };


    that.createWine = function (req, res, next) {
        res.charSet('utf-8');
        var wine = {};
        wine.id = parseInt(req.body.id);
        wine.name = req.body.name;
        wine.year = parseInt(req.body.year);
        wine.country = req.body.country;
        wine.type = req.body.type;
        wine.description = req.body.description;

        Wines.create(wine, function (err, result) {
            if (err) {
                logger.error(logHelper.getStatus(req, res) + ' ' + err);
                return res.send(400, {'error': err});
            } else {
                logger.info(logHelper.getStatus(req, res));
                return res.send(201, result);
            }
        });
        return next();
    };


    that.editWine = function (req, res, next) {
        res.charSet('utf-8');
        Wines.findOneAndUpdate({id: parseInt(req.params.id)},
            {
                $set: {
                    id: parseInt(req.params.id),
                    name: req.body.name,
                    year: parseInt(req.body.year),
                    country: req.body.country,
                    type: req.body.type,
                    description: req.body.description
                }
            },
            {new: true},
            function (err, result) {
                if (err) {
                    logger.error(logHelper.getStatus(req, res) + ' ' + err);
                    return res.send(400, {error: err});
                } else {
                    if (result) {
                        logger.info(logHelper.getStatus(req, res));
                        return res.send(200, result);
                    } else {
                        logger.error(logHelper.getStatus(req, res) + ' UNKNOWN_OBJECT');
                        return res.send(400, {error: 'UNKNOWN_OBJECT'});
                    }
                }
            });
        return next();
    };


    that.delWine = function (req, res, next) {
        res.charSet('utf-8');
        Wines.findOneAndRemove({id: req.params.id}, function (err, result) {
            if (err) {
                logger.error(logHelper.getStatus(req, res) + ' ' + err);
                return res.send(400, {error: err});
            } else {
                if (result) {
                    logger.info(logHelper.getStatus(req, res));
                    return res.send(200, {success: true});
                } else {
                    logger.error(logHelper.getStatus(req, res) + ' UNKNOWN_OBJECT');
                    return res.send(400, {error: 'UNKNOWN_OBJECT'});
                }
            }
        });
        return next();
    };


}


module.exports = new WinesController();
