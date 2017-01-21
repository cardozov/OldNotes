var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Caderno = require('../models/Caderno.js');
var notas = require('./notas');

router.get('/', function(req, res, next) {
  Caderno.find({}, function(err, cadernos) {
    if(err) return next(err);
    res.json(cadernos);
  });
});

router.get('/:id', function(req, res, next) {
  Caderno.findById(req.params.id, function(err, caderno) {
    if(err) return next(err);
    res.json(caderno);
  });
});

router.post('/', function(req, res, next) {
  var caderno = new Caderno(req.body);
  Caderno.create(caderno, function(err, caderno) {
    if(err) return next(err);
    res.json(caderno);
  });
});

router.put('/:id', function(req, res, next) {
  Caderno.findByIdAndUpdate(req.params.id, req.body, function(err, caderno) {
    if(err) return next(err);
    res.json(caderno);
  });
});

router.delete('/:id', function(req, res, next) {
  Caderno.findByIdAndRemove(req.params.id, req.body, function(err, caderno) {
    if(err) return next(err);
    res.json(caderno);
  });
});

router.use('/:caderno/notas', notas);

module.exports = router;
