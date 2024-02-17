const express = require('express');
const app = express();
const cors = require('cors')
const { telegram } = require("./utils")

app.use(cors())

const initRoutes = require("./routes");
initRoutes(app)

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    text = "Starting server on port " + PORT + "..."
    console.log(text);
    // telegram.sendMessageToTelegram(text)
})
