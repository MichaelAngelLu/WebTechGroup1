const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  // Set the response headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Send a response to the client
  res.end('Welcome to JuanJobsPH Server');
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
