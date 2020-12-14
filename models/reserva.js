const { Schema, model } = require('mongoose');
const { differenceInDays } = require('date-fns');

const reservaSchema = new Schema({
  desde: Date,
  hasta: Date,
  bicicleta: {
    type: Schema.Types.ObjectId,
    ref: 'Bicicleta'
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

reservaSchema.methods.diasDeReserva = function() {
  return differenceInDays(this.hasta, this.desde) + 1;
}

module.exports = model('Reserva', reservaSchema);