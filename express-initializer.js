const { ports } = require('./ports');

const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase(`http://127.0.0.1:${ports.backend}`);

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');

const app = express();
const port = ports.initializer;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./dist/initializer-app'));



//API STUFF FOR INITIALIZATION
app.get('/api/get-account-count', (req, res) => {
    (async () => {
        result = await pb.collection('account').getFullList({
            filter: 'role != "initializer"'
        });
        res.json(result.length);
    })().catch(err => {
        console.log(err);
        res.status(err.status).json(err.response);
    });
});

app.get('/api/get-library-count', (req, res) => {
    (async () => {
        result = await pb.collection('library').getFullList();
        res.json(result.length);
    })().catch(err => {
        res.status(err.status).json(err.response);
    });
});

app.post('/api/create-account', (req, res) => {
    const data = req.body;
    (async () => {
        result = await pb.collection('account').create(data);
        res.json(result);
    })().catch(err => {
        res.status(err.status).json(err.response);
    });
})

app.post('/api/create-library', (req, res) => {
    const data = req.body;
    (async () => {
        result = await pb.collection('library').create(data);
        res.json(result);
    })().catch(err => {
        res.status(err.status).json(err.response);
    });
})

app.delete('/api/close-server', (req, res) => {
    server.close();
});

//DEFAULT
app.all('*', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/initializer-app/index.html'));
});



const server = http.createServer(app);

server.listen(port, () => process.send(`Initializer running on: http://localhost:${port}`));






//OPEN INITIALIZER APP
(async () => {
    //NOTE: Cannot be imported with CommonJS. Default export `open` also says it's not a function.
    const { openApp } = await import('open');
    await openApp(`http://127.0.0.1:${port}`);
})();





process.on('message', (message) => {
    if (!typeof message === 'object') { return; }
    if (!message.hasOwnProperty('username')) { return; }
    if (!message.hasOwnProperty('password')) { return; }

    (async () => {
        await pb.collection('account').authWithPassword(
            message.username,
            message.password
        );
    })();
});