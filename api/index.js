const express = require('express');
const app = express();
const cors = require('cors')

const images = require("./v1/images")
app.use(cors())

app.use('/api/v1', images)

const PORT = 3000
/** Run the app */
app.listen(PORT);
console.log("Starting server on port 3000...");
