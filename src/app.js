const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConection = require('express-myconnection');
const app = express();
const session = require('express-session');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({secret: 'ssshhhhh', resave: true, saveUninitialized: true}));

// Importando rutas
const clienteRoutes = require('./routes/cliente');
const loginRoutes = require('./routes/login');

// middlewares
app.use(morgan('dev'));
app.use(myConection(mysql, {
   host: 'localhost',
   user: 'root',
   password: '',
   port: 3306,
   database: 'clientesdb'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', loginRoutes);
app.use('/clientes', clienteRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});