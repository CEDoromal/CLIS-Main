const { spawn, fork } = require('child_process');
const { ports } = require('./ports');

//HELPER FUNCTIONS
function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
}



//BACKEND PROCESS
const backendProcess = spawn('./pocketbase/pocketbase.exe', ['serve', `--http=localhost:${ports.backend}`]);

backendProcess.stdout.on('data', (data) => {
    console.log(`Backend ➜  ${data}`);
    //NOTE: calls initializer to check if there is a library and account after the backend server has started
    if (Buffer.isBuffer(data) && data.toString().includes(`Server started at http://localhost:${ports.backend}`)) {
        initializer();
    }
});

backendProcess.stderr.on('data', (data) => {
    console.log(`Backend stderr: ${data}`);
});

backendProcess.on('error', (error) => {
    console.log(`Backend error: ${error.message}`);
});

backendProcess.on('exit', (code, signal) => {
    if (code) console.log(`Backend process exited with code: ${code}`);
    if (signal) console.log(`Backend process killed with signal: ${signal}`);
    console.log(`Backend process ended`);
    process.exit();
});


//FRONTEND PROCESS
const frontendProcess = fork('./express-frontend.js');

frontendProcess.on('message', (message) => {
    console.log(`Frontend ➜  ${message}`);
});

frontendProcess.on('error', (error) => {
    console.log(`Frontend error: ${error.message}`);
});

frontendProcess.on('exit', (code, signal) => {
    if (code) console.log(`Frontend process exited with code: ${code}`);
    if (signal) console.log(`Frontend process killed with signal: ${signal}`);
    console.log(`Frontend process ended`);
    process.exit();
});


//INITIALIZER
async function initializer() {
    const PocketBase = require('./node_modules/pocketbase/dist/pocketbase.cjs'); //NOTE: Requires path otherwise `pkg` can't find it
    const pb = new PocketBase(`http://127.0.0.1:${ports.backend}`);

    await pb.collection('account').authWithPassword(
        'initializer',
        'XHeUJE3VMwJ2zga'
    );

    const librariesPromise = pb.collection('library').getFullList();
    const accountsPromise = pb.collection('account').getFullList({
        filter: 'role != "initializer"'
    });

    const libraries = await librariesPromise;
    const accounts = await accountsPromise;

    pb.authStore.clear();

    if (libraries.length === 0 && accounts.length === 0) {

        console.log("No Library and Account Detected");
        console.log("Launching Initializer...");

        //INITIALIZER BACKEND PROCESS
        const initializerBackendProcess = fork('./express-initializer-backend.js');

        initializerBackendProcess.send({
            username: 'initializer',
            password: 'XHeUJE3VMwJ2zga'
        });

        initializerBackendProcess.on('message', (message) => {
            console.log(`Initializer Backend ➜  ${message}`);
        });

        initializerBackendProcess.on('error', (error) => {
            console.log(`Initializer Backend error: ${error.message}`);
        });

        initializerBackendProcess.on('exit', (code, signal) => {
            if (code) console.log(`Initializer Backend process exited with code: ${code}`);
            if (signal) console.log(`Initializer Backend process killed with signal: ${signal}`);
            console.log(`Initializer Backend process ended`);
        });


        //INITIALIZER FRONTEND PROCESS
        const initializerFrontendProcess = fork('./express-initializer-frontend.js');

        initializerFrontendProcess.on('message', (message) => {
            console.log(`Initializer Frontend ➜  ${message}`);
        });

        initializerFrontendProcess.on('error', (error) => {
            console.log(`Initializer Frontend error: ${error.message}`);
        });

        initializerFrontendProcess.on('exit', (code, signal) => {
            if (code) console.log(`Initializer Frontend process exited with code: ${code}`);
            if (signal) console.log(`Initializer Frontend process killed with signal: ${signal}`);
            console.log(`Initializer Frontend process ended`);
        });
    }
}