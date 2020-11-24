const map = L.map('mapa').setView([-34.6066267, -58.3909411], 13);

L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  attribution: '&copy; <a href="https://maps.google.com">Google</a>',
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);

L.marker([-34.6086268, -58.3922607]).addTo(map);
L.marker([-34.6122428, -58.3984727]).addTo(map);