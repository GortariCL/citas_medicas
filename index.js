const http = require('http');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _lodash = require('lodash');
const chalk = require("chalk");

let usuarios = [];
let usuariosConsola = [];

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if(req.url.includes('/users')){
        //1. El registro de los usuarios debe hacerse con la API Random User usando axios para
        //consultar la data.
        axios
            .get('https://randomuser.me/api/')
            .then((data) => {                
                let nombre = data.data.results[0].name.first;
                let apellido = data.data.results[0].name.last;
                //2. Cada usuario registrado debe tener un campo id único generado por el paquete
                //UUID.
                let id = uuidv4().slice(0,6);
                //3. Cada usuario debe tener un campo timestamp almacenando la fecha de registro
                //obtenida por medio del paquete Moment.
                let fecha = moment().format('MMMM Do YYYY, h:mm:ss a');
                let usuario =  `Nombre: ${nombre} - Apellido: ${apellido} - id: ${id} - timestap: ${fecha}`;
                usuarios.push(usuario); 
                usuariosConsola.push(usuario);
                let indice = 0;
                //4. Por cada consulta realizada al servidor, se debe devolver al cliente una lista con los
                //datos de todos los usuarios registrados usando Lodash para recorrer el arreglo de
                //usuarios.
                _lodash.forEach(usuarios, (e,i) => {
                    //5. En cada consulta también se debe imprimir por la consola del servidor la misma lista
                    //de usuarios pero con fondo blanco y color de texto azul usando el paquete Chalk.
                    res.write(`${i+1}. ${usuarios[i]}<br>`);
                    indice++;                    
                })
                console.log(chalk.bgWhite.blue(`${indice}. ${usuariosConsola.pop()}`));
                res.end();
            })
            .catch((e) => {
                console.log(e);
            })
    }
}).listen(8080, () => console.log('Escuchando el puerto 8080'));

//6. El servidor debe ser levantado con el comando Nodemon.
//nodemon index.js