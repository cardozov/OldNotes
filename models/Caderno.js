var mongoose = require('mongoose');

var NotaSchema = new mongoose.Schema({
  titulo: { type: String, require: true },
  conteudo: { type: String, require: true }
});

var CadernoSchema = new mongoose.Schema({
  nome: { type: String, require: true },
  notas: [NotaSchema]
});

module.exports = mongoose.model('Caderno', CadernoSchema);
