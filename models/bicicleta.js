const { Schema, model } = require('mongoose');

const BicicletaSchema = new Schema({
  biciId: Number,
  color: String,
  modelo: String,
  ubicacion: {
    type: [Number],
    index: {
      type: '2dsphere',
      sparse: true
    }
  }
});

BicicletaSchema.statics.createInstance = function(biciId, color, modelo, ubicacion) {
  return new this({
    biciId: biciId,
    color: color,
    modelo: modelo,
    ubicacion: ubicacion
  });
};

BicicletaSchema.methods.toString = function() {
  return `id: ${this.biciId}, color: ${this.color}`;
};

BicicletaSchema.statics.allBicis = function(cb) {
  return this.find({}, cb);
};

BicicletaSchema.statics.add = function(bici, cb) {
  return this.create(bici, cb);
};

BicicletaSchema.statics.findById = function(biciId, cb) {
  return this.findOne({
    biciId: biciId
  }, cb).orFail();
};

BicicletaSchema.statics.removeById = function(biciId, cb) {
  return this.deleteOne({
    biciId: biciId
  }, cb).orFail();
};

module.exports = model('Bicicleta', BicicletaSchema);
