const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// DB Config
require('./database/config').dbConnection();


// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Mis Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));



server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);

    console.log('Servidor corriendo un puerto', process.env.PORT);
});