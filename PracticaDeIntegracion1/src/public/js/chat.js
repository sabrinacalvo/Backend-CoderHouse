const socket = io();
const chatBox = document.getElementById("chatBox");

Swal.fire({
  background: "rgb(20,20,20)",
  color: "rgb(180, 180, 180)",
  title: "Identify yourself",
  input: "email",
  text: "Enter your email",
  inputValidator: (value) => {
    return !value && "Email not valid";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("authenticated", user);
});

chatBox.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
})

function sendMessage() {
  if (chatBox.value.trim().length > 0) {
    socket.emit("message", { user: user, message: chatBox.value });
    chatBox.value = "";
  }
}

socket.on("Messages", (data) => {
  if (!user) return;
  let log = document.getElementById("chatZone");
  let messages = "";
  data.forEach((message) => {
    messages =
      messages +
      `<div class="message">
        <p class="user">${message.user}</p>
        <p>${message.message}</p>
      </div>`;
  });
  log.innerHTML = messages;
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
