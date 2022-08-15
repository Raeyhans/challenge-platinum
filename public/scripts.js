const socket = io('/socket', {
    autoConnect: false
})
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageChat = document.getElementById('container-chat')

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
  
  const messageElement = document.createElement('div')
  let colClass = ['col-md-12', 'col-md-offset-6']
  let bubbleClass = ['chat-bubble']
  if(chat.from == localStorage.getItem('role')+localStorage.getItem('user_id')) {
      colClass = ['col-md-12', 'colorme', 'col-md-offset-6']
      bubbleClass = ['chat-bubble', 'chat-bubble--right']
  }else if (chat.from != null) {
      colClass = ['col-md-12', 'col-md-offset-6']
      bubbleClass = ['chat-bubble', 'chat-bubble--left']
  }
    messageElement.classList.add(...colClass)
    messageElement.innerHTML = `<div class="${bubbleClass.join(' ')}">${chat.message}</div>`
    messageContainer.append(messageElement)
  
}

// const name = prompt('Enter your Name')
// addMessage('You have joined')

socket.on('chat-message', data => {
  addMessage(`${data.message}`)
})

socket.on('receivePrivateChat', data => {
  if(messageContainer) {
    listMessage(data)
  }
  if(messageChat){
    const chatgroup = $('#chatGroup-'+data.chat_group)
    console.log(chatgroup.length);
    if(chatgroup.length) {
      $('#chatGroup-'+data.chat_group+' p').text(data.message)
    }else{
      var html = '';
      html += '<a id="chatGroup-'+data.chat_group+'" class="contact-chat" onclick="anchorScr('+data.id_customer+')"><div class="friend-drawer friend-drawer--onhover">';
      html += '<img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="">';
      html += '<div class="text">';
      html += '<h6>'+data.firstname+'</h6>';
      html += '<p class="text-muted">'+data.message+'</p>';
      html += '</div>';
      html += '</div></a>';
      html += '<hr>';
      $('#container-chat').append(html);
    }
  }
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

messageForm?.addEventListener('submit', e => {
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
