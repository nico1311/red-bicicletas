const Bicicleta = require('../../models/bicicleta');

describe('Bicicleta:', () => {
  beforeEach(() => {
    Bicicleta.allBicis = [];
  });

  describe('Bicicleta.allBicis', () => {
    it('comienza vacía', () => {
      expect(Bicicleta.allBicis.length).toBe(0);
    });
  });

  describe('Bicicleta.add', () => {
    it('agrega una bicicleta', () => {
      expect(Bicicleta.allBicis.length).toBe(0);
      const bici = new Bicicleta(1, 'Verde', 'Urbana', [-34.6086268, -58.3922607]);
      Bicicleta.add(bici);
      expect(Bicicleta.allBicis.length).toBe(1);
      expect(Bicicleta.allBicis[0]).toBe(bici);
    });
  });

  describe('Bicicleta.findById', () => {
    it('devuelve la bici con ID 1', () => {
      expect(Bicicleta.allBicis.length).toBe(0);

      const bici1 = new Bicicleta(1, 'Verde', 'Urbana', [-34.6086268, -58.3922607]),
        bici2 = new Bicicleta(2, 'Azul', 'Montaña', [-34.6122428, -58.3984727]);
      Bicicleta.add(bici1);
      Bicicleta.add(bici2);

      const target = Bicicleta.findById(1);
      expect(target.id).toBe(1);
      expect(target.color).toBe(bici1.color);
      expect(target.modelo).toBe(bici1.modelo);
    });

    it('arroja un error al no encontrar una bicicleta', () => {
      expect(() => {
        Bicicleta.findById(7);
      }).toThrow(new Error('No existe bicicleta con el ID 7'));
    });
  });

  describe('Bicicleta.removeById', () => {
    it('elimina correctamente la bicicleta', () => {
      expect(Bicicleta.allBicis.length).toBe(0);

      const bici1 = new Bicicleta(1, 'Verde', 'Urbana', [-34.6086268, -58.3922607]);
      Bicicleta.add(bici1);

      const target = Bicicleta.findById(1);
      expect(target).toBe(bici1);

      Bicicleta.removeById(1);

      expect(Bicicleta.allBicis.length).toBe(0);
    });
  });
});
