const express = require('express');
const ProductManager = require('../productManager');

const router = express.Router();
const productManager = new ProductManager('products.json');

// Rota para obter todos os produtos com opcional limit
router.get('/', (req, res) => {
    const { limit } = req.query;
    let products = productManager.getProducts();

    if (limit && !isNaN(limit)) {
        products = products.slice(0, Number(limit));
    }

    res.json(products);
});

// Rota para obter um produto pelo ID
router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const product = productManager.getProductById(Number(pid));

    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

// Rota para adicionar um novo produto
router.post('/', (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;

    // Validar se todos os campos obrigatórios estão presentes
    if (!title || !description || !code || price == null || stock == null || !category) {
        return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
    }

    // Criar um novo produto com ID auto-incrementado e status padrão
    const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    productManager.addProduct(newProduct);
    res.status(201).send('Produto adicionado com sucesso');
});

// Rota para atualizar um produto existente
router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body;

    // Garantir que o campo 'id' não seja atualizado
    if (updatedFields.id) {
        return res.status(400).send('O campo "id" não pode ser atualizado.');
    }

    productManager.updateProduct(Number(pid), updatedFields);
    res.send('Produto atualizado com sucesso');
});

// Rota para deletar um produto
router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const product = productManager.getProductById(Number(pid));

    if (!product) {
        return res.status(404).send('Produto não encontrado');
    }

    productManager.deleteProduct(Number(pid));
    res.send('Produto deletado com sucesso');
});

module.exports = router;
