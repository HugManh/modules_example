const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const { telegram } = require("./utils")

/** middlewares */
app.use(express.json());
app.use(cors())
app.disable('x-powered-by');

const initRoutes = require("./routes");
initRoutes(app)

// Start the server
const port = process.env.PORT || 8080
try {
    app.listen(port, () => {
        text = `Server connected to http://localhost:${port}/ping`
        console.log(text);
        // telegram.sendMessageToTelegram(text)
    })
}
catch (error) {
    console.log('Cannot connect to the server: ', error)
}
