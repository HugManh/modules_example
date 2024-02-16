const express = require('express');
const app = express();
const cors = require('cors')

const { imageRoute } = require("./routes")
app.use(cors())

app.use('/api/v1', imageRoute)

const PORT = 3000
/** Run the app */
app.listen(PORT);
console.log("Starting server on port 3000...");

module.exports = app;
