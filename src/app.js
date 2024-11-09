const express = require('express');
const ProductManager = require('../productManager');

const app = express();
const productManager = new ProductManager('products.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Necessário para receber JSON no corpo da requisição

// Rota para obter todos os produtos
app.get('/products', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

// Rota para obter um produto pelo ID
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = productManager.getProductById(Number(id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

// Rota para adicionar um novo produto
app.post('/products', (req, res) => {
    const product = req.body;
    productManager.addProduct(product);
    res.status(201).send('Produto adicionado com sucesso');
});

// Rota para atualizar um produto existente
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    productManager.updateProduct(Number(id), updatedFields);
    res.send('Produto atualizado com sucesso');
});

// Rota para deletar um produto
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    productManager.deleteProduct(Number(id));
    res.send('Produto deletado com sucesso');
});

module.exports = app;
