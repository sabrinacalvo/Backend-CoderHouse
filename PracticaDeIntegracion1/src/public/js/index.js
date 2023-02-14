const socket = io()

// socket.emit('message', 'Hola este es un mensaje que nunca llegara')
// socket.on('mensaje_para_todos', data => {
//     console.log(data)
// })

const chatBox = document.getElementById('chatBox');

socket.on('Messages', data => {
    const log = document.getElementById("Messages")
    let messages = ""
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}</br>`
    })
    console.log(messages)
    log.innerHTML
})

let user

 Swal.fire({
    title: "Identificate",
    input:"text",
    text:"Ingresa el usuario para Identicarte",
    inputValidator: value => {
        return !value && '¡Necesitas escribir un nombre de usuario para continuar!'
    },
}).then(result => {
    user = result.value
})

chatBox.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user , message: chatBox.value })
        }
    }
}) 

socket.on('Messages', data => {
    const log = document.getElementById('Messages')
    let messages = ""
    data.forEach(message => {
        messages = messages + `${message.user} dice ${message.message}</br>`
        
    });
        log.innerHTML = messages
    });





