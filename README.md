## Red Bicicletas
La primera comunidad online de ciclistas urbanos.

### Configuración del entorno
1. Clonar el repositorio
2. Instalar módulos NPM ejecutando `npm install`
3. Crear un archivo `.env` con las variables de entorno `MONGODB` y `MONGODB_TEST`, cuyos valores deben ser las URL de la base de datos utilizada para la aplicación y para los tests, respectivamente.
4. Iniciar el servidor con `npm start` (o `npm run devstart` con auto-reload mediante nodemon)

### Endpoints de API
* GET `/api/bicicletas`: Devuelve la lista de bicicletas.
* GET `/api/bicicletas/<id>`: Devuelve los detalles de la bicicleta con el ID especificado. Si no se encuentra, devuelve código de estado `404 Not Found`.
* POST `/api/bicicletas/create`: Añade una bicicleta. Parámetros (body tipo JSON):
	* `id` (int): ID de la bicicleta
	* `color` (string): Color de la bicicleta 
	* `modelo` (string): Modelo de la bicicleta
	* `lat` y `lng` (int): Coordenadas
Devuelve código de estado `201 Created` si la creación fue exitosa.
* POST `/api/bicicletas/<id>/update`: Actualiza los datos de una bicicleta.
	* Acepta los mismos parámetros del endpoint `create`. Al actualizar datos, pueden volver a especificarse todos los datos o solo los que sean necesarios actualizar.
	* Si la actualización fue exitosa, devuelve código `200` y como body de la respuesta, la bicicleta que acaba de ser actualizada. Si no se encuentra el ID especificado, devuelve `404 Not Found`.
* POST `/api/bicicletas/<id>/delete`: Elimina una bicicleta.
	* Si la eliminación fue exitosa, devuelve el código de estado `204 No Content`.
	* Si no se encuentra una bicicleta con el ID especificado, devuelve `404 Not Found`.
* GET `/api/usuarios`: Devuelve la lista de usuarios.
* POST `/api/usuarios/create`: Crea un usuario. Parámetros:
	* `nombre` (string): Nombre del usuario
Devuelve código de estado `201 Created` si la creación fue exitosa.
* POST `/api/usuarios/reservar`: Reserva una bicicleta. Parámetros:
	* `id` (string): ObjectId de Mongo correspondiente al usuario
	* `biciId` (string): ObjectId de Mongo correspondiente a la bicicleta
	* `desde` (string): Fecha de inicio de la reserva (AAAA-MM-DD)
	* `hasta` (string): Fecha de fin de la reserva (AAAA-MM-DD)
	* Si la reserva fue exitosa, devuelve `204 No Content`.
	* Si no se encuentra el usuario o la bicicleta especificados, devuelve `404 Not Found`.