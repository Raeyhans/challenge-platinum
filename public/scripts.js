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
  const messageElement = document.createElement('div')
  messageElement.classList.add('col-md-12', 'colorme', 'col-md-offset-6')
  messageElement.innerHTML = `<div class="chat-bubble chat-bubble--right">${message}</div>`
  messageContainer.append(messageElement)
}

function listMessage(chat) {
  const [id_customer, id_seller] = chat.chat_group.split('-')
  const messageElement = document.createElement('div')
  let colClass = ['col-md-12', 'col-md-offset-6']
  let bubbleClass = ['chat-bubble']
  if(chat.id_seller) {
    if(id_seller == localStorage.getItem('user_id')) {
      colClass = ['col-md-12', 'colorme', 'col-md-offset-6']
      bubbleClass = ['chat-bubble', 'chat-bubble--right']
    }else{
      colClass = ['col-md-12', 'col-md-offset-6']
      bubbleClass = ['chat-bubble', 'chat-bubble--left']
    }
  }else if(chat.id_customer) {
    if(id_customer == localStorage.getItem('user_id')) {
      colClass = ['col-md-12', 'colorme', 'col-md-offset-6']
      bubbleClass = ['chat-bubble', 'chat-bubble--right']
    }else{
      colClass = ['col-md-12', 'col-md-offset-6']
      bubbleClass = ['chat-bubble', 'chat-bubble--left']
    }
  }
    messageElement.classList.add(...colClass)
    messageElement.innerHTML = `<div class="${bubbleClass.join(' ')}">${chat.message}</div>`
    messageContainer.append(messageElement)
  
}

// const name = prompt('Enter your Name')
// addMessage('You have joined')

socket.on('chat-message', data => {
  addMessage(`${data.name}: ${data.message}`)
})

socket.on('receivePrivateChat', data => {
  listMessage(data)
})

socket.on('connected', data => {
  localStorage.setItem('user_id', data)
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
  addMessage(message)
  if(localStorage.getItem('role') == 'cs') {
  socket.emit('sendPrivateChat', {message, id_seller:$('#otherUser input').val()})
  }else{
  socket.emit('sendPrivateChatSeller', {message, id_customer:$('#otherUser input').val()})
  }
  messageInput.value = ''
})
