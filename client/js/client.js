const socket = io('https://backend-chat.onrender.com');
const messageInput = document.getElementById('message-input');
const messageContainer = document.querySelector(".container");
const sendBTN = document.getElementById('send');
const nameOfUser = document.getElementById('username');

const append = (message, position) => {
     const messageElement = document.createElement('div');
     messageElement.innerText = message;
     messageElement.classList.add('message');
     messageElement.classList.add(position);
     messageContainer.append(messageElement);
}
const append2 = (message) => {
     const messageElement = document.createElement('div');
     messageElement.innerText = message;
     messageElement.classList.add('user-joined');
     messageContainer.append(messageElement);
}

let userName = prompt("Enter your name to join the chat");
socket.emit('new-user-joined', userName);

socket.on('user-joined', data => {
     append2(`${data} joined the chat`);

});

sendBTN.addEventListener('click', () => {
     const message = messageInput.value;
     append(`You: ${message}`, 'right');
     socket.emit('send', message);
     messageInput.value = '';
     messageContainer.scrollTop = messageContainer.scrollHeight;
});

socket.on('receive', data => {
     append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', data => {
     append2(`${data} left the chat`, 'left');
});

nameOfUser.innerHTML = userName;   
