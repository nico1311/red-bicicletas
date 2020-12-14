const dotenv = require('dotenv'),
  mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');
dotenv.config();

describe('Testing Bicicletas', () => {
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

  afterEach((done) => {
    Bicicleta.deleteMany({}, (err) => {
      if (err) throw err;
      done();
    });
  });

  describe('Bicicleta.createInstance', () => {
    it('crea una instancia de Bicicleta', () => {
      const bici = Bicicleta.createInstance(1, 'verde', 'urbana', [-34.6086268, -58.3922607]);
      expect(bici.biciId).toBe(1);
      expect(bici.color).toBe('verde');
      expect(bici.modelo).toBe('urbana');
      expect(bici.ubicacion).toEqual([-34.6086268, -58.3922607]);
    });
  });

  describe('Bicicleta.allBicis', () => {
    it('comienza vacía', (done) => {
      Bicicleta.allBicis((err, bicis) => {
        if (err) throw err;
        expect(bicis.length).toBe(0);
        done();
      });
    });
  });

  describe('Bicicleta.add', () => {
    it('agrega una bicicleta', (done) => {
      const nuevaBici = new Bicicleta({
        biciId: 1,
        color: 'Verde',
        modelo: 'Urbana'
      });
      Bicicleta.add(nuevaBici, (err) => {
        if (err) throw err;
        Bicicleta.allBicis((err, bicis) => {
          if (err) throw err;
          expect(bicis.length).toBe(1);
          expect(bicis[0].biciId).toBe(nuevaBici.biciId);
          done();
        });
      });
    });
  });

  describe('Bicicleta.findById', () => {
    it('devuelve la bicicleta con ID 1', (done) => {
      Bicicleta.allBicis((err, bicis) => {
        if (err) throw err;
        expect(bicis.length).toBe(0);

        const nuevaBici = new Bicicleta({
          biciId: 2,
          color: 'Roja',
          modelo: 'Urbana'
        });

        Bicicleta.add(nuevaBici, (err, result) => {
          if (err) throw err;
          Bicicleta.findById(nuevaBici.biciId, (err, findResult) => {
            if (err) throw err;
            expect(findResult.biciId).toBe(nuevaBici.biciId);
            expect(findResult.color).toBe(nuevaBici.color);
            expect(findResult.modelo).toBe(nuevaBici.modelo);
            done();
          });
        });
      });
    });
  });

  describe('Bicicleta.removeById', () => {
    it('elimina una bici', (done) => {
      const nuevaBici = new Bicicleta({
        biciId: 1,
        color: 'Verde',
        modelo: 'Urbana'
      });
      Bicicleta.add(nuevaBici, (err, result) => {
        if (err) throw err;
        expect(result.biciId).toBe(nuevaBici.biciId);
        Bicicleta.removeById(nuevaBici.biciId, (err) => {
          if (err) throw err;
          Bicicleta.allBicis((err, bicis) => {
            if (err) throw err;
            expect(bicis.length).toBe(0);
            done();
          });
        });
      });
    });
  });
});
