const express = require('express');
const { engine } = require('express-handlebars');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();

// Configuração do Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware para interpretar o corpo das requisições em URL-encoded e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Exporta o aplicativo para ser utilizado em outros lugares, como server.js
module.exports = app;
