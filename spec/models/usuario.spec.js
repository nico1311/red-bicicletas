const dotenv = require('dotenv'),
  mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta'),
  Usuario = require('../../models/usuario'),
  Reserva = require('../../models/reserva');
dotenv.config();

describe('Testing Usuarios', () => {
  beforeAll((done) => {
    mongoose.connect(process.env.MONGODB_TEST, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error: '));
    db.once('open', () => {
      console.log('Connected to test MongoDB!');
      done();
    });
  });
  
  afterAll((done) => {
    Reserva.deleteMany({}, (err) => {
      if (err) throw err;
      Usuario.deleteMany({}, (err) => {
        if (err) throw err;
        Bicicleta.deleteMany({}, (err) => {
          if (err) throw err;
          done();
        });
      });
    });
  });

  describe('Tests Reserva', () => {
    it('verifica que la reserva exista', (done) => {
      const usuario = new Usuario({
        nombre: 'Juan Pérez'
      });
      const bicicleta = new Bicicleta({
        biciId: 1,
        color: 'verde',
        modelo: 'urbana',
        ubicacion: [-34.6086268, -58.3922607]
      })
      usuario.save();
      bicicleta.save();

      const hoy = new Date(),
        mañana = new Date().setDate(hoy.getDate() + 1);
      
      usuario.reservar(bicicleta.id, hoy, mañana, (err, reserva) => {
        Reserva.find({}).populate('bicicleta').populate('usuario').exec((err, reservas) => {
          if (err) throw err;
          console.log(reservas[0]);

          expect(reservas.length).toBe(1);
          expect(reservas[0].diasDeReserva()).toBe(2);
          expect(reservas[0].bicicleta.biciId).toBe(1);
          expect(reservas[0].usuario.nombre).toBe(usuario.nombre);

          done();
        });
      });
    });
  });

});