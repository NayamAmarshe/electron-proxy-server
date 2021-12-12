const { ipcRenderer } = require("electron");
const Proxy = require("http-mitm-proxy");
const ipc = ipcRenderer;
const proxy = Proxy();

let PORT;

ipc.send("get-port");
ipc.on("send-port", (event, _PORT) => {
  PORT = _PORT;
});

proxy.onError(function (ctx, err) {
  console.error("proxy error:", err);
});

proxy.onRequest(function (ctx, callback) {
  ctx.use(Proxy.gunzip);
  const { method, host, port, headers } = ctx.proxyToServerRequestOptions;
  let userAgent = "";
  Object.keys(headers).map((key) => {
    if (key === "user-agent") {
      userAgent = headers[key];
    }
  });

  document.getElementById("user-agent").innerText = userAgent;
  document.getElementById("host").innerText = host;
  document.getElementById("port").innerText = port;
  document.getElementById("method").innerText = method;

  return callback();
});

proxy.listen({ port: PORT }, () => {
  console.log("Listening on port", PORT);
});
