const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.products = [];
    this.nextId = 1;
    this.path = path; // Caminho onde os produtos serão armazenados

    // Carregar produtos do arquivo se já existir
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.nextId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    }
  }

  // Método para adicionar um produto e salvá-lo no arquivo
  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    // Validar que todos os campos estão presentes
    if (title == null || description == null || price == null || thumbnail == null || code == null || stock == null) {
      console.error("Todos os campos são obrigatórios");
      return;
    }

    // Validar que o código seja único
    const codeExists = this.products.some(existingProduct => existingProduct.code == code);
    if (codeExists) {
      console.error("Código já existe, não pode ser duplicado");
      return;
    }

    // Adicionar produto com ID auto-incrementado
    const newProduct = { ...product, id: this.nextId++ };
    this.products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

  //Método para obter todos os produtos
  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Erro ao ler o arquivo de produtos", error);
      return [];
    }
  }

  //Método para obter um produto pelo ID
  getProductById(id) {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      const products = JSON.parse(data);
      const product = products.find(currentProduct => currentProduct.id == id);
      if (product == null) {
        console.error("Não encontrado");
        return null;
      }
      return product;
    } catch (error) {
      console.error("Erro ao ler o arquivo de produtos", error);
      return null;
    }
  }

  // Método para atualizar um produto
  updateProduct(id, updatedFields) {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      const products = JSON.parse(data);
      const productIndex = products.findIndex(p => p.id == id);
      if (productIndex === -1) {
        console.error("Produto não encontrado");
        return;
      }
      products[productIndex] = { ...products[productIndex], ...updatedFields, id: id }; // Atualiza os campos, mantendo o ID
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      console.error("Erro ao atualizar o produto", error);
    }
  }

  // Método para deletar um produto
  deleteProduct(id) {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      const products = JSON.parse(data);
      const updatedProducts = products.filter(product => product.id != id);
      if (products.length === updatedProducts.length) {
        console.error("Produto não encontrado");
        return;
      }
      fs.writeFileSync(this.path, JSON.stringify(updatedProducts, null, 2));
      this.products = updatedProducts;
    } catch (error) {
      console.error("Erro ao deletar o produto", error);
    }
  }
}

// Exemplo de uso
const manager = new ProductManager('products.json');
manager.addProduct({
  title: "Produto 1",
  description: "Descrição do Produto 1",
  price: 100,
  thumbnail: "imagem1.png",
  code: "P001",
  stock: 10
});

manager.addProduct({
  title: "Produto 2",
  description: "Descrição do Produto 2",
  price: 150,
  thumbnail: "imagem2.png",
  code: "P002",
  stock: 5
});

console.log(manager.getProducts()); // Retorna todos os produtos
console.log(manager.getProductById(1)); // Produto 1
manager.updateProduct(1, { price: 120, stock: 8 }); // Atualiza preço e estoque do Produto 1
console.log(manager.getProductById(1)); // Produto 1 atualizado
manager.deleteProduct(2); // Deleta Produto 2
console.log(manager.getProducts()); // Retorna todos os produtos após exclusão
