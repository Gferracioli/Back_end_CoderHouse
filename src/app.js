const express = require('express');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();

// Middleware para interpretar o corpo das requisições em URL-encoded e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Exporta o aplicativo para ser utilizado em outros lugares, como server.js
module.exports = app;
