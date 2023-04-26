const { ports } = require('./ports');

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = ports.initializerFrontend;

app.use(express.static('./dist/initializer-app'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => process.send(`Initializer Frontend running on: http://localhost:${port}`));

//OPEN INITIALIZER APP
(async () => {
    //NOTE: Cannot be imported with CommonJS. Default export `open` also says it's not a function.
    const { openApp } = await import('open');
    await openApp(`http://127.0.0.1:${port}`);
})();