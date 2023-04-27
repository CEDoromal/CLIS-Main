const { ports } = require('./ports');

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = ports.frontend;

app.use(express.static('./dist/clis-app'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => process.send(`Frontend running on: http://localhost:${port}`));