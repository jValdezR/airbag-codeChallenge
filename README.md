# airbag-codeChallenge

## Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

4. Llenar las variables de entorno definidas en el ```.env```

5. Crear la base de datos
```
npm run db:create
```
6. Crear el contenedor para la aplicación (aplicacion y base de datos)
```
docker-compose up --build
```
7. Correr la aplicacion en Node JS (OPCIONAL)
```
npm run dev
```

## Stack usado
* PostgreSQL
* Node Express

