const { ports } = require('./ports');

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = ports.admin;

app.use(express.static('./dist/clis-admin'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => process.send(`CLIS Admin running on: http://localhost:${port}`));


//OPEN CLIS ADMIN
(async () => {
    //NOTE: Cannot be imported with CommonJS. Default export `open` also says it's not a function.
    const { openApp } = await import('open');
    openApp(`http://127.0.0.1:${port}`);
})();