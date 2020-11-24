const Bicicleta = function (id, color, modelo, ubicacion) {
  this.id = id;
  this.color = color;
  this.modelo = modelo;
  this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function () {
  return `id: ${this.id}, color: ${this.color}`;
}

Bicicleta.allBicis = [];

Bicicleta.add = function (bici) {
  Bicicleta.allBicis.push(bici);
}

Bicicleta.findById = function (id) {
  let bici = Bicicleta.allBicis.find(x => x.id === id);
  if (bici) {
    return bici;
  } else {
    throw new Error(`No existe bicicleta con el ID ${id}`);
  }
}

Bicicleta.removeById = function (id) {
  for (let i = 0; i < Bicicleta.allBicis.length; i++) {
    let bici = Bicicleta.allBicis[i];
    if (bici.id === id) {
      Bicicleta.allBicis.splice(i, 1);
      break;
    }
  }
}

let a = new Bicicleta(1, 'Verde', 'Urbana', [-34.6086268, -58.3922607]),
  b = new Bicicleta(2, 'Azul', 'Urbana', [-34.6122428, -58.3984727]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;
