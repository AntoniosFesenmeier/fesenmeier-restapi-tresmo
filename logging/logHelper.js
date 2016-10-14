/**
 * Created by Antonios Fesenmeier on 14.10.2016.
 */

module.exports = {
    getStatus: function (req, res) {
        return req.method + ' ' + req.url + ' ' + res.statusCode;
    }
};