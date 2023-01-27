const socket = io()

socket.emit('message', 'Hola este es un mensaje que nunca llegara')
socket.on('mensaje_para_todos', data => {
    console.log(data)
})


