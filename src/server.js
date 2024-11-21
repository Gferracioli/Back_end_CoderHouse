const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const PORT = 8080;
const server = http.createServer(app);
const io = new Server(server);

// Configurando o Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  // Listener de exemplo para uma mensagem enviada pelo cliente
  socket.on('mensagem_cliente', (mensagem) => {
    console.log('Mensagem recebida do cliente:', mensagem);
    // Enviar uma resposta de volta ao cliente
    socket.emit('mensagem_servidor', 'Mensagem recebida no servidor');
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Subindo o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});