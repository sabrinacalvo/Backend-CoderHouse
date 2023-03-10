const socket = io();

const chatBox = document.getElementById("chatBox");

Swal.fire({
  background: "rgb(20,20,20)",
  color: "rgb(180, 180, 180)",
  title: "Identify yourself",
  input: "text",
  text: "User Here",
  inputValidator: value => {
    return !value && "Email not valid";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("authenticated", user);
});

chatBox.addEventListener("keyup", e => {
  if(e.key === "Enter"){
    if(chatBox.value.trim().length > 0){
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
})
socket.on('messageLogs', data => {
  const log = document.getElementById("messageLogs")
  let messages = ""
  data.forEach(message => {
    messages = messages + `${message.user} dice ${message.message} </br>`
  })
    log.innerHTML = messages
  });



socket.on("newUserConnected", (data) => {
  if (!user) return;
  Swal.fire({
    background: "rgb(20,20,20)",
    color: "rgb(180, 180, 180)",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    title: `${data} se ha unido al chat`,
    icon: "success",
  });
});
