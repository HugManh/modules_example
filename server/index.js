const express = require('express');
const app = express();
const cors = require('cors')
const { telegram } = require("./utils")

const { imageRoute } = require("./routes")
app.use(cors())


app.use('api/v1', imageRoute)

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    text = "Starting server on port " + PORT + "..."
    console.log(text);
    telegram.sendMessageToTelegram(text)
})
