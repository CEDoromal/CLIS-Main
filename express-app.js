const { ports } = require('./ports');

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = ports.app;

app.use(express.static('./dist/clis-app'));

app.all('*', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/clis-app/index.html'));
});

const server = http.createServer(app);

server.listen(port, () => process.send(`CLIS App running on: http://localhost:${port}`));


//OPEN CLIS APP
(async () => {
    //NOTE: Cannot be imported with CommonJS. Default export `open` also says it's not a function.
    const { openApp } = await import('open');
    openApp(`http://127.0.0.1:${port}`);
})();