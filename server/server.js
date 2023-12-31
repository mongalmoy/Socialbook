const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

const server = http.createServer((req, res) => {
   res.writeHead(200, { "Content-Type" : "text/plain" });
   res.end("hello world")
});

http.get("/", (req, res) => {
   console.log("req", req)
   console.log("res", res)
})

server.listen(port, hostname, () => {
   console.log("Server running on port " + port);
});