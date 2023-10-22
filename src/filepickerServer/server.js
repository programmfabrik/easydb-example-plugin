/*

IMPORTANT: Make sure to configure the ez5Url variable with the url of the ez5 instance that you want to use this
variable is in the route "/" of this file.

To run this server:
1. Install nodejs
2. Install the dependencies executing the command: npm install on the root folder of the plugin
3. Run the server executing the command: npm run filepickerServer on the root folder of the plugin
4. Open the browser and go to http://localhost:3000

This is a simple example of a server that can be used to launch the filepicker in ez5 or fylr
with the filepicker functionality in ez5/fylr you can send the information of the assets to a remote server/cms
This will open a new window with the ez5 instance and once the assets are selected, the information will be sent
to this server, then the server can do whatever it needs to do with the information.

 */


const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const PORT = 3000;


// This is the configuration for the CORS, this is needed to allow the communication between the ez5 instance and the server
// If not CORS is configured, the ez5 instance will not be able to send the information to the server
const corsOptions = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
};
app.use(cors(corsOptions));


// This is the route that will be used to launch the filepicker example
// This route will return a html page with a button that will launch the filepicker
app.get('/', (req, res) => {

    // This is the url of the ez5 instance that we want to use
    const ez5Url = "http://localhost"
    // This is the object that we will send to ez5 in the url this object will be encoded in base64
    // The callbackurl tell ez5 where to send the information once the assets are selected, so here you
    // need to put the url of a server/cms that will receive the information from ez5. This info is sent as
    // a POST request with the files in the body of the request and the information of the files in the body.
    const filepickerParameters = {
        callbackurl: "http://localhost:3000/getFiles"
    };

    const base64String = Buffer.from(JSON.stringify(filepickerParameters)).toString('base64');

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>File Picker Example</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <script>
                // This is the function that will launch the filepicker
                // The important part is the url, we MUST include the paramaters in base64
                function launchFilePicker() {
                    const url = "${ez5Url}?Examplefilepicker=${base64String}";
                    window.open(url, "Ez5 FilePicker", "width=600,height=400");
                }
                // This is just to show the message that ez5 sends to the page from the new window
                window.addEventListener('message', (ev) => console.log(ev));
            </script>
        </head>
        <body class="bg-gray-100 h-screen flex flex-col items-center justify-center">
            <div class="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 class="text-2xl font-bold mb-4">File Picker Example</h1>
                <p class="mt-4 text-gray-600">This is a simple example to demonstrate how the Filepicker functionality in Ez5/Fylr works. Using the button below, you can access the ez5 instance that you've set up in the server.js file. Once the assets are selected in ez5, you will be able to see in the console where this server is running the information that ez5 sends to the server.</p>
                <button onclick="launchFilePicker()" class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Launch Easydb/Fylr Filepicker
                </button>
            </div>
        </body>
        </html>
    `;

    res.send(htmlContent);
});

// This is the route that will be used to receive the information from ez5
// This route will receive a POST request with the files in the body of the request and the information of the files in the body.
// We use multer to parse the information from the request, on php for example we can use $_FILES and $_POST to get the information
const storage = multer.memoryStorage(); // We use memory storage because we don't need to save the files in the server
const upload = multer({ storage: storage });
app.post('/getFiles', upload.single('files[]'), (req, res) => {
    jsonFileInfo = JSON.parse(req.body.body)

    // Each time this server receives a POST request, it will print the information in the console
    console.log(jsonFileInfo);
    console.log(req.file);

    // Ez5 expects a response to know if the transfer was successful or not, this will be stored in the EVENT log of ez5
    responseJson = {
        "files": [
            {
                "uid": jsonFileInfo.files[0].uid,
                "status": "success",
                "message": "The file was transferred successfully using the example filepicker server"
            }
        ]
    }
    res.status(200).send(responseJson);
});


// This is the port where the server will be running we run this on port 3000 by default
app.listen(PORT, () => {
    console.log(`Filepicker example server running at http://localhost:${PORT} you will see here the asset info once the assets are send from ez5 instance...`);
});
