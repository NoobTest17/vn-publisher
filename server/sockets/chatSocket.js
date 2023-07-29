module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Подключен пользователь')

    // Подключение клиента к комнате
    socket.on('join room', (roomId) => {
      socket.join(roomId)
    })

    socket.on('chat message', (roomId, message) => {
      console.log(`Получено сообщение в чате ${roomId} : ${message}`)

      // Отправка сообщения всем сокетам в указанной комнате
      io.to(roomId).emit('chat message', message)
    })

    socket.on('disconnect', (roomId) => {
      console.log(`Пользователь отключился от комнаты: ${roomId}`)
    })
  })
}

// Пример с использованием пространством имен
/*
module.exports = (chatNamespace) => {
  chatNamespace.on('connection', (socket) => {
    console.log('Новый пользователь подключился к пространству имен "chatNamespace"');

    socket.on('join room', (roomId) => {
      socket.join(roomId); // Подключаем сокет к указанной комнате в пространстве имен
    });

    socket.on('chat message', (roomId, message) => {
      console.log(`Получено сообщение в чате ${roomId}: ${message}`);
      // Отправка сообщения всем сокетам в указанной комнате в пространстве имен
      chatNamespace.to(roomId).emit('chat message', message);
    });

    socket.on('disconnect', () => {
      console.log('Пользователь отключился от пространства имен "chatNamespace"');
    });
  });
};
 */