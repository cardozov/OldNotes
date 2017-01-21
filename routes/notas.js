var express = require('express');
var router = express.Router({mergeParams: true});

var mongoose = require('mongoose');
var Caderno = require('../models/Caderno.js');

router.use(function(req, res, next) {
  Caderno.findById(req.params.caderno, function(err, caderno) {
    if(err) return next(err);
    if(!caderno) return res.sendStatus(404);
    req.caderno = caderno;
    next();
  });
});

router.get('/', function(req, res, next) {
  var caderno = req.caderno;
  res.json(caderno.notas);
});

router.post('/', function(req, res, next) {
  var caderno = req.caderno;
  caderno.notas.push(req.body);
  caderno.save(function(err) {
    if(err) return next(err);
    res.json(caderno);
  });
});

router.put('/:id', function(req, res, next) {
  var caderno = req.caderno;
  var nota = caderno.notas.id(req.params.id);
  nota.titulo = req.body.titulo;
  nota.conteudo = req.body.conteudo;
  caderno.save(function(err, caderno) {
    if(err) return next(err);
    res.json(caderno);
  });
});

router.delete('/:id', function(req, res, next) {
  var caderno = req.caderno;
  caderno.notas.id(req.params.id).remove();
  caderno.save(function(err, caderno) {
    if(err) return next(err);
    res.json(caderno);
  });
});

module.exports = router;
