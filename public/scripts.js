const socket = io('/socket', {
    autoConnect: false
})
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

socket.auth = {token: localStorage.getItem('token')};
socket.connect();
socket.onAny(function(event) {
    console.log(event);
});


function addMessage(message) {
//   let ul = document.getElementById("message-chat");
//   let li = document.createElement("li");
//   li.appendChild(document.createTextNode(message));
//   ul.appendChild(li);

  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}

// const name = prompt('Enter your Name')
// addMessage('You have joined')
socket.emit('join_room', name)

socket.on('chat-message', data => {
  addMessage(`${data.name}: ${data.message}`)
})

// socket.on('user-connected', name => {
//   addMessage(`${name} connected`)
// })

// socket.on('user-disconnected', name => {
//   addMessage(`${name} disconnected`)
// })

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  addMessage(`You: ${message}`)
  socket.emit('sendPrivateChat', message)
  messageInput.value = ''
})
