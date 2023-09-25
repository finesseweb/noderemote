const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const { env } = require('process');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('receiver.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading receiver.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    // Set the binary type to receive binary data
    ws.binaryType = 'arraybuffer';
    
    ws.on('message', (message) => {
        const text = Buffer.from(message).toString('utf8');
            
       

        // Broadcast the message to all connected clients
      
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(text);
            }
        });
    });
});

server.listen(process.env.PORT||8080, () => {
    console.log('Server is running on port 8080');
});
