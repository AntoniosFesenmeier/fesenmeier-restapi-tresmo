/**
 * Created by Antonios Fesenmeier on 14.10.2016.
 */

var winston = require('winston');
var logger = new winston.Logger({
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4
    }
});

winston.config.addColors({
    fatal: 'magenta',
    error: 'red',
    info: 'green',
    warning: 'yellow',
    debug: 'grey'
});


if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    logger.add(winston.transports.Console, {
        level: process.env.LOG_LEVEL,
        colorize: true,
        timestamp: false,
        prettyPrint: true});

}

var log = function (module, level, message) {
    var date = new Date();
    var time = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    logger.log(level, time, 'MODULE='+module, ' --> ' + message);

};

module.exports = {

    getLogger: function (options) {
        return {
            fatal: function (message) {
                log(options.module, 'fatal', message);
            },
            error: function (message) {
                log(options.module, 'error', message);
            },
            info: function (message) {
                log(options.module, 'info', message);
            },
            warn: function (message) {
                log(options.module, 'warn', message);
            },
            debug: function (message) {
                log(options.module, 'debug', message);
            }
        };
    }
};


