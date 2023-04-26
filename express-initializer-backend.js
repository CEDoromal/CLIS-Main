const { ports } = require('./ports');

const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase(`http://127.0.0.1:${ports.backend}`);



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const port = ports.initializerBackend;


app.use(
    cors({
        origin: `http://127.0.0.1:${ports.initializerFrontend}`
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

const server = http.createServer(app);
server.listen(port, () => process.send(`Initializer Backend running on: http://localhost:${port}`));




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