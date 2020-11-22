const map = L.map('mapa').setView([-34.6066267, -58.3909411], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-34.6086268, -58.3922607]).addTo(map);
L.marker([-34.6122428, -58.3984727]).addTo(map);