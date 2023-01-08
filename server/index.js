const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
     // your normal server-side code goes here
});

const users = {};
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'chat-back-l9k6.onrender.com';
const io = socketio(server);

io.on('connection', socket => {

     socket.on('new-user-joined', name => {
          console.log("New user", name);
          users[socket.id] = name;
          socket.broadcast.emit('user-joined', name);
     });

     socket.on('send', message => {
          socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
     });

     socket.on('disconnect', message => {
          socket.broadcast.emit('left', users[socket.id]);
          delete users[socket.id];
     });
});

server.listen(PORT, HOST, () => {
     console.log(`Server running at http://${HOST}:${PORT}/`);
});

