const axios = require('axios').default;

const server = require('../../bin/www');
const Bicicleta = require('../../models/bicicleta');

describe('API Bicicletas', () => {
  describe('/bicicletas', () => {
    it('GET devuelve status 200', (done) => {
      expect(Bicicleta.allBicis.length).toBe(0);

      const bici1 = new Bicicleta(1, 'Verde', 'Urbana', [-34.6086268, -58.3922607]);
      Bicicleta.add(bici1);

      axios.get('http://localhost:3000/api/bicicletas').then((response) => {
        expect(response.status).toBe(200);
        done();
      });
    });
  });

  describe('/bicicletas/create', () => {
    it('POST devuelve 201 y crea la bicicleta', (done) => {
      axios.post('http://localhost:3000/api/bicicletas/create', {
        id: 10,
        color: 'Rojo',
        modelo: 'Urbana',
        lat: -34.6086268,
        lng: -58.3922607
      }).then((response) => {
        expect(response.status).toBe(201);
        expect(Bicicleta.findById(10).color).toBe('Rojo');
        done();
      });
    });
  });

  describe('/bicicletas/update', () => {
    it('POST /bicicletas/10/update actualiza una bicicleta existente', (done) => {
      axios.post('http://localhost:3000/api/bicicletas/10/update', {
        color: 'Negro'
      }).then((response) => {
        expect(response.status).toBe(200);
        expect(Bicicleta.findById(10).color).toBe('Negro');
        done();
      });
    });

    it('editar una bicicleta inexistente retorna 404', (done) => {
      axios.post('http://localhost:3000/api/bicicletas/7/update', {
        color: 'Negro'
      }).catch((err) => {
        expect(err.response.status).toBe(404);
        done();
      });
    });
  });

  describe('/bicicletas/delete', () => {
    it('POST /bicicletas/10/delete borra la bicicleta con ID 10', (done) => {
      expect(Bicicleta.allBicis.length).toBe(2);
      axios.post('http://localhost:3000/api/bicicletas/10/delete').then((response) => {
        expect(response.status).toBe(204);
        expect(Bicicleta.allBicis.length).toBe(1);
        done();
      });
    });

    it('borrar una bicicleta inexistente retorna 404', (done) => {
      axios.post('http://localhost:3000/api/bicicletas/7/delete').catch((err) => {
        expect(err.response.status).toBe(404);
        done();
      });
    });
  });
});
