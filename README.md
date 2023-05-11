##### PruebaTecnica

1) para correr la aplicación se deben de instalar dependencias "npm i" y ejecutar el proyecto "npm run start"
2) para correr las pruebas unitarias, se debe de ejecutar el comando "npm test"
3) existe un servicio para generar el token jwt con la url http://localhost:3000/token llamandolo por el metodo post, con este se podrán consumir los endpoint que no sean de verbo get
4) para consumir los enpoint con seguridad por jwt se debe de agregar el encabezado "Authorization" con el valor "Bearer " y luego el token, por ejemplo "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjgzNzc0NTgzfQ.BvcNRTa6mDfU8IpMy9nqCs1pYl-PBJH_1FX2rqnIpcQ"
5) en la carpeta postman, se encuentra la colección para el consumo de la api
