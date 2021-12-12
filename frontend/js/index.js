const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

ipc.send("get-port");

ipc.on("send-port", (event, PORT) => {
  document.getElementById("port").innerHTML = PORT;
});
