const axios = require('axios').default;
const server = require('../../bin/www');

describe('API Bicicletas', () => {
  describe('/bicicletas', () => {
    it('GET devuelve status 200', (done) => {
      axios.get('http://localhost:3000/api/bicicletas').then((response) => {
        expect(response.status).toBe(200);
        done();
      });
    });
  });

  describe('/bicicletas/create', () => {
    it('POST devuelve 201 y crea la bicicleta', (done) => {
      axios.post('http://localhost:3000/api/bicicletas/create', {
        id: 100,
        color: 'Rojo',
        modelo: 'Urbana',
        lat: '-34.6086268',
        lng: '-58.3922607'
      }).then((response) => {
        expect(response.status).toBe(201);
        expect(response.data.color).toBe('Rojo');
        done();
      });
    });
  });

  describe('/bicicletas/update', () => {
    it('POST /bicicletas/100/update actualiza una bicicleta existente', (done) => {
      axios.post('http://localhost:3000/api/bicicletas/100/update', {
        color: 'Negro'
      }).then((response) => {
        expect(response.status).toBe(200);
        expect(response.data.color).toBe('Negro');
        done();
      });
    });

    it('editar una bicicleta inexistente retorna 404', () => {
      return expectAsync(
        axios.post('http://localhost:3000/api/bicicletas/999/update', {
          color: 'Negro'
        })
      ).toBeRejectedWithError('Request failed with status code 404')
    });
  });

  describe('/bicicletas/delete', () => {
    it('POST /bicicletas/10/delete borra la bicicleta con ID 100', (done) => {
      axios.post('http://localhost:3000/api/bicicletas/100/delete').then((response) => {
        expect(response.status).toBe(204);
        done();
      });
    });

    it('borrar una bicicleta inexistente retorna 404', () => {
      return expectAsync(
        axios.post('http://localhost:3000/api/bicicletas/999/delete', {
          color: 'Negro'
        })
      ).toBeRejectedWithError('Request failed with status code 404')
    });
  });
});
