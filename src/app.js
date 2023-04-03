const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const num1 = data.num1;
        if (typeof num1 === 'number' && Number.isInteger(num1)) {
          if (num1 % 2 === 0) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`The number ${num1} is even`);
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`The number ${num1} is odd`);
          }
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid payload. Please provide an integer value for num1.');
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid payload. Please provide a valid JSON object with a single integer field "num1".');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid endpoint. Please send a POST request to "/".');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
