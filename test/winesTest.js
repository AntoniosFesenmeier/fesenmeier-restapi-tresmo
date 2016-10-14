/**
 * Created by Antonios Fesenmeier on 09.10.2016.
 */
/* eslint-disable */

var mongoose = require('mongoose');
var Wines = require('../models/winesSchema');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();


chai.use(chaiHttp);


describe('drop wines collection', function(){
    Wines.collection.drop();
});


describe('getAllWines', function () {
    it('should list all wines on /wines GET', function (done) {
        chai.request(server)
            .get('/api/v1/wines')
            .end(function (err, res) {
                res.body.length.should.equal(0);
                res.should.have.status(200);
                done();
            });
    });
});


describe('getAllWines', function () {
    it('should fail caused by an invalid filter on /wines?filter=value GET', function (done) {
        chai.request(server)
            .get('/api/v1/wines?filter=invalid')
            .end(function (err, res) {
                res.body.error.should.equal('UNKNOWN_FILTER');
                err.should.have.status(400);
                done();
            });
    });
});


describe('createWine', function () {
    it('should create a single wine on /wines POST', function (done) {
        var testWine = {
            id: 10001,
            name: 'test wine',
            year: 2016,
            country: 'germany',
            type: 'red',
            description: 'sample description'
        };
        chai.request(server)
            .post('/api/v1/wines')
            .send(testWine)
            .end(function (err, res) {
                res.body.id.should.equal(testWine.id);
                res.body.name.should.equal(testWine.name);
                res.body.type.should.equal(testWine.type);
                res.body.year.should.equal(testWine.year);
                res.body.country.should.equal(testWine.country);
                res.body.description.should.equal(testWine.description);
                res.should.have.status(201);
                done();
            });
    });
});


describe('getAllWines', function () {
    it('should return wine by an filter on /wines?country=germany GET', function (done) {
        chai.request(server)
            .get('/api/v1/wines?country=germany')
            .end(function (err, res) {
                res.body[0].country.should.equal('germany');
                res.should.have.status(200);
                done();
            });
    });
});


describe('createWine', function () {
    it('should return validation error on /wines POST', function (done) {
        var invalidWine = {
            id: 10002,
            name: ' wine',
            year: '',
            country: '',
            type: '',
            description: 'sample description'
        };

        chai.request(server)
            .post('/api/v1/wines')
            .send(invalidWine)
            .end(function (err, res) {
                err.should.have.status(400);
                res.body.error.name.should.equal('ValidationError');
                done();
            });
    });
});


describe('editWine', function () {
    it('should update a single wine on /wines/:id PUT', function (done) {
        var editWine = {
            id: 10001,
            name: 'Merlot',
            year: 2010,
            country: 'France',
            type: 'red',
            description: 'just yummie!'
        };

        chai.request(server)
            .put('/api/v1/wines/10001')
            .send(editWine)
            .end(function (err, res) {
                res.body.id.should.equal(editWine.id);
                res.body.name.should.equal(editWine.name);
                res.body.type.should.equal(editWine.type);
                res.body.year.should.equal(editWine.year);
                res.body.country.should.equal(editWine.country);
                res.body.description.should.equal(editWine.description);
                res.should.have.status(200);
                done();
            });
    });
});


describe('editWine', function () {
    it('should return 400 UNKNOWN_OBJECT on update a non existing wine on /wines/:id PUT', function (done) {
        var editWine = {
            id: 10001,
            name: 'Merlot',
            year: 2010,
            country: 'France',
            type: 'red',
            description: 'just yummie!'
        };

        chai.request(server)
            .put('/api/v1/wines/-1')
            .send(editWine)
            .end(function (err, res) {
                res.body.error.should.equals('UNKNOWN_OBJECT');
                err.should.have.status(400);
                done();
            });
    });
});


describe('getWinesById', function () {
    it('should get a single wine by id on /wines GET', function (done) {
        chai.request(server)
            .get('/api/v1/wines/10001')
            .end(function (err, res) {
                res.body.length.should.equal(1);
                res.body[0].id.should.equal(10001);
                res.should.have.status(200);
                done();
            });
    });
});


describe('getWinesById', function () {
    it('should get a 400 UNKNOWN_OBJECT on getting a non existing wine by id on /wines GET', function (done) {
        chai.request(server)
            .get('/api/v1/wines/-1')
            .end(function (err, res) {
                res.body.error.should.equal('UNKNOWN_OBJECT');
                res.should.have.status(400);
                done();
            });
    });
});


describe('deleteWine', function () {
    it('should delete a single wine on /wines/:id DELETE', function (done) {

        chai.request(server)
            .delete('/api/v1/wines/10001')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});

describe('deleteWine', function () {
    it('should return 400 on delete a non existing wine on /wines/:id DELETE', function (done) {

        chai.request(server)
            .delete('/api/v1/wines/-1')
            .end(function (err, res) {
                res.body.error.should.equals('UNKNOWN_OBJECT');
                res.should.have.status(400);
                done();
            });
    });
});






