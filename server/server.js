require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const { telegram } = require("./utils")
const initRoutes = require("./routes");

/** middlewares */
app.use(express.json());
app.use(cors())
app.disable('x-powered-by');

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
